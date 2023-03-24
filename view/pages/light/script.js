const socket = io("http://localhost");

io.on('connect', socket => {
    console.log('new user connected');
    socket.on("data", data => console.log(data));
    socket.emit('message', 'connect from server');
});
