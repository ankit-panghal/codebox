import React from 'react'
import './style.css'
import ButtonComponent from '../Button'
const Header = ({arenaName,arenaId,html,css,js,isShared}) => {
  
  return (
    <div className='header'>
      <div>{arenaName}</div>
      <div style={{display : 'flex', gap : '20px'}}>
       {isShared && <ButtonComponent name={'Fork'} bgColor={'#80ED99'} color={'black'} html={html} css={css} js={js} arenaName={arenaName}/>}
      {!isShared && <ButtonComponent name={'Save'} id={arenaId} bgColor={'yellow'} color={'black'} html={html} css={css} js={js}/>}
     {!isShared && <ButtonComponent name={'Share'} id={arenaId} bgColor={'#0EBEFF'} color={'black'}/>}
      {!isShared && <ButtonComponent name={'Exit'} bgColor={'tomato'} color={'black'}/>}
      </div>
    </div>
  )
}

export default Header
