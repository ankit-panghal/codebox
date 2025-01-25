import React from 'react'
import './style.css'
import ButtonComponent from '../Button'
const Header = ({arenaName,arenaId,html,css,js}) => {
  return (
    <div className='header'>
      <div>{arenaName}</div>
      <div style={{display : 'flex', gap : '20px'}}>
      <ButtonComponent name={'Save'} id={arenaId} bgColor={'yellow'} color={'black'} html={html} css={css} js={js}/>
      <ButtonComponent name={'Exit'} bgColor={'tomato'} color={'black'}/>
      </div>
    </div>
  )
}

export default Header
