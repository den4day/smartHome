let socket = io("http://localhost:3000");

let power = document.querySelector('.switch__input');
let lightRange = document.querySelector('.light__range');
let info = document.querySelector(".light__down-header");


function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
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


if (getCookie("powerLight") == "true") {
    power.checked = getCookie("powerLight");
    console.log(getCookie("powerLight"));
} else {
    power.checked = false;
    setCookie("powerLight", "false");
    console.log(getCookie("powerLight"));
}


if (power.checked) {
    switch (lightRange.value) {
        case "51": info.textContent = "20%"; break;
        case "102": info.textContent = "40%"; break;
        case "153": info.textContent = "60%"; break;
        case "204": info.textContent = "80%"; break;
        case "255": info.textContent = "100%";
    }
} else {
    info.textContent = "0%";
}

power.addEventListener("change", () => {
    if (power.checked) {
        switch (lightRange.value) {
            case "51": info.textContent = "20%"; break;
            case "102": info.textContent = "40%"; break;
            case "153": info.textContent = "60%"; break;
            case "204": info.textContent = "80%"; break;
            case "255": info.textContent = "100%";
        }

        setCookie("powerLight", "true");
    } else {
        info.textContent = "0%";

        setCookie("powerLight", "false");
    }

    socket.emit('pageLight', { powerLight: Number(power.checked), brightness: Number(lightRange.value) });
});

lightRange.addEventListener("change", () => {
    console.log(lightRange.value);
    socket.emit('pageLight', { brightness: Number(lightRange.value), powerLight: Number(power.checked) });

    if (power.checked) {
        switch (lightRange.value) {
            case "51": info.textContent = "20%"; break;
            case "102": info.textContent = "40%"; break;
            case "153": info.textContent = "60%"; break;
            case "204": info.textContent = "80%"; break;
            case "255": info.textContent = "100%";
        }
    }
});
