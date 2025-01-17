import React, { useState } from 'react'
import ModalComponent from './Modal';

const CreateArena = () => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
  return (
    <div>
      <ModalComponent name={'Create Arena'} open={open} handleOpen={handleOpen} handleClose={handleClose}/>
    </div>
  )
}

export default React.memo(CreateArena)
