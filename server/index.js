

const io = require('socket.io')(5050, {
    cors: {
        origin:"http://localhost:5173",
        methods:['GET','POST']
    },
})

io.on("connection",(socket)=>{
    socket.on('send-changes',delta=>{
        console.log(delta)
        socket.broadcast.emit('receive-changes',delta)
    })
    console.log("connected!")
})