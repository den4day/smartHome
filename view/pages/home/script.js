let sock = io();

let temp = document.querySelector('.weather__tempIn');
let hum = document.querySelector('.weather__hum');

// обработчик события status
sock.on('status', data => {
    if (data) {
        // если пришли данные температуры
        if (data.hasOwnProperty('t')) {
            // выводим ее
            temp.innerHTML = data.t;
        }
        // влажность
        if (data.hasOwnProperty('h')) {
            hum.innerHTML = data.h;
        }
    }
})

// обновляем статус оп таймеру 1 раз в секунду
setInterval(() => {
    sock.emit('status');
}, 2000);
