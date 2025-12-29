import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import Joi from 'joi-browser';


const AddressForm = ({showForm, setShowForm, addresses, setAdresses}) => {

  const [form, setForm] = useState({
      title: '',
      firstName:'',
      lastName: '',
      address: '',
      city:'',
      phone: '',
    });
  
  const onChangeHandler =  (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  }

  const schema = {
    title: Joi.string().required().label('Title'),
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    address: Joi.string().required().label('Address'),
    city: Joi.string().required().label('City'),
    phone: Joi.string()
      .regex(/^[0-9]+$/)
      .min(10)
      .max(11)
      .required()
      .label('Phone'),
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const {error} = Joi.validate(form, schema, {abortEarly: false});

    const errors = {};
    if (error) {
      for(let i = 0; i < error.details.length; i++) {
        errors[error.details[i].path[0]] = error.details[i].message;
      }
    }

    setErrors(errors);
    return Object.keys(errors).length > 0 ? errors : null;
  }
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const errors = validate();
    if(errors) return;
    setAdresses((prev) => [...prev, form]);
    setShowForm(false);
  }

  useEffect(() => {
    localStorage.setItem('address', JSON.stringify(addresses));
  }, [addresses]);

  return ( 
    <div className={`add-address ${showForm ? 'show-address' : ''}`}>
      <form onSubmit={onSubmitHandler}>
        <div className="top">
          <h2>Edit Address</h2>
          <IoMdClose onClick={() => setShowForm(false)}/>
        </div>
        <div className="bottom">
          <div className='info'>
            <label htmlFor="title">titles<span className=''>*</span></label>
            <input type="text" id='title' name='title' value={form.title} onChange={onChangeHandler}/>
            {errors.title && <p className='text-danger mt-2' >{errors.title}</p>}
          </div>
          <div className='name'>
            <div className='info'>
              <label htmlFor="firstName">first Name<span>*</span></label>
              <input type="text" id='firstName' name='firstName' value={form.firstName} onChange={onChangeHandler}/>
              {errors.firstName && <p className='text-danger mt-2' >{errors.firstName}</p>}
            </div>
            <div className='info'>
              <label htmlFor="lastName">last Name<span>*</span></label>
              <input type="text" id='lastName' name='lastName' value={form.lastName} onChange={onChangeHandler}/>
              {errors.lastName && <p className='text-danger mt-2' >{errors.lastName}</p>}
            </div>
          </div>
          <div className='info'>
            <label htmlFor="address">address<span>*</span></label>
            <input type="text" id='address' name='address' value={form.address} onChange={onChangeHandler}/>
            {errors.address && <p className='text-danger mt-2' >{errors.address}</p>}
          </div>
          <div className='info'>
            <label htmlFor="city">city<span>*</span></label>
            <input type="text" id='city' name='city' value={form.city} onChange={onChangeHandler}/>
            {errors.city && <p className='text-danger mt-2' >{errors.city}</p>}
          </div>
          <div className='info'>
            <label htmlFor="phone">phone<span>*</span></label>
            <input type="tel" pattern="[0-9]*" id='phone' name='phone' value={form.phone} onChange={onChangeHandler}/>
            {errors.phone && <p className='text-danger mt-2'>{errors.phone}</p>}
            <p>eg: 1234567890</p>
          </div>
          <input type="submit" className='btn'/>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;