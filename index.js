let PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
let http = require('http');
let server = http.Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        transports: ["websocket", "polling"],
        credentials: true,
    },
    allowEIO3: true,
});


app.use(express.static('view'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/pages/home/index.html');
});

app.get('/ac', (req, res) => {
    res.sendFile(__dirname + '/view/pages/ac/index.html');
});

app.get('/cv', (req, res) => {
    res.sendFile(__dirname + '/view/pages/cv/index.html');
});

app.get('/light', (req, res) => {
    res.sendFile(__dirname + '/view/pages/light/index.html');
});

app.get('/blinds', (req, res) => {
    res.sendFile(__dirname + '/view/pages/blinds/index.html');
});

app.get('/venting', (req, res) => {
    res.sendFile(__dirname + '/view/pages/venting/index.html');
});

app.get('/robot', (req, res) => {
    res.sendFile(__dirname + '/view/pages/robot/index.html');
});

server.listen(PORT, () => console.log(`Server started on ${PORT}...`));



io.on('connect', (socket) => {
    console.log('new user connected');
    socket.on("data", (data) => {
            console.log(data);
            var obj = JSON.parse(JSON.stringify(data));
            var temp = parseInt(obj.temp);
            var hum = parseInt(obj.hum);
            console.log('Temp: ' + `${temp} ` + 'Hum: ' + `${hum}`);
            
        });
});
