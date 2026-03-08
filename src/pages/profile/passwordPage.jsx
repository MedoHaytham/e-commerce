import Sidebar from '../../components/sidebar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLogoutMutation } from '../../features/authSlice';
import { useGetMeQuery, useUpdatePasswordMutation, useDeleteAccountMutation } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import apiSlice from '../../app/api/apiSlice';

const PasswordPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("Security Settings");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();
  const [deleteAccount] = useDeleteAccountMutation();
  const [logout] = useLogoutMutation();

  const { data: me } = useGetMeQuery();
  const [updatePassword] = useUpdatePasswordMutation();
  const dispatch = useDispatch();


  useEffect(() => {

    async function fetchMe() {
      try {
        setFirstName(me?.data?.firstName || "");
        setLastName(me?.data?.lastName || "");
        setEmail(me?.data?.email || "");
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "Error on Fetch Me";

        toast.error(msg);
      }
    }
    fetchMe();
  }, [me]);

  const handleUpdatePassword = async () => {
    try {
      const res = await updatePassword({
        currentPassword,
        newPassword,
      }).unwrap();
      toast.success(res.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Error on Update Password";

      toast.error(msg);
    }
  };


const handleDeleteAccount = async () => {
  if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone")) {
    return;
  }
  try {
    await deleteAccount().unwrap();
    await logout().unwrap();
    Cookies.remove("accessToken");
    dispatch(apiSlice.util.resetApiState());
    toast.success("Account deleted successfully");
    navigate("/signIn", { replace: true });
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Error on Delete Account";

    toast.error(msg);
  }
};

  return (
    <div className="profile-page">
      {/* Main content inside your container */}
      <div className="container">
        {/* Sidebar */}
        <Sidebar
          firstName={firstName}
          lastName={lastName}
          email={email}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className='flex-grow-1' style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
          {/* password card */}
          <div className="profile-card">

            {/* Contact Information */}
            <div className="profile-card__section">
              <h2 className="profile-card__title">Password</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label>Current Password</label>
                  <div className='position-relative'>
                    <input className='position-relative' type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    <i onClick={() => setShowCurrentPassword((prev) => !prev)} className={`fa-solid ${ showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`} 
                      style={{
                        top: '50%',
                        right: '10px',
                        transform: 'translatey(-50%)',
                      }}></i>
                  </div>
                </div>
                <div className="form-field">
                  <label>New Password</label>
                  <div className='position-relative'>
                    <input className='position-relative' type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <i onClick={() => setShowNewPassword((prev) => !prev)} className={`fa-solid ${ showNewPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`} 
                      style={{
                        top: '50%',
                        right: '10px',
                        transform: 'translatey(-50%)',
                      }}></i>
                  </div>
                </div>
              </div>
              {/* Save Changes Button */}
              <div className="form-footer">
                <button className="update-btn" onClick={handleUpdatePassword}>
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* delete account card */}
          <div className="profile-card">
            <div className="profile-card__section">
              <h2 className="profile-card__title">Delete Account</h2>
              
              <div className="form-footer">
                <button className="update-btn" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordPage