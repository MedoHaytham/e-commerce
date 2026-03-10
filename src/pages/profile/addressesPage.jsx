import Sidebar from '../../components/sidebar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDeleteAddressMutation, useGetAddressesQuery, useGetMeQuery, useSetDefaultAddressMutation } from '../../features/userSlice';
import Address from '../../components/address/address';
import { IoMdAdd } from "react-icons/io";
import AddressForm from '../../components/address/addressForm';
import AddressLoading from '../../components/address/addressLoading';

const AddressesPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("Addresses");

  const { data: me } = useGetMeQuery();

  const {data: addressData, isLoading: isLoadingAddresses} = useGetAddressesQuery();
  const addresses = addressData?.data?.addresses || [];

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

  const [showForm, setShowForm] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [ deleteAddress ] = useDeleteAddressMutation();
  const [ setDefaultAddress ] = useSetDefaultAddressMutation();


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
        
        <div className="profile-card">
          <div className="profile-card__section">
            <h2 className="profile-card__title">Addresses</h2>
            {
              isLoadingAddresses 
              ? <AddressLoading count={2} />
              : <div className="addresses">
                {
                  addresses.map((a) => (
                    <Address 
                      key={a._id}
                      address={a}
                      isActive={a.isDefault}
                      onClick={async () => {
                        try {
                          await setDefaultAddress(a._id).unwrap();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      removeAddress={async () => {
                        try {
                          setDeletingAddressId(a._id);
                          await deleteAddress(a._id).unwrap();
                        } catch (error) {
                          console.log(error);
                        } finally {
                          setDeletingAddressId(null);
                        }
                      }}
                      isDeleting={deletingAddressId === a._id}
                      showForm={(e) => {
                        e.stopPropagation();
                        setSelectedAddress(a);
                        setShowForm(true);
                        setIsAdding(false);
                        setIsEditing(true);
                      }}
                    />
                  ))
                }
                <button className='new-address' 
                  onClick={() => {
                    setSelectedAddress(null);
                    setShowForm(true);
                    setIsAdding(true);
                    setIsEditing(false);
                  }}
                >
                  <IoMdAdd /> Add Address
                </button>
              </div>
            }
          </div>

        </div>
        <AddressForm 
          showForm={showForm}
          setShowForm={setShowForm}
          addresses={addresses}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      </div>
    </div>
  )
}

export default AddressesPage