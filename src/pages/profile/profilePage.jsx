import React, { useEffect, useState } from 'react'
import './profilePage.css'
import Sidebar from '../../components/sidebar';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useGetMeQuery, useUpdateMeMutation } from '../../features/userSlice';
import PageTransition from '../../components/pageTransition';

const countries = [
  {value: 'egypt', label: 'Egypt'},
  {value: 'saudi arabia', label: 'Saudi Arabia'},
  {value: 'uae', label: 'UAE'},
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

const ProfilePage = () => {
  const location = useLocation();
  const me = location.state?.me || {};
  const isAuthenticated = Cookies.get('accessToken') ? true : false;
  const { data: meData } = useGetMeQuery();
  const [updateMe] = useUpdateMeMutation();

  const toDateInput = (d) => {
    if (!d) return "";
    const date = new Date(d);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
  };

  useEffect(() => {
    if (location.state?.me) return;

    async function fetchMe() {
      try {
        
        setFirstName(meData?.data?.firstName || "");
        setLastName(meData?.data?.lastName || "");
        setEmail(meData?.data?.email || "");
        setPhone(meData?.data?.phone || "");
        setCountry(meData?.data?.country || "");
        setBirthDate(toDateInput(meData?.data?.birthDate) || "");
        setGender(meData?.data?.gender || "");
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "Error on Fetch Me";

        toast.error(msg);
      }
    }
    fetchMe();
  }, [location.state?.me, isAuthenticated, meData]);


  const [firstName, setFirstName] = useState(me.firstName || "");
  const [lastName, setLastName] = useState(me.lastName || "");
  const [email, setEmail] = useState(me.email || "");
  const [phone, setPhone] = useState(me.phone || "");
  const [country, setCountry] = useState(me.country || "egypt");
  const [birthDate, setBirthDate] = useState(toDateInput(me.birthDate));
  const [gender, setGender] = useState(me.gender || "male");
  const [activeTab, setActiveTab] = useState("Profile");

  const handleUpdate = async () => {
    try {
      const res = await updateMe({
        firstName,
        lastName,
        email,
        phone,
        country,
        birthDate,
        gender,
      });
      setFirstName(res.data.data.firstName);
      setLastName(res.data.data.lastName);
      setEmail(res.data.data.email);
      setPhone(res.data.data.phone);
      setCountry(res.data.data.country);
      setBirthDate(toDateInput(res.data.data.birthDate));
      setGender(res.data.data.gender);
      toast.success("Profile updated successfully!");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Error on Update Profile";
      toast.error(msg);
    }
  };

  return (
    
      <div className="profile-page">
        {/* Main content inside your container */}
        <PageTransition>
          <div className="container">
            {/* Sidebar */}
            <Sidebar
              firstName={firstName}
              lastName={lastName}
              email={email}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

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
                    <label>Country</label>
                    <select value={country} onChange={e => setCountry(e.target.value)}>
                      {countries.map(n => (
                        <option key={n.value} value={n.value}>{n.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field form-field--date">
                    <label>Birth Date</label>
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
                    <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
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
        </PageTransition>
      </div>
    
  );
};

export default ProfilePage;