
let socket = io("http://localhost:3000");

socket.on("sendToHomePage", data => console.log(data));
