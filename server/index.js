require('dotenv').config(); // Load environment variables

const io = require('socket.io')(process.env.PORT || 5050, {
    cors: {
        origin: process.env.CORS_ORIGIN || "https://baddocs.netlify.app/",
        methods: ['GET', 'POST']
    },
});

io.on("connection", (socket) => {
    socket.on('send-changes', (delta) => {
        console.log(delta);
        socket.broadcast.emit('receive-changes', delta);
    });

    console.log("connected!");
});
