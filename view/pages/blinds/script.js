let socket = io("http://localhost:3000");

let power = document.querySelector('.switch__input');
let input = document.querySelector('.blinds__input');
let minus = document.querySelector('#minus');
let plus = document.querySelector('#plus');


power.addEventListener("change", () => {
    console.log(power.checked);
    socket.emit('pageBlinds', { powerBlinds: power.checked, stage: Number(input.value) });
});

input.addEventListener("change", () => {
    console.log(Number(input.value));
    socket.emit('pageBlinds', { powerBlinds: power.checked, stage: Number(input.value) });
});

minus.addEventListener("click", () => {
    console.log("minus click");
    if (input.value > 0) {
        input.value -= 20;
        console.log(Number(input.value));
        socket.emit('pageBlinds', { powerBlinds: power.checked, stage: Number(input.value) });
    } else {
        console.log('меньше нуля нельзя!');
    }
});

plus.addEventListener("click", () => {
    console.log("plus click");
    if (input.value < 180) {
        input.value = Number(input.value) + 20;
        socket.emit('pageBlinds', { powerBlinds: power.checked, stage: Number(input.value) });
        console.log(input.value);
    } else {
        console.log('больше 180 нельзя!');
    }
});
