import React from 'react';
import { IoMdClose } from "react-icons/io";


const Address = ({address, isActive, onClick, removeAddress}) => {


  return ( 
    <div 
      className={`address ${isActive? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="title">
        <h2>{address.title}</h2>
        <IoMdClose onClick={() => removeAddress(address.title)}/>
      </div>
      <p>{address.firstName} {address.lastName }</p>
      <p>{address.address}</p>
      <p>{address.phone}</p>
    </div>
  );
}

export default Address;