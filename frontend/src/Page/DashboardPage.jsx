import React, { useEffect, useState } from 'react'
import CreateArena from '../Components/CreateArena';
import hostName from '../utils/domain';
import Loader from '../Components/Loader';
import RecentArenas from '../Components/RecentArenas';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SideProfile from '../Components/SideProfile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const menuStyle = {
  position : 'fixed', 
  top : '20px',
  left : '50%',
  transform : 'translateX(-50%)',
  backgroundColor : 'white',
  borderRadius : '50%',
  padding : '5px',
  fontSize : '2rem',
  cursor : 'pointer',
  zIndex : 1000,
}
const DashboardPage = () => {
  const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
      (async function(){
        setLoading(true);
        try{
          const response = await axios.get(hostName+'/dashboard',{withCredentials : true})
            setData(response.data.data)
            setLoading(false)
        }
        catch(err){
          setLoading(false)
          console.log(err.message);
          navigate('/login')
        }
    })()
  },[])


  return (<>
  <Loader loading={loading}/>
   {data && <div className='dash-page'>
    <div style={{position : 'relative'}}>
    {!isOpen ? <MenuIcon style={menuStyle} onClick={() => setIsOpen(prev => !prev)}/>
    : <CloseIcon style={menuStyle} onClick={() => setIsOpen(prev => !prev)}/>}
    </div>
    <SideProfile data={data} isOpen={isOpen}/>
      <div className='arena-container'>
       <div>Work Arena</div>
         <CreateArena/>
         <RecentArenas/>  
      </div>
    </div>}
    </>
  )
}

export default DashboardPage
