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
import HomeHeader from '../Components/HomeHeader';

const menuStyle = {
  position : 'fixed', 
  top : '10vh',
  right : '20px',
  backgroundColor : 'white',
  borderRadius : '50%',
  padding : '5px',
  fontSize : '2rem',
  cursor : 'pointer',
  zIndex : 1000,
}

const forkedHtml = sessionStorage.getItem('forked_html')
const forkedCss = sessionStorage.getItem('forked_css')
const forkedJs = sessionStorage.getItem('forked_js')
const forkedArenaName = sessionStorage.getItem('forked_arenaName')

const DashboardPage = () => {
  const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();
    
   

    useEffect(() => {
      (async function(){
        setLoading(true);
        
        try{
          if(forkedHtml || forkedCss || forkedJs){
             await axios.post(hostName+'/dashboard/save-forked-files',{forkedFiles : {forkedHtml,forkedCss,forkedJs,forkedArenaName}},{
              headers : { Authorization : `Bearer ${localStorage.getItem('token')}`}
            })
            sessionStorage.clear()
           } 
          const response = await axios.get(hostName+'/dashboard',{
            headers : { Authorization : `Bearer ${localStorage.getItem('token')}`}
          })
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
        <HomeHeader/>
        <div style={{padding : '0 40px'}}>
          <CreateArena/>
          <RecentArenas/>  
        </div>
      </div>
    </div>}
    </>
  )
}

export default DashboardPage
