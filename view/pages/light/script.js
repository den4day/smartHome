let socket = io("http://localhost:3000");

let power = document.querySelector('.switch__input');
let lightRange = document.querySelector('.light__range');

power.addEventListener("change", () => {
    console.log(power.checked);
    socket.emit('pageLight', { powerLight: power.checked, brightness: Number(lightRange.value) });
});

lightRange.addEventListener("change", () => {
    console.log(lightRange.value);
    socket.emit('pageLight', { brightness: Number(lightRange.value), powerLight: power.checked });
});
