import { Box, Button } from '@mui/material'
import Input from '../Input'
import {Modal} from '@mui/material'
import React, { useState } from 'react'
import ButtonComponent from '../Button';
import './style.css';
import axios from 'axios';
import hostName from '../../utils/domain';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#393646',
  border: '2px solid #000',
  borderRadius : '10px',
  boxShadow: 24,
  p: 4
};

const ModalComponent = ({name,open,handleOpen,handleClose}) => {
     const [arenaName,setArenaName] = useState('');
     const [loading,setLoading] = useState(false);
     const navigate = useNavigate();

    async function handleCreation(e){
      e.preventDefault();
      if(arenaName.trim().length < 5){
        toast.error('Arena name should have length greater than 5')
        return;
      }
      setLoading(true);
       try{
           const response = await axios.post(hostName+'/dashboard/create-arena',{arenaName},
            {withCredentials : true});
            setLoading(false);
            toast.success(response.data.message);
            navigate('/dashboard/editor',{state : {data : response.data.data}})
       }
       catch(error){
        console.log(error);
        setLoading(false);
       }
     }

  return (
    <>
      <Button className='modal-btn' onClick={handleOpen}>{name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modal-container' sx={style}>
          <form onSubmit={handleCreation}>
          <Input type={'text'} name={'arenaName'} placeholder={'Your arena name'} value={arenaName} setValue={setArenaName}/>
          <ButtonComponent name={'Create'} bgColor={'#5C5470'} />
          </form>
        </Box>
      </Modal>
       <Loader loading={loading}/>
    </>
  )
}

export default ModalComponent
