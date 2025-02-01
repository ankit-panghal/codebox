import { Avatar, Box } from '@mui/material'
import React from 'react'
import ButtonComponent from '../Button'
import './style.css'
import UploadFile from './Upload';

const SideProfile = ({data,isOpen}) => {
   
  return (
    <div className='side-profile' style={!isOpen ? {display : 'none'} : {display : 'flex'}}>
    <UploadFile data={data}/>
    <div>Hi! <span className='user_name'>{data.name}</span></div>
     <div className='out-btns'>
     <ButtonComponent name={'Logout'} bgColor={'#0496FF'}/>
     <ButtonComponent name={'Delete Account'} id={data._id} bgColor={'crimson'}/>
     </div>
     </div>
  )
}

export default SideProfile
