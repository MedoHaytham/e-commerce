import React, { useState } from 'react'
import './ordersPage.css'
import { Package, MapPin, MoreVertical, ChevronRight } from "lucide-react";
import { useGetOrdersQuery } from "../../features/orderSlice";
import PageTransition from '../../components/pageTransition';

// ── Status helpers ────────────────────────────────────────

const ORDER_STATUS_LABELS = {
  pending:    { label: "Pending",    color: "#f59e0b", bg: "#fef3c7" },
  confirmed:  { label: "Confirmed",  color: "#3b82f6", bg: "#dbeafe" },
  processing: { label: "Processing", color: "#8b5cf6", bg: "#ede9fe" },
  shipped:    { label: "Shipped",    color: "#0ea5e9", bg: "#e0f2fe" },
  delivered:  { label: "Delivered",  color: "#22c55e", bg: "#dcfce7" },
  cancelled:  { label: "Cancelled",  color: "#ef4444", bg: "#fee2e2" },
};

const PAYMENT_STATUS_LABELS = {
  pending:   { label: "Unpaid",    color: "#f59e0b", bg: "#fef3c7" },
  paid:      { label: "Paid",      color: "#22c55e", bg: "#dcfce7" },
  failed:    { label: "Failed",    color: "#ef4444", bg: "#fee2e2" },
  cancelled: { label: "Cancelled", color: "#ef4444", bg: "#fee2e2" },
  refunded:  { label: "Refunded",  color: "#6366f1", bg: "#e0e7ff" },
};

const ACTIVE_STATUSES = ["pending", "confirmed", "processing", "shipped"];
const ENDED_STATUSES  = ["delivered", "cancelled"];

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short", year: "numeric", month: "short", day: "numeric",
  });
};

const formatTime = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

// ── Order Card ────────────────────────────────────────────

const OrderCard = ({ order }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const statusInfo  = ORDER_STATUS_LABELS[order.orderStatus]    || {};
  const paymentInfo = PAYMENT_STATUS_LABELS[order.paymentStatus] || {};
  const isEnded     = ENDED_STATUSES.includes(order.orderStatus);
  const canCancel   = order.orderStatus === "pending";

  return (
    <PageTransition>
      <div className="order-card">
        {/* Header */}
        <div className="order-card__header">
          <div className="order-card__header-left">
            <div className="order-icon-wrap">
              <Package size={17} color="#1d8cdc" />
            </div>
            <div className="order-header-meta">
              <span className="order-delivery-text">
                {order.orderStatus === "delivered"
                  ? `Delivered on ${formatDate(order.updatedAt)}, ${formatTime(order.updatedAt)}`
                  : `Ordered on ${formatDate(order.createdAt)}`}
              </span>
              <span className="order-id-text">#{order.merchantOrderId}</span>
            </div>
          </div>

          <div className="order-card__header-right">
            <span className="status-badge" style={{ color: statusInfo.color, background: statusInfo.bg }}>
              {statusInfo.label}
            </span>
            <span className="status-badge" style={{ color: paymentInfo.color, background: paymentInfo.bg }}>
              {paymentInfo.label}
            </span>

            <div className="order-menu-wrap">
              <button className="order-menu-btn" onClick={() => setMenuOpen(o => !o)}>
                <MoreVertical size={18} color="#94a3b8" />
              </button>
              {menuOpen && (
                <div className="order-menu-dropdown">
                  <div className="order-menu-item">
                    <ChevronRight size={13} /> Order Details
                  </div>
                  {isEnded && (
                    <div className="order-menu-item">
                      <ChevronRight size={13} /> Return Item
                    </div>
                  )}
                  {canCancel && (
                    <div className="order-menu-item order-menu-item--danger">
                      <ChevronRight size={13} /> Cancel Order
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Items */}
        {order.items.map((item, idx) => (
          <div key={idx} className="order-item">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="order-item__img"
                onError={e => { e.target.style.opacity = 0; }}
              />
            ) : (
              <div className="order-item__img order-item__img--placeholder">
                <Package size={24} color="#cbd5e1" />
              </div>
            )}
            <div className="order-item__info">
              <p className="order-item__name">{item.title}</p>
              <div className="order-item__price-row">
                <span className="order-item__qty">x{item.quantity}</span>
                <span className="order-item__price">{item.price?.toFixed(2)} EGP</span>
                <span className="order-item__subtotal">= {item.itemSubtotal?.toFixed(2)} EGP</span>
              </div>
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="order-card__footer">
          <div className="order-address">
            <MapPin size={13} color="#94a3b8" />
            <span>
              {order.shippingAddress?.title} — {order.shippingAddress?.address}, {order.shippingAddress?.city}
            </span>
          </div>

          <div className="order-totals">
            <div className="order-total-row">
              <span>Subtotal</span>
              <span>{order.subtotal?.toFixed(2)} EGP</span>
            </div>
            {order.discount > 0 && (
              <div className="order-total-row order-total-row--discount">
                <span>Discount</span>
                <span>- {order.discount?.toFixed(2)} EGP</span>
              </div>
            )}
            <div className="order-total-row">
              <span>Delivery Fee</span>
              <span>{order.deliveryFee?.toFixed(2)} EGP</span>
            </div>
            <div className="order-total-row order-total-row--total">
              <span>Total</span>
              <span>{order.totalPrice?.toFixed(2)} EGP</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// ── Main Page ─────────────────────────────────────────────

const OrdersPage = () => {
  const [statusTab, setStatusTab] = useState("active");

  const { data, isLoading, isError, error } = useGetOrdersQuery();
  const orders = data?.data?.orders || [];

  const filteredOrders = orders.filter(o =>
    statusTab === "active"
      ? ACTIVE_STATUSES.includes(o.orderStatus)
      : ENDED_STATUSES.includes(o.orderStatus)
  );

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-main">

          {/* Tabs */}
          <div className="orders-tabs">
            <button
              className={"orders-tab" + (statusTab === "active" ? " orders-tab--active" : "")}
              onClick={() => setStatusTab("active")}>
              Active
            </button>
            <button
              className={"orders-tab" + (statusTab === "ended" ? " orders-tab--active" : "")}
              onClick={() => setStatusTab("ended")}>
              Completed
            </button>
          </div>

          {/* Content */}
          <div className="orders-list">
            {isLoading ? (
              [1, 2, 3].map(i => <div key={i} className="order-skeleton skeltoin" />)
            ) : isError ? (
              <div className="orders-empty">
                <Package size={48} color="#fca5a5" />
                <p style={{ color: "#ef4444" }}>
                  {error?.data?.message || "Something went wrong. Please try again."}
                </p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="orders-empty">
                <Package size={48} color="#cbd5e1" />
                <p>No {statusTab === "active" ? "active" : "completed"} orders found</p>
              </div>
            ) : (
              filteredOrders.map(order => (
                <OrderCard key={order._id} order={order} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;