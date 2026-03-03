import React, { useState } from 'react'
import './profilePage.css'
import { User, MapPin, CreditCard, Bell, Shield } from "lucide-react";

const mockUser = {
  firstName: "Yousef",
  lastName: "Sayed",
  email: "yousef.sayed@gmail.com",
  phone: "+20 123 456 7890",
  nationality: "egyptian",
  birthday: "1995-06-15",
  gender: "male",
};

const countries = [
  {value: 'egypt', label: 'Egypt'},
  {value: 'saudi arabia', label: 'Saudi Arabia'},
  {value: 'emirates', label: 'Emirates'},
  {value: 'qatar', label: 'Qatar'},
  {value: 'american', label: 'American'},
  {value: 'british', label: 'British'},
  {value: 'yemen', label: 'Yemen'},
  {value: 'syria', label: 'Syria'},
  {value: 'lebanon', label: 'Lebanon'},
  {value: 'jordan', label: 'Jordan'},
  {value: 'palestine', label: 'Palestine'},
  {value: 'iraq', label: 'Iraq'},
  {value: 'morocco', label: 'Morocco'},
  {value: 'algeria', label: 'Algeria'},
  {value: 'tunisia', label: 'Tunisia'},
  {value: 'libya', label: 'Libya'},
  {value: 'sudan', label: 'Sudan'},
  {value: 'somalia', label: 'Somalia'},
  {value: 'djibouti', label: 'Djibouti'},
  {value: 'comoros', label: 'Comoros'},
  {value: 'other', label: 'Other'}
];

const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="toast">
      <div className="toast__icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {message}
    </div>
  );
};


const accountItems = [
  { label: "Profile",   icon: User },
  { label: "Addresses", icon: MapPin },
  { label: "Payments",  icon: CreditCard },
];

const otherItems = [
  { label: "Notifications",    icon: Bell },
  { label: "Security Settings", icon: Shield },
];

const ProfilePage = () => {
  const [firstName,   setFirstName]   = useState(mockUser.firstName);
  const [lastName,    setLastName]    = useState(mockUser.lastName);
  const [email,       setEmail]       = useState(mockUser.email);
  const [phone,       setPhone]       = useState(mockUser.phone);
  const [nationality, setNationality] = useState(mockUser.nationality);
  const [birthday,    setBirthday]    = useState(mockUser.birthday);
  const [gender,      setGender]      = useState(mockUser.gender);
  const [activeTab,   setActiveTab]   = useState("Profile");
  const [toast,       setToast]       = useState(null);

  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  const handleUpdate = () => setToast("Profile updated successfully!");

  return (
    <div className="profile-page">
      {/* Main content inside your container */}
      <div className="container">
        {/* Sidebar */}
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
            {accountItems.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className={`sidebar__item${activeTab === label ? ' sidebar__item--active' : ''}`}
                onClick={() => setActiveTab(label)}
              >
                <Icon size={17} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="sidebar__section">
            <div className="sidebar__section-label">Others</div>
            {otherItems.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className={`sidebar__item${activeTab === label ? ' sidebar__item--active' : ''}`}
                onClick={() => setActiveTab(label)}
              >
                <Icon size={17} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile card */}
        <div className="profile-card">

          {/* Contact Information */}
          <div className="profile-card__section">
            <h2 className="profile-card__title">Contact Information</h2>
            <div className="form-grid">
              <div className="form-field">
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="profile-card__section">
            <h2 className="profile-card__title">Personal Information</h2>

            <div className="form-grid">
              <div className="form-field">
                <label>First Name</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Nationality</label>
                <select value={nationality} onChange={e => setNationality(e.target.value)}>
                  {countries.map(n => (
                    <option key={n.value} value={n.value}>{n.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-field form-field--date">
                <label>Birthday</label>
                <svg
                  className="date-icon"
                  width="16" height="16"
                  fill="none" stroke="currentColor" strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8"  y1="2" x2="8"  y2="6" />
                  <line x1="3"  y1="10" x2="21" y2="10" />
                </svg>
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
              </div>
            </div>

            <div className="gender-group">
              <span className="group-label">Gender</span>
              <div className="gender-options">
                {['male', 'female'].map(g => (
                  <label key={g} className="gender-option" onClick={() => setGender(g)}>
                    <div className={`radio-circle${gender === g ? ' radio-circle--active' : ''}`}>
                      {gender === g && <div className="radio-dot" />}
                    </div>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-footer">
              <button className="update-btn" onClick={handleUpdate}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ProfilePage;