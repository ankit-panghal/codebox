import React, { useState } from 'react'
import {Upload} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import ButtonComponent from '../Button';
import hostName from '../../utils/domain';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '../Loader'

const UploadFile = ({data}) => {
    const [imageFile,setImageFile] = useState(data?.imageUrl ? data.imageUrl : '');
    const[file,setFile] = useState(null)
    const [loading,setLoading] = useState(false)
    
    function handleImage(e){
        const file = e.target.files[0]
        if(file){
        setImageFile(URL.createObjectURL(file))
        setFile(file)
        }
    }
    async function handleUpload(e){
       e.preventDefault()
       const formData = new FormData();
       formData.append('image',file)

       try{
        setLoading(true)
         const response = await axios.post(hostName+'/upload',formData,{
            headers : {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
         })
         console.log(response)
         setLoading(false)
         toast.success(response.data.message)
       }
       catch(err){
          setLoading(false);
          console.log(err);
       }
       setFile(null)
    }
  return<>
        <Loader loading={loading}/>
        <form className='upload-form' onSubmit={handleUpload} encType='multipart/form-data'>
                <div className='upload-box'>
                      <Avatar sx={{ bgcolor: 'tomato',
                          width : '100%', height : '100%',
                          fontSize : '8vw',
                          }}
                          src={imageFile}
                      ></Avatar>
                <label htmlFor='upload-image' className='upload overlay'><Upload sx={{fontSize : '5vw',color : 'black'}}/>
                </label>
                  </div>
                <input style={{display : 'none'}} id='upload-image' type='file' name='image' accept='image/*' onChange={handleImage}/>
              { file && <ButtonComponent name={'Upload'} bgColor={'rgb(31, 71, 252)'}/>}
        </form>
         
  </>
  
}

export default UploadFile