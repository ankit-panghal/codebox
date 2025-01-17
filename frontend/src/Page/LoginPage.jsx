import React, { useEffect } from 'react'
import { useState } from 'react'
import Input from '../Components/Input';
import ButtonComponent from '../Components/Button';
import axios from 'axios'
import hostName from '../utils/domain';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { manageAuth } from '../redux/authSlice';

const LoginPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  async function handleSubmit(e){
     e.preventDefault()
     setLoading(true);
     try{
       const response = await axios.post(hostName+'/auth/login',{email,password},{withCredentials : true});
        setLoading(false);
         toast.success(response.data.message)
         dispatch(manageAuth(true))
         navigate('/dashboard')
     }
     catch(err){
      setLoading(false);
      console.log(err.message);
      toast.error(err.response.data.message)
     }
  }
  
    return (<>
    <Loader loading={loading}/>
    <div className='form-container'>
     <form onSubmit={handleSubmit}>
      <h1 style={{textAlign : 'center'}}>Login</h1>
      <Input type={'email'} name={'email'} placeholder={'Enter your Email'} value={email} setValue={setEmail}/>
      <Input type={'password'} name={'password'} placeholder={'Enter your Password'} value={password} setValue={setPassword}/>
      <ButtonComponent name={'Sign in'} type={'submit'}/>
     </form>
     <p onClick={() => navigate('/signup')}>Don't have an account? Signup here.</p>
    </div>
    </>
  )
}

export default LoginPage
