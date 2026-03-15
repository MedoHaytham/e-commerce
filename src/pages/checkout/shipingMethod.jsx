import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import Address from '../../components/address/address';
import AddressForm from '../../components/address/addressForm';
import { useDeleteAddressMutation, useGetAddressesQuery, useGetMeQuery, useSetDefaultAddressMutation } from '../../features/userSlice';
import AddressLoading from '../../components/address/addressLoading';
import { useCreateOrderMutation } from '../../features/orderSlice';
import { useNavigate } from 'react-router-dom';
import LoadingCircle from '../../components/loadingCircle/loadingCircle';
import toast from 'react-hot-toast';



const ShipingMethod = () => {
  
  const [showForm, setShowForm] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const { data: addressesData, isLoading } = useGetAddressesQuery();
  const addresses = addressesData?.data?.addresses || [];

  const [ deleteAddress ] = useDeleteAddressMutation();
  const [ setDefaultAddress ] = useSetDefaultAddressMutation();
  const {data: me, refetch: refetchMe} = useGetMeQuery();
  const [ createOrder, { isLoading: isCreatingOrder } ] = useCreateOrderMutation();

  const handleOpenAddAddress = async () => {
    try {
      const refreshedMe = await refetchMe().unwrap();
      const latestCountry = refreshedMe?.data?.country || '';

      setCountry(latestCountry);
    } catch (error) {
      console.log(error);
      setCountry(me?.data?.country || '');
    }

    setSelectedAddress(null);
    setIsAdding(true);
    setIsEditing(false);
    setShowForm(true);
  };

  const hadleProceedToPayment = async () => {
    try {
      if (addresses.length === 0) {
        toast.error('Please add an address');
        return;
      }

      const defaultAddress = addresses.find((a) => a.isDefault);
      if (!defaultAddress) {
        toast.error('Please select an address');
        return;
      }

      const addressId = defaultAddress?._id;
      await createOrder({
        addressId: addressId,
        notes: notes,
      }).unwrap();
      navigate('/orderpay');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="shiping-method">
        <div className="top-shiping">
          <IoMdCheckmarkCircleOutline />
          <h1>Shipping Method</h1>
        </div>
        <div className="bottom-shiping">
          <h1>Shipping Address</h1>
          <div className="addresses">
            {
              isLoading 
              ? <AddressLoading count={2} />
              :
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
            {
              isLoading 
              ? null 
              : <button className='new-address' 
                  onClick={handleOpenAddAddress}
                >
                  <IoMdAdd /> Add Address
                </button>
            }
          </div>
          <div className="notes">
            <h2>Additional Notes</h2>
            <textarea name="notes" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder='Enter Notes'></textarea>
          </div>
          <button className='btn' onClick={hadleProceedToPayment} disabled={isCreatingOrder}> {isCreatingOrder ? <LoadingCircle /> : 'Proceed to payment'}</button>
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
        country={country}
      />
    </>
  );
}

export default ShipingMethod;