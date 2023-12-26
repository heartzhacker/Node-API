const express = require('express')
const app = express()

const port = 4000

app.get('/',(req,res)=>{
    res.send('Node API')
})
app.listen(port,()=>{
    console.log('server listening on port '+ port)
})
