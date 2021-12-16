const express = require(`express`)
const path = require('path')


const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '9d48bb3223284fc682fa31bc0f240134',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const app = express()



app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file serverd successfully.')
})

// include and initialize the rollbar library with your access token


const port = process.env.PORT || 4545
app.listen(port, () => console.log(` It works!${port}`))