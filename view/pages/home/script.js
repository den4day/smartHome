// let temp = document.querySelector('.weather__tempIn');
// let hum = document.querySelector('.weather__hum');

// let tabsBtn = document.querySelectorAll('.control__item');
// let tabsTile = document.querySelectorAll('.control__tile');

// tabsBtn.forEach(item =>
//     item.addEventListener('click', () => {
//         let currentBtn = item;
//         let tabId = currentBtn.getAttribute("data-tab");
//         let currentTab = document.querySelectorAll(".group" + tabId);

//         if (!currentBtn.classList.contains('control__item--active')) {
//             tabsBtn.forEach(item => item.classList.remove('control__item--active'));
//             tabsTile.forEach(item => item.classList.remove('control__tile--active'));

//             currentBtn.classList.add('control__item--active');
//             setTimeout(() => currentTab.forEach(item => item.classList.add('control__tile--active')), 200);
//         }
//     })
// );

// document.querySelector(".control__item").click();

let socket = io("http://localhost:3000");

socket.on("sendToHomePage", data => console.log(data));


