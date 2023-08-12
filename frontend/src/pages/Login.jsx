import React from 'react';
import { useState } from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {email, password}
    
    dispatch(login(userData));
  }


  const { email, password} = formData;

  const dispatch = useDispatch();
  const {user, isLoading, isSuccess, message} = useSelector(state => state.auth);
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Please login to use service</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
        
        <div className="form-group">
          <input
           type="text"
           className='form-control'
           id='email'
           name='email'
           value={email}
           onChange={onChange}
           placeholder='Enter your email'
           required
          />
        </div>
        <div className="form-group">
          <input
           type="password"
           className='form-control'
           id='password'
           name='password'
           value={password}
           onChange={onChange}
           required
           placeholder='Enter your password'
          />
        </div>
        
        <div className="form-group">
          <button className="btn btn-block">Login</button>
        </div>
         
        </form>
      </section>
    </>
  )
}

export default Login