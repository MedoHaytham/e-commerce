import React, { useState } from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';

import './registerPage.css';

const RegisterPage = () => {

  const [form, setForm] = useState({
    username: '',
    email:'',
    password: '',
    confirmPassword: '',
  });

  let onChangeHandler = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name] : value}));
  }
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const schema = {
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .label('Confirm Password')
      .options({ language: { any: { allowOnly: 'must match password' } } }),
  }

  const [errors, setErrors] = useState({});

  const validate = () => {
    const {error} = Joi.validate(form, schema, {abortEarly: false});
    
    const errors = {};
    if(error) {
      for(let i = 0; i < error.details.length; i++) {
        errors[error.details[i].path[0]] = error.details[i].message;
      }
    }

    setErrors(errors);
    return Object.keys(errors).length > 0 ? errors : null;
  }

  let submitHadnler = (e) => {
    e.preventDefault();
  
    const errors = validate();
    if(errors) return;
    console.log('submit');
  }

  return ( 
    <div className='register'>
      <main className='container'>
        <h1>Register</h1>
        <form onSubmit={submitHadnler}>
          <div className="mb-3">
            <label htmlFor="inputUsername" className="form-label">Username<span className='mandatory'>*</span></label>
            <input onChange={onChangeHandler} name='username' value={form.username} id="inputUsername" type="text" className="form-control" />
            {errors.username && <div className='alert alert-danger mt-2' >{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email address<span className='mandatory'>*</span></label>
            <input onChange={onChangeHandler} name='email' value={form.email} id="inputEmail" type="email" className="form-control"  aria-describedby="emailHelp" />
            {errors.email && <div className='alert alert-danger mt-2' >{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password<span className='mandatory'>*</span></label>
            <div className="position-relative">
              <input onChange={onChangeHandler} name='password' value={form.password} id="inputPassword" type={showPassword ? "text" : "password"} className="form-control" />
              <i onClick={() => setShowPassword((prev) => !prev)} className={`fa-solid ${ showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`} 
                style={{
                  cursor: 'pointer',
                  top: '50%',
                  right: '10px',
                  transform: 'translatey(-50%)',
                }}></i>
            </div> 
            {errors.password && <div className='alert alert-danger mt-2' >{errors.password}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputConfirmPassword" className="form-label">Confirm Password<span className='mandatory'>*</span></label>
            <div className="position-relative">
              <input onChange={onChangeHandler} name='confirmPassword' value={form.confirmPassword} id="inputConfirmPassword" type={showConfirmPassword ? "text" : "password"} className="form-control" />
              <i onClick={() => setShowConfirmPassword((prev) => !prev)} className={`fa-solid ${ showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`} 
                style={{
                  cursor: 'pointer',
                  top: '50%',
                  right: '10px',
                  transform: 'translatey(-50%)',
                }}></i>
            </div> 
            {errors.confirmPassword && <div className='alert alert-danger mt-2' >{errors.confirmPassword}</div>}
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="check" />
            <label className="form-check-label" htmlFor="check">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <div className='login'>
            <Link to={'/signIn'}>
              Already have an Account? <span>Login</span>
            </Link>            
          </div>
        </form>
      </main>
    </div>
  );
}

export default RegisterPage;