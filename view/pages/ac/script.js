let socket = io("http://localhost:3000");

let power = document.querySelector('.switch__input');
let select = document.querySelector('.air__select');
let temp = document.querySelector('.ac__temp');
let minus = document.querySelector('#minus');
let plus = document.querySelector('#plus');


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


if (getCookie("powerAC") == "true") {
    power.checked = getCookie("powerAC");
} else {
    power.checked = false;
    setCookie("powerAC", "false");
}


if (getCookie("acState")) {
    document.querySelector(".ac__temp").textContent = getCookie("acState");

}


if (Number(temp.textContent) == 18) {
    minus.style.backgroundColor = "#CCCCCC";
    minus.style.transform = "scale(1)";
}

if (Number(temp.textContent) == 28) {
    plus.style.backgroundColor = "#CCCCCC";
    plus.style.transform = "scale(1)";
}


power.addEventListener("change", () => {
    if (power.checked) {
        setCookie("powerAC", "true");
    } else {
        setCookie("powerAC", "false");
    }

    socket.emit('pageAC', { powerAC: power.checked, mode: Number(select.value), temp: Number(temp.textContent) });
});

select.addEventListener("change", () => {
    socket.emit('pageAC', { powerAC: Number(power.checked), mode: Number(select.value), temp: Number(temp.textContent) });
});

minus.addEventListener("click", () => {
    if (Number(temp.textContent) > 18) {
        temp.textContent = Number(temp.textContent) - 1;

        socket.emit('pageAC', { powerAC: Number(power.checked), mode: Number(select.value), temp: Number(temp.textContent) });

        minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";

        if (Number(temp.textContent) == 18) {
            minus.style.backgroundColor = "#CCCCCC";
            minus.style.transform = "scale(1)";
        } else {
            minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
            plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        }
    }

    setCookie("acState", temp.textContent);
});

plus.addEventListener("click", () => {
    if (Number(temp.textContent) < 28) {
        temp.textContent = Number(temp.textContent) + 1;

        socket.emit('pageAC', { powerAC: Number(power.checked), mode: Number(select.value), temp: Number(temp.textContent) });

        minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";

        if (Number(temp.textContent) == 28) {
            plus.style.backgroundColor = "#CCCCCC";
            plus.style.transform = "scale(1)";
        } else {
            minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
            plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        }
    }

    setCookie("acState", temp.textContent);
});


plus.addEventListener("mousedown", () => plus.style.transform = "scale(1)");
plus.addEventListener("mouseup", () => {
    if (Number(temp.textContent) == 28) {
        plus.style.transform = "scale(1)";
    } else {
        plus.style.transform = "scale(1.05)";
    }
});

minus.addEventListener("mousedown", () => minus.style.transform = "scale(1)");
minus.addEventListener("mouseup", () => {
    if (Number(temp.textContent) == 18) {
        minus.style.transform = "scale(1)";
    } else {
        minus.style.transform = "scale(1.05)";
    }
});
