let PORT = process.env.PORT || 3000;
let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        transports: ["websocket", "polling"],
        credentials: true,
    },
    allowEIO3: true,
});

let a = 1


app.use(express.static('view'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/pages/light/index.html');
});

server.listen(PORT, () => console.log(`Server started on ${PORT}...`));

io.on('connect', socket => {
    console.log('new user connected');

    // socket.on('message', data => console.log(data));
    // socket.emit('greet', "bebraa");

    // socket.on('esp', data => console.log(data));
    // socket.emit('change', "someParams");

    socket.emit('message', `hum: ${a}`);
    socket.on("data", data => console.log(data));
    // socket.on('message', data => {
    //     console.log(data);
    //     io.emit('message', data);
    // });
});
