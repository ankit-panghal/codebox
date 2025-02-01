import React from 'react'
import './style.css'
import ButtonComponent from '../Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const HomeHeader = () => {
  const auth = useSelector(state => state.auth)
  
  const navigate = useNavigate()
  return (
    <header>
          <nav>
            <div className='app-logo' onClick={() => navigate('/')}>Codebox</div>
            <div className='nav-menu'>
              <ButtonComponent name={'Explore'} bgColor={'transparent'}/>
              {auth && <ButtonComponent name={'Dashboard'} bgColor={'transparent'}/>}
            </div>
          </nav>
        </header>
  )
}

export default HomeHeader