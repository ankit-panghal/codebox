import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import hostName from '../../utils/domain';
import Loader from '../Loader';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './style.css'
import toast from 'react-hot-toast';
import Output from '../Output';
import PaginationComponent from '../Pagination';
import { getArenas, getPageArenas } from '../../redux/arenasSlice';

const RecentArenas = () => {
  const skipState = useSelector(state => state.skip);
  const {total,portion} = useSelector(state => state.arenas);
  const [isDeleted,setIsDeleted] = useState(false)
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
  async function fetchData(){
    setLoading(true);
    try{  
     const response = await axios.get(hostName+`/dashboard/recent-arenas/?skip=${skipState}&limit=3`,{withCredentials : true});
     console.log('response total',response.data.total)
     console.log('response portion',response.data.portion)
        dispatch(getArenas(response.data.total))
        dispatch(getPageArenas(response.data.portion))
        setLoading(false);
    }
    catch(error){
      setLoading(false);
      console.log(error.message);
    }
  }
   fetchData();
},[skipState,isDeleted])

  useEffect(() => {
    console.log('total',total);
    console.log('portion',portion);
    if(total && portion.length === 0){
      console.log('inside')
      dispatch(getPageArenas(total))
    }
  },[total,portion,isDeleted])

  async function goToArena(id){
        setLoading(true);
      try{
          const response = await axios.get(hostName+`/dashboard/get-arena/${id}`,
            {withCredentials : true});
            setLoading(false);
            navigate('/dashboard/editor',{state : {data : response.data.data}})
      }
      catch(error){
        setLoading(false);
        console.log(error)
      }
  }

  async function handleArenaDeletion(e,id){
       e.stopPropagation();
    try{
        const response = await axios.post(hostName+'/dashboard/delete-arena',{id},{withCredentials : true});
        toast.success(response.data.message);
        if(isDeleted) {
          setIsDeleted(prev => false)
          setIsDeleted(prev => true)
        }
        else setIsDeleted(prev => true)
      }
   catch(error){
    setIsDeleted(false)
    toast.error(error)
   }
  }

  return (<>
    <div style={{margin : '50px 0 40px 0'}}>Recent Arenas</div>
    { portion ? 
    <div className='recent-arenas-container'>
     {portion.map(item => {
        return <div key={item._id} className='arena-box' id={item._id} onClick={() => goToArena(item._id)}>
          <Output html={item.html} css={item.css} js={item.js} preview={true} />
          <div className='bottom'>
         <span>{item.arenaName}</span>
         <DeleteOutlineRoundedIcon htmlColor='black' fontSize='2rem' onClick={(e) => handleArenaDeletion(e,item._id)}/>
         </div>
        </div>
     })}
    </div> 
    : <p>No arenas developed</p>}
    <PaginationComponent skipState={skipState} totalArenas={total}/>
    <Loader loading={loading}/>
    </>  
  )
}

export default React.memo(RecentArenas)
