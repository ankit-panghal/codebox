import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './style.css'
import toast from 'react-hot-toast';
import Output from '../Output';
import PaginationComponent from '../Pagination';
import { manageSkips } from '../../redux/skipSlice';
import {  useDeleteUserArenaMutation, useGetUserArenasQuery, useLazyGetArenaQuery } from '../../redux/apiSlice';

const RecentArenas = () => {
  const skipState = useSelector(state => state.skip);
  const{data,isLoading} = useGetUserArenasQuery(skipState)
  const [trigger,{isLoading : loading}] = useLazyGetArenaQuery()
  const [deleteArena] = useDeleteUserArenaMutation()
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('inside')
  
  useEffect(() => {
    if(data?.userPortion?.length === 0) dispatch(manageSkips(skipState-3 < 0 ? 0 : skipState-3))
  },[data?.userPortion])


  async function goToArena(id){
      try{
          const response = await trigger(id)
          navigate('/dashboard/editor',{state : {data : response.data.data}})
      }
      catch(error){
        console.log(error)
      }
  }

  async function handleArenaDeletion(e,id){
    e.stopPropagation();
    try{
        const response = await deleteArena({id}).unwrap()
        toast.success(response.message);
      }
   catch(error){
    console.log(error)
   }
  }

  return (<>
    <div style={{margin : '50px 0 20px 0',fontSize : '2em'}}>Recent Arenas</div>
    { data?.userTotal > 0 ? 
    <div className='recent-arenas-container'>
     {data?.userPortion.map(item => {
        return <div key={item._id} className='arena-box' id={item._id} onClick={() => goToArena(item._id)}>
          <Output html={item.html} css={item.css} js={item.js} preview={true} />
          <div className='bottom'>
         <span>{item.arenaName}</span>
         <DeleteOutlineRoundedIcon htmlColor='white' fontSize='2rem' onClick={(e) => handleArenaDeletion(e,item._id)}/>
         </div>
        </div>
     })}
    </div> 
    : <p>No arenas developed</p>}
       <PaginationComponent skipState={skipState} totalArenas={data?.userTotal}/>
       <Loader loading={isLoading || loading}/>
    </>  
  )
}

export default React.memo(RecentArenas)
