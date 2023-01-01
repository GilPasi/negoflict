const express = require('express')
const bodyParser = require('body-parser')


require('dotenv').config()


const PORT = 8050

const app = express()

app.use(bodyParser.urlencoded({urlencoded:false}))


const group_router = require('./routers/group_router')
const login = require('./routers/user_router')
const messageRouter = require('./routers/chat_router')




app.use('',login)
app.use('',group_router)
app.use('',messageRouter)




app.listen(PORT, ()=>{
    console.log(`listeninig on port:${PORT}`)
})