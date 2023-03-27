let socket = io("http://localhost:3000");
let power = document.querySelector('.switch__input');
let lightRange = document.querySelector('.light__range');

power.addEventListener("change", () => {
    console.log(power.checked);
    socket.emit('pageAC', { power: power.checked });
});

// lightRange.addEventListener("change", () => {
//     console.log(lightRange.value);
//     socket.emit('pageAC', { brightness: Number(lightRange.value) });
// });
