let PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let http = require('http');
let server = http.Server(app);
let io = require("socket.io")(server, {
    cors: {
        origin: "*",
        transports: ["websocket", "polling"],
        credentials: true,
    },
    allowEIO3: true,
});

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

app.post("/cv", (req, res) => {
    // Retrieve array form post body
    var array = req.body.array;
    console.log(array);
});

server.listen(PORT, () => console.log(`Server started on ${PORT}...`));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/cv", (req, res) => {
    let rec_name = req.body.name;
    io.emit("names", rec_name);
});


let dataHome = {
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

let dataAC = {
    powerAC: 0,
    mode: 0,
    temp: 18
};

let dataBlinds = {
    powerBlinds: 0,
    stage: 0
};

let dataVenting = {
    powerVenting: 0,
    speed: 0
};


io.on('connect', (socket) => {
    socket.on("dataHome", data => {
        let obj = JSON.parse(JSON.stringify(data));

        io.emit("tempAndHum", { temp: parseInt(obj.temp), hum: parseInt(obj.hum) });
    });

    socket.on('pageHome', data => {
        dataHome.powerLight = data.powerLight;
        dataHome.powerAC = data.powerAC;
        dataHome.powerBlinds = data.powerBlinds;
        dataHome.powerVenting = data.powerVenting;
        dataHome.powerCV = data.powerCV;
        dataHome.powerRobot = data.powerRobot;

        io.emit('homeControll', dataHome);
    });

    socket.on('pageLight', data => {
        dataLight.powerLight = data.powerLight;
        dataLight.brightness = data.brightness;

        io.emit('lightControll', dataLight);
    });

    socket.on('pageAC', data => {
        dataAC.powerAC = data.powerAC;
        dataAC.mode = data.mode;
        dataAC.temp = data.temp;

        io.emit('acControll', dataAC);
    });

    socket.on('pageBlinds', data => {
        dataBlinds.powerBlinds = data.powerBlinds;
        dataBlinds.stage = data.stage;

        io.emit('blindsControll', dataBlinds);
    });

    socket.on('pageVenting', data => {
        dataVenting.powerVenting = data.powerVenting;
        dataVenting.speed = data.speed;

        io.emit('ventingControll', dataVenting);
    });
});
