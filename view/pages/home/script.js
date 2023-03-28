let tabsBtn = document.querySelectorAll('.control__item');
let tabsTile = document.querySelectorAll('.control__tile');

tabsBtn.forEach(item =>
    item.addEventListener('click', () => {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelectorAll(".group" + tabId);

        if (!currentBtn.classList.contains('control__item--active')) {
            tabsBtn.forEach(item => item.classList.remove('control__item--active'));
            tabsTile.forEach(item => item.classList.remove('control__tile--active'));

            currentBtn.classList.add('control__item--active');
            setTimeout(() => currentTab.forEach(item => item.classList.add('control__tile--active')), 200);
        }
    })
);

document.querySelector(".control__item").click();

let socket = io("http://localhost:3000");

let temp = document.querySelector('.weather__tempIn');
let hum = document.querySelector('.weather__hum');

socket.on("tempAndHum", dataHome => {
    // let obj = JSON.parse(JSON.stringify(data))
    console.log(dataHome);
    temp.textContent = dataHome.temp;
    hum.textContent = dataHome.hum;
});


// API ключ
let apiKey = "e1a0fc27a73f01d7150e529a54067051";
// Город погода которого нужна
let city = "Rostov-on-Don";
// Формируем url для GET запроса
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;

// Отправляем запрос
axios.get(url).then(res => {
    // Выводим результат в консоль браузера
    console.log(res.data);
});

axios.get(url).then(res => {
    console.log(res.data.main.temp);
    console.log(res.data.weather["0"].main);
    document.querySelector('.weather__tempOut').innerHTML = Math.round(res.data.main.temp);
    document.querySelector('.weather__header').innerHTML = res.data.weather["0"].main;
});


let today = new Date();

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
options.timeZone = 'UTC';
options.timeZoneName = 'short';

let now = today.toLocaleString('en-US', options);
document.querySelector('.weather__text').innerHTML = now.slice(0, -7);
console.log(now);
