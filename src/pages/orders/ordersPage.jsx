import React, { useState } from 'react'
import './ordersPage.css'
import { Package } from "lucide-react";
import { useGetOrdersQuery } from "../../features/orderSlice";
import OrderCard from '../../components/orderCard';

const ACTIVE_STATUSES = ["pending", "confirmed", "processing", "shipped"];
const ENDED_STATUSES  = ["delivered", "cancelled"];

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