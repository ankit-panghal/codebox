import { Box, LinearProgress } from '@mui/material'
import React from 'react'
const style = {
  width: '100vw',
  position : 'fixed',
  top : 0,
  left : 0,
  zIndex : 1000,
  height : '2vh',
  color : 'aquamarine'
}
const Loader = ({loading}) => {
  return (
    <Box sx={style}>
      <LinearProgress  color = 'inherit' variant='indeterminate' style={loading ? {display : 'flex'} : {display : 'none'}} />
    </Box>
  )
}

export default Loader
