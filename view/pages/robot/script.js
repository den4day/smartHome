const power = document.querySelector('.switch__input');


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


if (getCookie("powerRobot") == "true") {
    power.checked = getCookie("powerRobot");
} else {
    power.checked = false;
    setCookie("powerRobot", "false");
}


power.addEventListener("change", () => {
    if (power.checked) {
        setCookie("powerRobot", "true");
    } else {
        setCookie("powerRobot", "false");
    }

    socket.emit('pageRobot', { powerRobot: power.checked });
});
