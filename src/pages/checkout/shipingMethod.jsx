import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import Address from './address';
import AddressForm from './addressForm';
import { useDeleteAddressMutation, useGetAddressesQuery, useSetDefaultAddressMutation } from '../../features/userSlice';



const ShipingMethod = () => {
  
  const [showForm, setShowForm] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: addressesData, isLoading } = useGetAddressesQuery();
  const addresses = addressesData?.data?.addresses || [];

  const [ deleteAddress ] = useDeleteAddressMutation();
  const [ setDefaultAddress ] = useSetDefaultAddressMutation();
  

  return ( 
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
            ? ''
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
          <button className='new-address' onClick={() => {
            setSelectedAddress(null);
            setShowForm(true);
            setIsAdding(true);
            setIsEditing(false);
          }}><IoMdAdd /> Add Address</button>
        </div>
        <div className="notes">
          <h2>Additional Notes</h2>
          <textarea name="notes" id="notes" placeholder='Enter Notes'></textarea>
        </div>
        <button className='btn'>Proceed to payment</button>
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
  );
}

export default ShipingMethod;