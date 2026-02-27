import React, { useState, useEffect } from 'react';
import Joi from 'joi-browser';
import './loginPage.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken } from '../../features/authSlice';


const SignInPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  let onChangeHandler = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name] : value}));
  }

  const [show, setShow] = useState(false);

  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  }

  const [errors, setErrors] = useState({});
  const [errorsLogin, setErrorLogin] = useState('');

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

  const login = async () => {
    const {data} = await axios.post('https://e-commerce-backend-geri.onrender.com/api/users/login', form);
    dispatch(setToken(data.data.token));
    toast.success('Login Success');
  }

  let submitHadnler = async (e) => {
    e.preventDefault();
    
    const errors = validate();

    if(errors) return;
    try {
      await login();
      navigate('/', {replace: true});
    } catch(error) {
      const msg = error?.response?.data?.message || error?.message || 'Login Failed';
      setErrorLogin(msg);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return ( 
    <div className='login'>
      <main className='container position-absolute top-50 start-50 translate-middle'>
        <h1>Login</h1>
        {errorsLogin && <div className='alert alert-danger mt-2' >{errorsLogin}</div>}
        <form onSubmit={submitHadnler}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email address<span className='mandatory'>*</span></label>
            <input onChange={onChangeHandler} name='email' value={form.email} id="inputEmail" type="email" className="form-control"  aria-describedby="emailHelp" />
            {errors.email && <div className='alert alert-danger mt-2' >{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password<span className='mandatory'>*</span></label>
            <div className="position-relative">
              <input onChange={onChangeHandler} value={form.password} name='password' id="inputPassword" type={show? "text" : "password"} className="form-control" />
              <i onClick={() => setShow((prev) => !prev)} className={`fa-solid ${ show ? 'fa-eye-slash' : 'fa-eye'} position-absolute`} 
                style={{
                  cursor: 'pointer',
                  top: '50%',
                  right: '10px',
                  transform: 'translatey(-50%)',
                }}></i>
            </div> 
            {errors.password && <div className='alert alert-danger mt-2' >{errors.password}</div>}
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="check" />
            <label className="form-check-label" htmlFor="check">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <div className='register'>
            <Link to={'/register'}>
              Don't have an Account? <span>Register</span>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default SignInPage;
