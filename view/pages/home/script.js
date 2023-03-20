let sock = io();

const indorTemp = document.querySelector('.weather__indorTemp');
const hum = document.getElementById('.weather__hum');
const outdorTemp = document.getElementById('.weather__outdorTemp');
const btnToggle = document.getElementById('btn-toggle');

let loadEnabled = 0;

// обработчик события status
sock.on('status', data => {
    if (data) {
        // если пришли данные температуры
        if (data.hasOwnProperty('t')) {
            // выводим ее
            console.log(indorTemp)
            indorTemp.innerHTML = data.t;
        }
        // влажность
        if (data.hasOwnProperty('h')) {
            console.log(hum)
            hum.innerHTML = data.h;
        }
        // статус нашего переключателя
        if (data.hasOwnProperty('l')) {
            loadEnabled = parseInt(data.l)
            fieldL.innerHTML = loadEnabled ? 'ВКЛ.' : 'ВЫКЛ.';

            // кнопка для изменения состояния
            btnToggle.innerHTML = loadEnabled ? 'ВЫКЛ.' : 'ВКЛ.';
            btnToggle.removeAttribute('disabled');
        }
    }
})

// при клике на кнопку
btnToggle.addEventListener('click', () => {
    // отсылаем новое состояние
    sock.emit('toggle', !loadEnabled);
});

// обновляем статус оп таймеру 1 раз в секунду
setTimeout(() => {
    sock.emit('status');
}, 1000);
