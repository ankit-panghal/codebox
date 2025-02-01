import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import Editor from '../Components/Editor';
import Output from '../Components/Output';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import hostName from '../utils/domain';

const SharePage = () => {
    const location = useLocation();
     const [html,setHtml] = useState('');
     const [css,setCss] = useState('')
     const [js,setJs] = useState('')
     const [arenaName,setArenaName] = useState('');
     
     const isShared = true;
   
    useEffect(() => {
      (async function(){
         const response = await axios.get(`${hostName}/share/${location.pathname.split('/')[2]}`);
            setHtml(response.data.html);
            setCss(response.data.css);
            setJs(response.data.js);
            setArenaName(response.data.arenaName);
      })()
    },[])

  return (
    <div>
        <Header arenaName= {arenaName} isShared={isShared} html={html} css={css} js={js}/>
    <div className="main">
    <div className='container'>
      <Editor symbol = {'/'} bgColor={'#FF3C41'} name ={'HTML'} mode={'html'} value={html} setValue={setHtml}/>
      <Editor symbol = {'*'} bgColor={'#0EBEFF'} name ={'CSS'} mode={'css'} value={css} setValue={setCss}/>
      <Editor symbol = {'()'} bgColor={'#FCD000'} name ={'JAVASCRIPT'} mode={'js'} value={js} setValue={setJs}/>
    </div>
    <Output html={html} css={css} js={js}/>
    </div>
    </div>
  )
}

export default SharePage