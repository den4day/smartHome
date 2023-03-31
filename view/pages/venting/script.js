let socket = io("http://localhost:3000");

let power = document.querySelector('.switch__input');
let input = document.querySelector('.vent__select');
let info = document.querySelector(".vent__down-header");
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


if (getCookie("powerVenting") == "true") {
    power.checked = getCookie("powerVenting");
} else {
    power.checked = false;
    setCookie("powerVenting", "false");
}


if (getCookie("ventingState")) {
    document.querySelector(".vent__down-header").textContent = getCookie("ventingState");

    switch (getCookie("ventingState")) {
        case "0%": input.value = "0"; break;
        case "25%": input.value = "25"; break;
        case "50%": input.value = "50"; break;
        case "75%": input.value = "75"; break;
        case "100%": input.value = "100";
    }
}


if (power.checked) {
    switch (input.value) {
        case "0": info.textContent = "0%"; break;
        case "25": info.textContent = "25%"; break;
        case "50": info.textContent = "50%"; break;
        case "75": info.textContent = "75%"; break;
        case "100": info.textContent = "100%";
    }
}


if (input.selectedIndex == 0) {
    minus.style.backgroundColor = "#CCCCCC";
    minus.style.transform = "scale(1)";
}

if (input.selectedIndex == 4) {
    plus.style.backgroundColor = "#CCCCCC";
    plus.style.transform = "scale(1)";
}


power.addEventListener("change", () => {
    console.log(power.checked);

    if (power.checked) {
        switch (input.value) {
            case "0": info.textContent = "0%"; break;
            case "25": info.textContent = "25%"; break;
            case "50": info.textContent = "50%"; break;
            case "75": info.textContent = "75%"; break;
            case "100": info.textContent = "100%";
        }

        setCookie("powerVenting", "true");
    } else {
        setCookie("powerVenting", "false");
    }

    if (input.selectedIndex == 0) {
        plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        plus.style.transform = "scale(1)";

        minus.style.backgroundColor = "#CCCCCC";
        minus.style.transform = "scale(1)";
    }

    if (input.selectedIndex == 4) {
        minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        minus.style.transform = "scale(1)";

        plus.style.backgroundColor = "#CCCCCC";
        plus.style.transform = "scale(1)";
    }

    socket.emit('pageVenting', { powerVenting: Number(power.checked), speed: Number(input.value) });
});

input.addEventListener("change", () => {
    switch (input.value) {
        case "0": info.textContent = "0%"; break;
        case "25": info.textContent = "25%"; break;
        case "50": info.textContent = "50%"; break;
        case "75": info.textContent = "75%"; break;
        case "100": info.textContent = "100%";
    }

    if (input.selectedIndex == 0) {
        plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        plus.style.transform = "scale(1)";

        minus.style.backgroundColor = "#CCCCCC";
        minus.style.transform = "scale(1)";
    } else if (input.selectedIndex == 4) {
        minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        minus.style.transform = "scale(1)";

        plus.style.backgroundColor = "#CCCCCC";
        plus.style.transform = "scale(1)";
    } else {
        minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
    }

    socket.emit('pageVenting', { powerVenting: Number(power.checked), speed: Number(input.value) });

    setCookie("ventingState", info.textContent);
});

minus.addEventListener("click", () => {
    if (input.selectedIndex > 0) {
        input.selectedIndex -= 1;

        switch (input.value) {
            case "0": info.textContent = "0%"; break;
            case "25": info.textContent = "25%"; break;
            case "50": info.textContent = "50%"; break;
            case "75": info.textContent = "75%"; break;
            case "100": info.textContent = "100%";
        }
    }

    minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
    plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";

    if (input.selectedIndex == 0) {
        minus.style.backgroundColor = "#CCCCCC";
        minus.style.transform = "scale(1)";
    } else {
        minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
    }

    socket.emit('pageVenting', { powerVenting: Number(power.checked), speed: Number(input.value) });

    setCookie("ventingState", info.textContent);
});

plus.addEventListener("click", () => {
    if (input.selectedIndex < 4) {
        input.selectedIndex += 1;

        switch (input.value) {
            case "0": info.textContent = "0%"; break;
            case "25": info.textContent = "25%"; break;
            case "50": info.textContent = "50%"; break;
            case "75": info.textContent = "75%"; break;
            case "100": info.textContent = "100%";
        }
    }

    minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
    plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";

    if (input.selectedIndex == 4) {
        plus.style.backgroundColor = "#CCCCCC";
        plus.style.transform = "scale(1)";
    } else {
        minus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
        plus.style.backgroundColor = "rgba(102, 161, 255, 0.5)";
    }

    socket.emit('pageVenting', { powerVenting: Number(power.checked), speed: Number(input.value) });

    setCookie("ventingState", info.textContent);
});


plus.addEventListener("mousedown", () => plus.style.transform = "scale(1)");
plus.addEventListener("mouseup", () => {
    if (input.selectedIndex == 4) {
        plus.style.transform = "scale(1)";
    } else {
        plus.style.transform = "scale(1.05)";
    }
});

minus.addEventListener("mousedown", () => minus.style.transform = "scale(1)");
minus.addEventListener("mouseup", () => {
    if (input.selectedIndex == 0) {
        minus.style.transform = "scale(1)";
    } else {
        minus.style.transform = "scale(1.05)";
    }
});
