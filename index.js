const net = require('net');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// фейковое хранилище всех подключенных ESP
// в реальной жизни вам понадобится различать их
// вы можете при подключении передавать информацию, например уникальный номер
let esps = [];

// буфер входящих данных
let packet = '';

// создаем TCP сервер для приема соединений от наших ESP
let server = net.createServer(sock => {
    console.log('ESP connected');
    // кладем в наше хранилище новый коннект
    esps.push(sock);

    // подписываем на событие прихода данных по сокету
    sock.on('data', data => {
        // складываем в буфер
        // в реальной жизни нужно учитывать если платок больше 1ой
        // на каждую нужен отдельный буфер
        packet += data;
        // ищем символы переноса строки
        const idx = packet.indexOf('\r\n');
        // если найдены то мы получили полный пакет
        if (idx != -1) {
            // берем из буфера часть, которая содержит 1 целый пакет
            // и вызываем обработчик для этого пакета
            handler(packet.substr(0, idx));
            // удаляем обработанный пакет из буфера
            packet = packet.substr(idx + 2);
        }
    })

    // в реальной жизни, в случае ошибки на сокете,
    // обрабатываем ее, например отключаем сокет и удаляем из хранилища
    sock.on('error', err => {
        console.log(err);
    });

    // если сокет отключился удаляем его из нашего хранилища
    sock.on('end', () => {
        console.log('ESP disconnected');
        const pos = esps.indexOf(sock);
        if (pos != -1) {
            esps.splice(pos, 1);
        }
    });
});

// указываем какой порт и ip адрес нужно начать слушать нашему TCP серверу
// server.listen(3030, '192.168.115.108');

// вспомогательная функция для отправки пакета
function send_packet(data) {
    // если есть подключенные esp
    if (esps.length) {
        //перебираем их и шлем по очереди наш пакет
        for (const esp of esps) {
            try {
                esp.write(data + '\n');
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        console.log('Error: ESP not found');
    }
}

// вспомогательная функция для обработки пакетов
function handler(packet) {
    console.log('Packet:', packet);
    // формат пакета описан в статье
    // разбиваем на части
    const parts = packet.split('&');
    // смотрим что за пакет
    switch (parts[0]) {
        case 'status':
            // удалим часть которая нам больше не нужна
            parts.splice(0, 1);
            // вспомогательный объект для отправки в web сокет
            const res = {};
            // перебираем все части и складываем в один объект
            // мы могли формировать сразу в esp8266 готовый json
            // или могли бы парсить данные на клиенте
            for (const el of parts) {
                // разбиваем на ключ - значение
                const tmp = el.split(':');
                // пишем в объект
                res[tmp[0]] = tmp[1];
            }
            // и отсылаем в web сокет
            io.emit('status', res);
            break;
        default:
            console.log('Error: unknown handler')
    }
}

// эту часть я поручаю nginx
// но для краткости и удобства для статьи я решил обойтись средствами node.js
app.use(express.static('view/pages'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/pages/home/index.html');
});

app.get('/ac', (req, res) => {
    res.sendFile(__dirname + '/view/pages/ac/index.html');
});

app.get('/cv', (req, res) => {
    res.sendFile(__dirname + '/cv/index.html');
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


// событие при подключении нового web socket
io.on('connection', sock => {
    // если пришла команда status
    sock.on('status', () => {
        // просто отправляем ее на наш wifi модуль
        send_packet('status');
    }).on('toggle', data => {
        // для команды toggle меняем название команды
        // и добавляем параметр в том формате в котором его ожидает наш esp-01 модуль
        send_packet('load&' + (data ? 'on' : 'off'));
    });
});

// запускаем наш web сервер
http.listen(3000, () => {
    console.log('listening on *:3000');
});
