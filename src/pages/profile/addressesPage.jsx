import Sidebar from '../../components/sidebar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetMeQuery } from '../../features/userSlice';

const AddressesPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("Addresses");

  const { data: me } = useGetMeQuery();

  useEffect(() => {

    async function fetchMe() {
      try {
        setFirstName(me.data.firstName || "");
        setLastName(me.data.lastName || "");
        setEmail(me.data.email || "");
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