import React from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import hostName from '../../utils/domain'
import toast from 'react-hot-toast'
import './style.css'
import { useDispatch } from 'react-redux'
import { manageAuth } from '../../redux/authSlice'

const ButtonComponent = ({name,bgColor,type,id,color,html,css,js}) => {
  const navigate = useNavigate()
  const buttonStyle = {
    backgroundColor:bgColor,
    color
  }
 const dispatch = useDispatch();
  async function handleLogout(){
     try{
        const response = await axios.get(hostName+'/auth/logout',{withCredentials : true})
          toast.success(response.data.message)
          dispatch(manageAuth(false));
          navigate('/login')
     } 
     catch(err){
        console.log(err.message);
     }
  }
  async function handleAccountDeletion(){
    try{    
     const response = await axios.post(hostName+'/dashboard/delete-account',{id},{withCredentials : true});
      toast.success(response.data.message);
      dispatch(manageAuth(false));
      navigate('/signup')
    }
    catch(err){
      toast.error(err.message)
    }
   }

   async function handleSave(id,html,css,js){
        try{
            const response = await axios.post(hostName+'/dashboard/save-files',{id,html,css,js});
            toast.success(response.data.message); 
        }
        catch(error){
            console.log(error);
        }
   }

   
  function handleClick(id){
     if(name === 'Signup') navigate('/signup')
     if(name === 'Login') navigate('/login')
     if(name === 'Logout') handleLogout()
     if(name === 'Delete Account') handleAccountDeletion();
     if(name === 'Exit'){
     const response = window.confirm('Have you saved the files ?');
     if(response){
        navigate('/dashboard')
     }
     }
     if(name === 'Save') handleSave(id,html,css,js)
  }

  return (
    <button className='btn' type={type} onClick={() => handleClick(id)} id={id} style={bgColor ? buttonStyle : {background : '#6200EE'}}>{name}</button>
  )
}

export default ButtonComponent
