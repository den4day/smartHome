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

app.get('/signin', (req, res) => {
    res.sendFile(__dirname + '/view/pages/signin/index.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/view/pages/signup/index.html');
});

server.listen(PORT, () => console.log(`Server started on ${PORT}...`));


let dataHome = {
    temp: 0,
    hum: 0,
    powerLight: 0,
    powerAC: 0,
    powerBlinds: 0,
    powerVenting: 0,
    powerCV: 0,
    powerRobot: 0
};

let dataLight = {
    powerLight: 0,
    brightness: 0
};

let dataBlinds = {
    powerBlinds: 0,
    stage: 0,
};

io.on('connect', (socket) => {
    console.log('new user connected');

    socket.on("dataHome", data => {
        let obj = JSON.parse(JSON.stringify(data));

        dataHome.temp = parseInt(obj.temp);
        dataHome.hum = parseInt(obj.hum);

        console.log(dataHome);

        io.emit("tempAndHum", { temp: dataHome.temp, hum: dataHome.hum });
    });


    // socket.on('pageAC', data => {
    //     socket.emit('response', response);

    //     console.log(response);
    // });

    socket.on('pageLight', data => {
        dataLight.powerLight = data.powerLight;
        dataLight.brightness = data.brightness;

        console.log(dataLight);

        io.emit('lightControll', dataLight);
    });

    socket.on('pageBlinds', data => {
        dataBlinds.powerBlinds = data.powerBlinds;
        dataBlinds.stage = data.stage;

        console.log(dataBlinds);

        io.emit('blindsControll', dataBlinds);
    });
});
