import React, { useState } from 'react';
import {Pagination} from '@mui/material';
import './style.css'
import { useDispatch } from 'react-redux';
import { manageSkips } from '../../redux/skipSlice';

  const PaginationComponent = ({skipState,totalArenas}) => {
    const [selectedPage,setSelectedPage] = useState(skipState ? skipState/3+1 : 1);
      const dispatch = useDispatch();

      function handleChange(e){
        const page = Number(e.target.innerText) 
        setSelectedPage(page);
        dispatch(manageSkips((page-1)*3))
      }
      
    return (
      totalArenas && totalArenas.length > 3 && <Pagination page={selectedPage} count={Math.floor(totalArenas.length/3) + 1} shape="rounded" onChange={handleChange}/>
    ) 
  }

export default React.memo(PaginationComponent)
