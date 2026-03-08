import Sidebar from '../../components/sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddressesPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("Addresses");

  const navigate = useNavigate();

  useEffect(() => {

    async function fetchMe() {
      try {
        const res = await axios.get('https://e-commerce-backend-geri.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        }); 
        setFirstName(res.data.data.firstName || "");
        setLastName(res.data.data.lastName || "");
        setEmail(res.data.data.email || "");
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "Error on Fetch Me";

        toast.error(msg);
      }
    }
    fetchMe();
  }, [navigate]);



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
          
        </div>
      </div>
    </div>
  )
}

export default AddressesPage