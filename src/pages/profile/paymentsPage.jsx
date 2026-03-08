import Sidebar from '../../components/sidebar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

const PaymentsPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("Payments");

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
  }, []);

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
        
      </div>
    </div>
  )
}

export default PaymentsPage