import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import Address from './address';
import AddressForm from './addressForm';



const ShipingMethod = () => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [addresses, setAdresses] = useState(() => {
    const savedAddress = localStorage.getItem('address');
    return savedAddress ? JSON.parse(savedAddress) : [];
  });
  const [showForm, setShowForm] = useState(false);

  const removeAddress = (title) => {
    const newAdresses = addresses.filter((a) => (a.title !== title));
    setAdresses(newAdresses);
  } 

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
            addresses.map((a, index) => (
              <Address 
                key={index}
                address={a}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                removeAddress={removeAddress}
              />
            ))
          }
          <button className='new-address' onClick={() => setShowForm(true)}><IoMdAdd /> Add Address</button>
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
        setAdresses={setAdresses}
      />
    </div>
  );
}

export default ShipingMethod;