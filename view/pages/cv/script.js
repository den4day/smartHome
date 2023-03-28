let socket = io("http://localhost:3000");

let power = document.querySelector(".switch__input");
let name = document.querySelector(".cv__down-header");
let photo = document.querySelector(".cv__photo");

socket.on("names", rec_name => {
	console.log(rec_name);
	if (rec_name == "Artyom") {
		name.textContent = "Artem";
		photo.src = "/pages/cv/img/artyom.png"
	} else if (rec_name == "Android") {
		name.textContent = "Andrew";
		photo.src = "/pages/cv/img/andrey.png"
		console.log(photo.src)
	} else if (rec_name == "Susya") {
		name.textContent = "Asya";
		photo.src = "/pages/cv/img/asya.png"
	} else {
		name.textContent = "Unknown";
		photo.src = "/pages/cv/img/unknown.jpg"
	}
});


power.addEventListener("change", () => {
	console.log(power.checked);

	// написать код отправки значения на python
	// и на питоне включать или выключать CV
});
