import React, { useState } from 'react';
import Joi from 'joi-browser';
import './loginPage.css'


const SignInPage = () => {

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  let onChangeHandler = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name] : value}));
  }

  const [show, setShow] = useState(false);

  function showHandler() {
    setShow((prev) => !prev);
  }

  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
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
    <div className='login'>
      <main className='container position-absolute top-50 start-50 translate-middle'>
        <h1>Login</h1>
        <form onSubmit={submitHadnler}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input onChange={onChangeHandler} name='username' value={form.username} id="inputEmail" type="email" className="form-control"  aria-describedby="emailHelp" />
            {errors.username && <div className='alert alert-danger mt-2' >{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <div className="position-relative">
              <input onChange={onChangeHandler} value={form.password} name='password' id="inputPassword" type={show? "text" : "password"} className="form-control" />
              <i onClick={showHandler} className={`fa-solid ${ show ? 'fa-eye-slash' : 'fa-eye'} position-absolute`} 
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
        </form>
      </main>
    </div>
  );
}

export default SignInPage;
