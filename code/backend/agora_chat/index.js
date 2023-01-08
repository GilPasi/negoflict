const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


require('dotenv').config()


const PORT = 8050

const app = express()

app.use(bodyParser.urlencoded({urlencoded:false}))


const room_router = require('./routers/room_router')
const login = require('./routers/user_router')
const messageRouter = require('./routers/chat_router')

app.use(cors({
    origin:'*',
    allowedHeaders:'Origin, X-Requested-With, Content-Type, Accept'
}))



app.use('',login)
app.use('',room_router)
app.use('',messageRouter)




app.listen(PORT, ()=>{
    console.log(`listeninig on port:${PORT}`)
})