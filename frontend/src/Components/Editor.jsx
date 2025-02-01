import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import  {javascript}  from '@codemirror/lang-javascript';
import {css} from '@codemirror/lang-css'
import {html} from '@codemirror/lang-html'
import {andromeda} from '@uiw/codemirror-theme-andromeda'
import {OpenInFull,CloseFullscreen,ContentCopy} from '@mui/icons-material';
import toast from 'react-hot-toast';


const Editor = ({bgColor,symbol,name,value,setValue}) => {
    const [openEditor,setOpenEditor] = useState(false)
     

     function handleCopy(){
       navigator.clipboard.writeText(value);
      toast.success('Copied successfully')
    
    }
   function handleOpenClose(){
    setOpenEditor(prev => !prev)
   }

  return (
    <div className='box'>
        <div className='editor-header'>
        <div className='editor-header-left'>
          <div style={{
            padding : '4px 10px',
            borderRadius : '5px',
            backgroundColor : bgColor,
            color : 'black',
            fontWeight : 'bold'
        }}>
          {symbol}
          </div>
          <div>
            {name}
          </div>
          </div>
          <div className='editor-header-right'>
              <ContentCopy sx={{marginRight : '20px', fontSize : 'medium'}} onClick={handleCopy}/>
           {
             !openEditor ? <OpenInFull sx={{fontSize : '15px'}}  onClick={handleOpenClose}/>
             :
             <CloseFullscreen sx={{fontSize : '15px'}}  onClick={handleOpenClose}/> 
            }

          </div>
        </div>
        <CodeMirror 
          value={value}
          theme={andromeda}
          extensions={
          (name === 'JAVASCRIPT' &&  javascript()) ||
          (name === 'HTML' && [html()]) ||
          (name === 'CSS' && [css()])
          }
          height= {openEditor ? '75vh' : '22vh'}
          onChange={(val,viewUpdate) => setValue(val)}>
        </CodeMirror>
   </div>
  )
}

export default Editor
