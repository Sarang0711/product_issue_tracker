import React from 'react';
import { useState, useEffect } from 'react';
import {FaUser} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth);

  useEffect(()=>{
    if(isError) {
      toast.error(message)
    }
    // Redirect if successfully registered and logged in
    if(isSuccess && user) {
      navigate('/');
    }

    dispatch(reset())

  }, [isError, isSuccess, user, dispatch, message, navigate])
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(password !== password2) {
      toast.error('Password does not matched')
    }
    else {
      const userData = {name, email, password}
      dispatch(register(userData));
    }
  }

  const {name, email, password, password2} = formData;

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register {user}
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
           type="text"
           className='form-control'
           id='name'
           name='name'
           value={name}
           onChange={onChange}
           placeholder='Enter your name'
           required
          />
        </div>
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
          <input
           type="password"
           className='form-control'
           id='password2'
           name='password2'
           value={password2}
           onChange={onChange}
           required
           placeholder='Confirm Password'
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Submit</button>
        </div>
         
        </form>
      </section>
    </>
  )
}

export default Register