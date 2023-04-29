import express from "express";
import morgan from "morgan";
import {Server as SocketServer} from "socket.io";
import cors from "cors"
import { PORT } from "./config.js";

const app = express()
app.use(cors())

app.use(morgan('dev'))

const server = app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`)
}) //El listen nos genera un objeto de servidor

const io = new SocketServer(server,{
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket) => {
    socket.on('client:message', (message)=> {
        socket.broadcast.emit('server:message', {
            body: message,
            from: socket.id
        })
    })
})
