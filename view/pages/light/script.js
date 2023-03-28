let socket = io("http://localhost:3000");

let power = document.querySelector('.switch__input');
let lightRange = document.querySelector('.light__range');
let info = document.querySelector(".light__down-header");

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
    console.log(power.checked);

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

    socket.emit('pageLight', { powerLight: power.checked, brightness: Number(lightRange.value) });
});

lightRange.addEventListener("change", () => {
    console.log(lightRange.value);
    socket.emit('pageLight', { brightness: Number(lightRange.value), powerLight: power.checked });

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
