import React from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import hostName from '../../utils/domain'
import toast from 'react-hot-toast'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { manageAuth } from '../../redux/authSlice'
import { useForkArenaMutation, useUpdateUserArenaMutation } from '../../redux/apiSlice'

const ButtonComponent = ({name,bgColor,type,id,color,html,css,js,arenaName}) => {
  const auth = useSelector(state => state.auth)
  const [updateArena] = useUpdateUserArenaMutation()
  const [forkArena] = useForkArenaMutation()
  const navigate = useNavigate()
  const buttonStyle = {
    backgroundColor:bgColor,
    color,
    padding : '4px 10px',
    fontSize : '1.1em'
  }
 const dispatch = useDispatch();

  async function handleLogout(){
     try{
       localStorage.removeItem('token');
       dispatch(manageAuth(false));
       toast.success('Logged out successfully');
        navigate('/login')
     } 
     catch(err){
        console.log(err.message);
     }
  }
  async function handleAccountDeletion(){
    try{    
     const response = await axios.post(hostName+'/dashboard/delete-account',{id},{
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
     });
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
            const response = await updateArena({id,html,css,js}).unwrap()
            toast.success(response.message); 
        }
        catch(error){
            console.log(error);
        }
   }

   function handleShare(id){
      navigator.clipboard.writeText(`${window.location.origin}/arena/${id}`);
      toast.success('Link copied')
   }

  async function handleFork(){
     sessionStorage.setItem('forked_html',html)
     sessionStorage.setItem('forked_css',css)
     sessionStorage.setItem('forked_js',js)
     sessionStorage.setItem('forked_arenaName',arenaName)
     const forkedHtml = html;
     const forkedCss = css;
     const forkedJs = js;
     const forkedArenaName = arenaName
     console.log(auth)
     if(auth){
       try{
        await forkArena({forkedFiles : {forkedHtml,forkedCss,forkedJs,forkedArenaName}}).unwrap()
        sessionStorage.clear()
        toast.success('Forked Successfully')
       }
       catch(err){
         toast.error('Something went wrong')
       }
     }
    else{
      toast('Please login for saving files')
      navigate('/login')
    } 
   }

  function handleClick(id){
    switch (name) {
      case 'Get Started': navigate('/signup'); break;
      case 'Login':  navigate('/login'); break;
      case 'Explore': navigate('/explore'); break;
      case 'Dashboard' : navigate('/dashboard');break;
      case 'Logout': handleLogout(); break;
      case 'Delete Account': handleAccountDeletion(); break;
      case 'Exit': const response = window.confirm('Have you saved the file ?');
                     if (response) {
                       navigate('/dashboard');
                      } break;
      case 'Save': handleSave(id, html, css, js); break;
      case 'Share': handleShare(id); break;
      case 'Fork' : handleFork(); break;
      default : console.warn(`Unknown menu item: ${name}`);
  }
}

  return (
    <button className='btn' type={type} onClick={() => handleClick(id)} id={id} style={bgColor ? buttonStyle : {background : '#6200EE'}}>{name}</button>
  )
}

export default ButtonComponent
