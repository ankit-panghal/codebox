import React, { useState } from 'react';
import {Pagination} from '@mui/material';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { manageSkips } from '../../redux/skipSlice';

  const PaginationComponent = () => {
    const {total} = useSelector(state => state.arenas);
    const skipState = useSelector(state => state.skip)
    const [selectedPage,setSelectedPage] = useState(!skipState ? 1 : skipState/3+1);
      const dispatch = useDispatch();
    // console.log(skipState/3+1);
      function handleChange(event,page){
      setSelectedPage(page);
      dispatch(manageSkips((page-1)*3))
      }
      console.log(total);
      
    return (
      total && <Pagination page={selectedPage} count={total ? parseInt(total.length/3) + 1 : 0} shape="rounded"  style={(total.length <= 3) ? {display : 'none'} : {display : 'flex'}}
      onChange={handleChange}/>
    ) 
  }

export default PaginationComponent
