const express = require(`express`)
const path = require('path')


const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '9d48bb3223284fc682fa31bc0f240134',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []
const app = express()
app.use(express.json())



app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file serverd successfully.')
})

app.post('/api/student', (req,res) =>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student added successfully', {author: "Diamond", type:"manual"})

    res.status(200).send(students)
})



const port = process.env.PORT || 4545
app.listen(port, () => console.log(` It works!${port}`))
app.use(rollbar.errorHandler())