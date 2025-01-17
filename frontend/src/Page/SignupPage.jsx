import React, { useEffect } from 'react'
import { useState } from 'react'
import Input from '../Components/Input';
import ButtonComponent from '../Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import hostName from '../utils/domain';
import Loader from '../Components/Loader';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);

     const navigate = useNavigate()

 async function handleSubmit(e){
    setLoading(true);
    e.preventDefault();
    try{
      const response = await axios.post(hostName+'/auth/signup',{name,email,password});
        setLoading(false);
        toast.success(response.data.message)
        navigate('/login')
    }
    catch(err){
      setLoading(false)
      toast.error(err.response.data.error)
    }
  }

  return (<>
  <Loader loading={loading}/>
    <div className='form-container'>
     <form onSubmit={handleSubmit}>
      <h1 style={{textAlign : 'center'}}>Signup</h1>
      <Input type={'text'} name={'name'} placeholder={'Enter your Name'} value={name} setValue={setName}/>
      <Input type={'email'} name={'email'} placeholder={'Enter your Email'} value={email} setValue={setEmail}/>
      <Input type={'password'} name={'password'} placeholder={'Enter your Password'} value={password} setValue={setPassword}/>
      <ButtonComponent name={'Register'} type={'submit'}/>
     </form>
     <p onClick={() => navigate('/login')}>Already have an account? Login here.</p>
    </div>
    </>
  )
}

export default SignupPage
