const express = require('express')

require('dotenv').config()


const PORT = 8050

const app = express()


const accessRouter = require('./routers/access_token_router')
const login = require('./routers/chat_router')

app.use('',login)
app.use('',accessRouter)





app.listen(PORT, ()=>{
    console.log(`listeninig on port:${PORT}`)
})