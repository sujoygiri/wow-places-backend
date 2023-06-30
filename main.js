const express = require("express")
const PORT = 3000 || process.env.PORT
const HOST = 'localhost'

const server = express()

server.get('/',(req,res,next)=>{
    res.json({msg:'Hello World'})
})

server.listen(PORT,HOST,()=>{
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
