let socket = io("http://localhost:3000");
let power = document.querySelector('.switch__input');
let lightRange = document.querySelector('.light__range');

let json = {}

power.addEventListener("change", () =>{
    console.log(power.checked);
    let obj = JSON.parse(JSON.stringify(json))
    socket.emit('sendLightRange', power.checked == true ? 1 : 0);
});

lightRange.addEventListener("change", () =>{
    console.log(lightRange.value);
    socket.emit('sendLightRange', lightRange.value);
});



//socket.on("sendToHomePage", data => console.log(data));
