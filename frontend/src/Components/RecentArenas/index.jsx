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
  const {total,portion} = useSelector(state => state.arenas)
  // console.log(skipState);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
// console.log(data);
const dispatch = useDispatch();

  useEffect(() => {
  async function fetchData(){
    setLoading(true);
    try{  
     const response = await axios.get(hostName+`/dashboard/recent-arenas/?skip=${skipState}&limit=3`,{withCredentials : true});
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
},[skipState])

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
        const response = await axios.post(hostName+'/dashboard/delete-arena',{id});
        toast.success(response.data.message);
        window.location.reload();
      }
   catch(error){
    toast.error(error)
   }
  }

  return (<>
  <Loader loading={loading}/>
    <div style={{margin : '50px 0 40px 0'}}>Recent Arenas</div>
    { total ? 
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
    <PaginationComponent/>
    </>  
  )
}

export default React.memo(RecentArenas)
