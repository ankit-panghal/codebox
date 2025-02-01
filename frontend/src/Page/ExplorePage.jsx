import React, { useEffect, useState } from 'react'
import Input from '../Components/Input'
import { useNavigate } from 'react-router-dom';
import Output from '../Components/Output';
import HomeHeader from '../Components/HomeHeader';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useGetAllArenasQuery } from '../redux/apiSlice';
import { Avatar } from '@mui/material';
let timeoutId;

const ExplorePage = () => {
    const [search,setSearch] = useState('');
    const {data} = useGetAllArenasQuery()
    const [filterdData,setFilteredData] = useState(null)
    
    const navigate = useNavigate();

  useEffect(() => {
    function debounce(){
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setFilteredData(data?.filter((item) => item.arenaName.toLowerCase().includes(search.trim().toLowerCase())));
      },400)
    }
    debounce()
  },[data,search])

    async function goToArena(id){
           navigate(`/arena/${id}`)
    }

  return (
    <div className='explore-page'>
      <HomeHeader/>
      <h3>Explore Arenas</h3>
        <Input type={'text'} name ={'search'} placeholder={'Search Arena'} value={search} setValue={setSearch}/>
         {
            filterdData ? <div className='explore-arenas'>
               { 
                 filterdData.map(item => {
                 return (<div key={item._id} className='card' id={item._id} onClick={() => goToArena(item._id)}>
                 <Output html={item.html} css={item.css} js={item.js} preview={true} />
                 <div className='bottom'>
                   {
                      item.userId.imageUrl ?  <img src={item.userId.imageUrl} alt='user-avatar'/>
                      :
                      <Avatar/>
                   } 
                    <div className='arena-info'>
                       <p>{item.arenaName}</p>
                       <p>{item.userId.name}</p>
                    </div>
                 </div>
                 </div>)
                })}
            </div>
            :
            <div className='skeleton-container'>
              { 
                 new Array(6).fill('').map((_,idx) => <Skeleton key={idx} height={'30vh'} baseColor='rgba(51, 51, 51, 0.8)'/>)
              }
              </div>
         }
    </div>
  )
}

export default ExplorePage