import React from 'react'
import './style.css'
import imgPreview from '../../assets/preview.png'
import ButtonComponent from '../Button'
const HomeContent = () => {
  return (
    <div className='main-container'>
        <div className='left-box'>
            <p><span>Code Smarter with </span><span>Codebox</span></p> 
             <p>A powerful, intuitive code editor that brings your development workflow to the next level. Write, test, and deploy code with ease.</p>
             <ButtonComponent name={`Get Started`} bgColor={'rgb(79 70 229)'}/>
        </div>
        <div className='right-box'>
           <img src={imgPreview} alt='code-preview'/> 
        </div>
    </div>
  )
}

export default HomeContent