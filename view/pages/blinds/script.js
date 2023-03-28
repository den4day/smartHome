let socket = io("http://localhost:3000");

let power = document.querySelector('.switch__input');
let input = document.querySelector('.blinds__select');
let info = document.querySelector(".blinds__down-header");
let minus = document.querySelector('#minus');
let plus = document.querySelector('#plus');


if (power.checked) {
    switch (input.value) {
        case "0": info.textContent = "0%"; break;
        case "45": info.textContent = "25%"; break;
        case "90": info.textContent = "50%"; break;
        case "135": info.textContent = "75%"; break;
        case "180": info.textContent = "100%";
    }
} else {
    info.textContent = "0%";
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
            case "45": info.textContent = "25%"; break;
            case "90": info.textContent = "50%"; break;
            case "135": info.textContent = "75%"; break;
            case "180": info.textContent = "100%";
        }
    } else {
        info.textContent = "0%";
        input.selectedIndex = 0;
        minus.style.backgroundColor = "#CCCCCC";
        minus.style.transform = "scale(1)";
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

    socket.emit('pageBlinds', { powerBlinds: power.checked, stage: Number(input.value) });
});

input.addEventListener("change", () => {
    console.log(Number(input.value));

    switch (input.value) {
        case "0": info.textContent = "0%"; break;
        case "45": info.textContent = "25%"; break;
        case "90": info.textContent = "50%"; break;
        case "135": info.textContent = "75%"; break;
        case "180": info.textContent = "100%";
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

    socket.emit('pageBlinds', { powerBlinds: power.checked, stage: Number(input.value) });
});

minus.addEventListener("click", () => {
    console.log("minus click");

    if (input.selectedIndex > 0) {
        input.selectedIndex -= 1;

        switch (input.value) {
            case "0": info.textContent = "0%"; break;
            case "45": info.textContent = "25%"; break;
            case "90": info.textContent = "50%"; break;
            case "135": info.textContent = "75%"; break;
            case "180": info.textContent = "100%";
        }
    } else {
        console.log("меньше нельзя!");
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

    socket.emit('pageBlinds', { powerBlinds: power.checked, stage: Number(input.value) });
});

plus.addEventListener("click", () => {
    console.log("plus click");

    if (input.selectedIndex < 4) {
        input.selectedIndex += 1;

        switch (input.value) {
            case "0": info.textContent = "0%"; break;
            case "45": info.textContent = "25%"; break;
            case "90": info.textContent = "50%"; break;
            case "135": info.textContent = "75%"; break;
            case "180": info.textContent = "100%";
        }
    } else {
        console.log("больше нельзя!");
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

    socket.emit('pageBlinds', { powerBlinds: power.checked, stage: Number(input.value) });
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
