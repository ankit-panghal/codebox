import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import Editor from '../Components/Editor';
import Output from '../Components/Output';
import { useLocation, useNavigate } from 'react-router-dom';

const EditorPage = () => {
  const location = useLocation();
  const [html,setHtml] = useState(location.state ? location.state.data.html : '');
  const [css,setCss] = useState(location.state ? location.state.data.css : '');
  const [js,setJs] = useState(location.state ? location.state.data.js : '');
  const [data,setData] = useState(null);
  const navigate = useNavigate();
     
   useEffect(() => {
    console.log(location?.state?.data); 
    if(!location.state) navigate('/dashboard');
    else setData(location.state.data);
  },[])
  
  return (
    <>
     {data && <div>
      <Header arenaName= {data.arenaName} arenaId={data._id} html={html} css={css} js={js}/>
    <div className="main">
    <div className='container'>
      <Editor symbol = {'/'} bgColor={'#FF3C41'} name ={'HTML'} mode={'html'} value={html} setValue={setHtml}/>
      <Editor symbol = {'*'} bgColor={'#0EBEFF'} name ={'CSS'} mode={'css'} value={css} setValue={setCss}/>
      <Editor symbol = {'()'} bgColor={'#FCD000'} name ={'JAVASCRIPT'} mode={'js'} value={js} setValue={setJs}/>
    </div>
    <Output html={html} css={css} js={js}/>
    </div>
    </div>}
    </>
  )
}

export default EditorPage
