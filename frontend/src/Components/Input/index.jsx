import React from 'react'
import './style.css'
const Input = ({type,name,placeholder,value,setValue}) => {
  
  return <input className='input' type={type} name={name} placeholder={placeholder}  
           value={value}
           onChange={(e) => setValue(e.target.value)}
           />
}

export default Input
