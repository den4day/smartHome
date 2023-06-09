let socket = io("http://localhost:3000");

let tabsBtn = document.querySelectorAll('.control__item');
let tabsTile = document.querySelectorAll('.control__tile');
let btnOff = document.querySelector('.footer__btn');
let tumblers = document.querySelectorAll('.switch__input');

let activeTab = document.querySelector(".control__item--active");
let tab1 = document.querySelector('li[data-tab="1"]');
let tab2 = document.querySelector('li[data-tab="2"]');
let tab3 = document.querySelector('li[data-tab="3"]');
let tab4 = document.querySelector('li[data-tab="4"]');

let powerLight = document.querySelector('#light');
let powerAC = document.querySelector('#ac');
let powerBlinds = document.querySelector('#blinds');
let powerVenting = document.querySelector('#venting');
let powerCV = document.querySelector('#cv');
let powerRobot = document.querySelector('#robot');

let lightState = document.querySelector('#lightState');
let acState = document.querySelector('#acState');
let blindsState = document.querySelector('#blindsState');
let ventingState = document.querySelector('#ventingState');
let cvState = document.querySelector('#cvState');
let robotState = document.querySelector('#robotState');


function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

function getDate() {
    let today = new Date();

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    options.timeZone = 'UTC';
    options.timeZoneName = 'short';

    let now = today.toLocaleString('en-US', options);
    document.querySelector('.weather__text').innerHTML = now.slice(0, -7);
}

function getWeather() {
    let apiKey = "e1a0fc27a73f01d7150e529a54067051";
    let city = "Rostov-on-Don";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;

    axios.get(url).then(res => {
        document.querySelector('.weather__tempOut').innerHTML = Math.round(res.data.main.temp);
        document.querySelector('.weather__header').innerHTML = res.data.weather["0"].main;

        if (res.data.weather["0"].main == "Snow") {
            document.querySelector('.weather__img').src = "img/snow.svg";
        }
    });
}


if (getCookie("powerLight") == "true") {
    powerLight.checked = getCookie("powerLight");
} else {
    powerLight.checked = false;
    setCookie("powerLight", "false");
}

if (getCookie("powerAC") == "true") {
    powerAC.checked = getCookie("powerAC");
} else {
    powerAC.checked = false;
    setCookie("powerAC", "false");
}

if (getCookie("powerBlinds") == "true") {
    powerBlinds.checked = getCookie("powerBlinds");
} else {
    powerBlinds.checked = false;
    setCookie("powerBlinds", "false");
}

if (getCookie("powerVenting") == "true") {
    powerVenting.checked = getCookie("powerVenting");
} else {
    powerVenting.checked = false;
    setCookie("powerVenting", "false");
}

if (getCookie("powerCV") == "true") {
    powerCV.checked = getCookie("powerCV");
} else {
    powerCV.checked = false;
    setCookie("powerCV", "false");
}

if (getCookie("powerRobot") == "true") {
    powerRobot.checked = getCookie("powerRobot");
} else {
    powerRobot.checked = false;
    setCookie("powerRobot", "false");
}


if (getCookie("lightState")) {
    lightState.textContent = getCookie("lightState");
} else {
    setCookie("lightState", "20%");
}

if (getCookie("acState")) {
    acState.textContent = getCookie("acState");
} else {
    setCookie("acState", "18");
}

if (getCookie("blindsState")) {
    blindsState.textContent = getCookie("blindsState");
} else {
    setCookie("blindsState", "0%");
}

if (getCookie("ventingState")) {
    ventingState.textContent = getCookie("ventingState");
} else {
    setCookie("ventingState", "0%");
}

if (getCookie("cvState")) {
    cvState.textContent = getCookie("cvState");
} else {
    setCookie("cvState", "Unknown");
}

if (getCookie("blindsState")) {
    blindsState.textContent = getCookie("blindsState");
} else {
    setCookie("blindsState", "0%");
}

if (getCookie("robotState")) {
    robotState.textContent = getCookie("robotState");
} else {
    setCookie("robotState", "0%");
}


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


if (getCookie("activeTab") == "living") {
    tab1.click();
} else if (getCookie("activeTab") == "bedroom") {
    tab2.click();
} else if (getCookie("activeTab") == "dinning") {
    tab3.click();
} else if (getCookie("activeTab") == "courtyard") {
    tab4.click();
} else {
    tab1.click();
    setCookie("activeTab", "living");
}


