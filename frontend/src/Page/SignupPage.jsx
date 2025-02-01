import { useState } from 'react'
import Input from '../Components/Input';
import ButtonComponent from '../Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import hostName from '../utils/domain';
import Loader from '../Components/Loader';
import toast from 'react-hot-toast';
import HomeHeader from '../Components/HomeHeader';
import { useDispatch } from 'react-redux';
import { manageAuth } from '../redux/authSlice';

const SignupPage = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);

     const navigate = useNavigate()
     const dispatch = useDispatch()
 async function handleSubmit(e){
    setLoading(true);
    e.preventDefault();
    try{
      const response = await axios.post(hostName+'/auth/signup',{name,email,password});
        localStorage.setItem('token',response.data.token)
        dispatch(manageAuth(true))
        toast.success(response.data.message)
        navigate('/dashboard')
        setLoading(false);
    }
    catch(err){
      setLoading(false)
      toast.error(err.response.data.message);
    }
  }

  return (<div className='signup-page'>
      <Loader loading={loading}/>
      <HomeHeader/>
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
    </div>
  )
}

export default SignupPage
