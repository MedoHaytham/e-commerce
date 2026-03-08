import React, { useState } from 'react';
import Joi from 'joi-browser';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import api from '../../api/axiosInstance';
import Cookies from 'js-cookie';

import './registerPage.css';
import { useRegisterMutation } from '../../features/authSlice';
import LoadingCircle from '../../components/loadingCircle/loadingCircle';

const countries = [
  {value: 'egypt', label: 'Egypt'},
  {value: 'saudi arabia', label: 'Saudi Arabia'},
  {value: 'emirates', label: 'Emirates'},
  {value: 'qatar', label: 'Qatar'},
  {value: 'american', label: 'American'},
  {value: 'british', label: 'British'},
  {value: 'yemen', label: 'Yemen'},
  {value: 'syria', label: 'Syria'},
  {value: 'lebanon', label: 'Lebanon'},
  {value: 'jordan', label: 'Jordan'},
  {value: 'palestine', label: 'Palestine'},
  {value: 'iraq', label: 'Iraq'},
  {value: 'morocco', label: 'Morocco'},
  {value: 'algeria', label: 'Algeria'},
  {value: 'tunisia', label: 'Tunisia'},
  {value: 'libya', label: 'Libya'},
  {value: 'sudan', label: 'Sudan'},
  {value: 'somalia', label: 'Somalia'},
  {value: 'djibouti', label: 'Djibouti'},
  {value: 'comoros', label: 'Comoros'},
  {value: 'other', label: 'Other'}
];


const RegisterPage = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    birthDate: '',
    gender: '',
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
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string()
    .regex(/^01[0125][0-9]{8}$/)
    .required(),
    country: Joi.string().required(),
    birthDate: Joi.string().required(),
    gender: Joi.string().required(),
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


  let submitHadnler = async (e) => {
    e.preventDefault();
  
    const errors = validate();
    if(errors) return;
    try {
      const {data} = await register(form);
      const accessToken = data.data.accessToken;
      if (accessToken) {
        Cookies.set('accessToken', accessToken, { path: "/" });
        setForm({
          firstName: '',
          lastName: '',
          phone: '',
          country: '',
          birthDate: '',
          gender: '',
          email:'',
          password: '',
          confirmPassword: '',
        });
        navigate('/signIn');
        toast.success('Register Success');
      } 
    } catch(error) {
      const msg = error?.response?.data?.message || error?.message || 'Register Failed';
      console.log(error);
      console.log(msg);
    }
  }

  return (
    <div className='register'>
      <main className='container'>
        <h1>Register</h1>
        {isError && error && <p className='alert alert-danger mt-2'>{error.data.message}</p>}
        <form onSubmit={submitHadnler}>
          <div className='row'>
            <div className="mb-3 col-6">
              <label htmlFor="inputFirstName" className="form-label">First Name<span className='mandatory'>*</span></label>
              <input onChange={onChangeHandler} name='firstName' value={form.firstName} id="inputFirstName" type="text" className="form-control" />
              {errors.firstName && <div className='alert alert-danger mt-2' >{errors.firstName}</div>}
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="inputLastName" className="form-label">Last Name<span className='mandatory'>*</span></label>
              <input onChange={onChangeHandler} name='lastName' value={form.lastName} id="inputLastName" type="text" className="form-control" />
              {errors.lastName && <div className='alert alert-danger mt-2' >{errors.lastName}</div>}
            </div>
          </div>
          <div className='row'>
            <div className="mb-3 col-6">
              <label htmlFor="inputPhone" className="form-label">Phone Number<span className='mandatory'>*</span></label>
              <input onChange={onChangeHandler} name='phone' value={form.phone} id="inputPhone" type="tel" className="form-control" />
              {errors.phone && <div className='alert alert-danger mt-2' >{errors.phone}</div>}
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="inputCountry" className="form-label">Country<span className='mandatory'>*</span></label>
              <select onChange={onChangeHandler} name='country' value={form.country} id="inputCountry" className="form-select">
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              {errors.country && <div className='alert alert-danger mt-2' >{errors.country}</div>}
            </div>
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
          <div className='row'>
            <div className="mb-3 col-6">
              <label htmlFor="inputBirthday" className="form-label">Birthday<span className='mandatory'>*</span></label>
              <input onChange={onChangeHandler} name='birthDate' value={form.birthDate} id="inputBirthday" type="date" className="form-control" />
              {errors.birthDate && <div className='alert alert-danger mt-2' >{errors.birthDate}</div>}
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="inputGender" className="form-label">Gender<span className='mandatory'>*</span></label>
              <select onChange={onChangeHandler} name='gender' value={form.gender} id="inputGender" className="form-select">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <div className='alert alert-danger mt-2' >{errors.gender}</div>}
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="btn btn-primary mt-4">
            {isLoading ? <LoadingCircle /> : 'Submit'}
          </button>
          <div className='login mt-3'>
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