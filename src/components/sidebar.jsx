import React from 'react'
import {  User, MapPin, CreditCard, Shield } from "lucide-react";
import { Link } from 'react-router-dom';

const accountItems = [
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Addresses", icon: MapPin, path: "/addresses" },
  { label: "Payments", icon: CreditCard, path: "/payments" },
  { label: "Security Settings", icon: Shield, path: "/security-settings" },
];


const Sidebar = ({firstName, lastName, email, activeTab, setActiveTab}) => {
  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <div className="sidebar__avatar">{initials}</div>
        <div>
          <div className="sidebar__user-name">{firstName} {lastName}</div>
          <div className="sidebar__user-email">{email}</div>
        </div>
      </div>
      <div className="sidebar__section">
        <div className="sidebar__section-label">My Account</div>
        {accountItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={label}
            className={`sidebar__item${activeTab === label ? ' sidebar__item--active' : ''}`}
            onClick={() => setActiveTab(label)}
            to={path}
          >
            <Icon size={17} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar