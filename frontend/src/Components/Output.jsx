  import React from 'react'

  const Output = ({html,css,js,preview}) => {
    const srcCode = `
      <html>
      <head>
      <style>
      body{
        height : 'auto'
      }
      </style>
      <style>${css}</style>
      </head>
      <body>
      ${html}
      <script>${js}</script>
      </body>
      </html>
      `

    return <iframe title='output' srcDoc={srcCode} style={preview ? {width : '100%',borderRadius : 'inherit',backgroundColor: 'white'} : {display : 'flex'}}/>
  }

  export default Output
