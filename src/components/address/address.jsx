import React from 'react';
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import LoadingCircle from '../loadingCircle/loadingCircle';
import './address.css';


const Address = ({address, isActive, onClick, removeAddress, isDeleting, showForm}) => {

  return ( 
    <div 
      className={`address ${isActive? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="title">
        <h2>{address.title}</h2>
        <div>
          <FaEdit onClick={ showForm }/>
          {
            isDeleting ? (
              <LoadingCircle />
            ) : (
                <IoMdClose onClick={(e) => {
                e.stopPropagation();
                removeAddress();
              }}/>
            )
          }        
        </div>
      </div>
      <p>{address.firstName} {address.lastName }</p>
      <p>{address.address}</p>
      <p>{address.city}. {address.country}</p>
      <p>{address.phone}</p>
    </div>
  );
}

export default Address;