tab1.addEventListener("click", () => {
    setCookie("activeTab", "living");
});

tab2.addEventListener("click", () => {
    setCookie("activeTab", "bedroom");
});

tab3.addEventListener("click", () => {
    setCookie("activeTab", "dinning");
});

tab4.addEventListener("click", () => {
    setCookie("activeTab", "courtyard");
});


powerLight.addEventListener("click", () => {
    if (powerLight.checked) {
        setCookie("powerLight", "true");
    } else {
        setCookie("powerLight", "false");
    }

    socket.emit("pageHome", {
        powerLight: Number(powerLight.checked),
        powerAC: Number(powerAC.checked),
        powerBlinds: Number(powerBlinds.checked),
        powerVenting: Number(powerVenting.checked),
        powerCV: Number(powerCV.checked),
        powerRobot: Number(powerRobot.checked)
    });
});

powerAC.addEventListener("click", () => {
    if (powerAC.checked) {
        setCookie("powerAC", "true");
    } else {
        setCookie("powerAC", "false");
    }

    socket.emit("pageHome", {
        powerLight: Number(powerLight.checked),
        powerAC: Number(powerAC.checked),
        powerBlinds: Number(powerBlinds.checked),
        powerVenting: Number(powerVenting.checked),
        powerCV: Number(powerCV.checked),
        powerRobot: Number(powerRobot.checked)
    });
});

powerBlinds.addEventListener("click", () => {
    if (powerBlinds.checked) {
        setCookie("powerBlinds", "true");
    } else {
        setCookie("powerBlinds", "false");
    }

    socket.emit("pageHome", {
        powerLight: Number(powerLight.checked),
        powerAC: Number(powerAC.checked),
        powerBlinds: Number(powerBlinds.checked),
        powerVenting: Number(powerVenting.checked),
        powerCV: Number(powerCV.checked),
        powerRobot: Number(powerRobot.checked)
    });
});

powerVenting.addEventListener("click", () => {
    if (powerVenting.checked) {
        setCookie("powerVenting", "true");
    } else {
        setCookie("powerVenting", "false");
    }

    socket.emit("pageHome", {
        powerLight: Number(powerLight.checked),
        powerAC: Number(powerAC.checked),
        powerBlinds: Number(powerBlinds.checked),
        powerVenting: Number(powerVenting.checked),
        powerCV: Number(powerCV.checked),
        powerRobot: Number(powerRobot.checked)
    });
});

powerCV.addEventListener("click", () => {
    if (powerCV.checked) {
        setCookie("powerCV", "true");
    } else {
        setCookie("powerCV", "false");
    }

    socket.emit("pageHome", {
        powerLight: Number(powerLight.checked),
        powerAC: Number(powerAC.checked),
        powerBlinds: Number(powerBlinds.checked),
        powerVenting: Number(powerVenting.checked),
        powerCV: Number(powerCV.checked),
        powerRobot: Number(powerRobot.checked)
    });
});

powerRobot.addEventListener("click", () => {
    if (powerRobot.checked) {
        setCookie("powerRobot", "true");
    } else {
        setCookie("powerRobot", "false");
    }

    socket.emit("pageHome", {
        powerLight: Number(powerLight.checked),
        powerAC: Number(powerAC.checked),
        powerBlinds: Number(powerBlinds.checked),
        powerVenting: Number(powerVenting.checked),
        powerCV: Number(powerCV.checked),
        powerRobot: Number(powerRobot.checked)
    });
});

btnOff.addEventListener("click", () => {
    tumblers.forEach(item => {
        console.log(item.checked);
        item.checked = false;
    });

    setCookie("powerLight", "false");
    setCookie("powerAC", "false");
    setCookie("powerBlinds", "false");
    setCookie("powerVenting", "false");
    setCookie("powerCV", "false");
    setCookie("powerRobot", "false");

    socket.emit("pageHome", {
        powerLight: Number(powerLight.checked),
        powerAC: Number(powerAC.checked),
        powerBlinds: Number(powerBlinds.checked),
        powerVenting: Number(powerVenting.checked),
        powerCV: Number(powerCV.checked),
        powerRobot: Number(powerRobot.checked)
    });
});


socket.on("tempAndHum", dataHome => {
    document.querySelector('.weather__tempIn').textContent = dataHome.temp;
    document.querySelector('.weather__hum').textContent = dataHome.hum;
});


getWeather();
getDate();
