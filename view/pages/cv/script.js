let socket = io("http://localhost:3000");

let power = document.querySelector(".switch__input");
let name = document.querySelector(".cv__down-header");
let photo = document.querySelector(".cv__photo");


function setCookie(name, value, options = {}) {
	options = {
		path: '/',
		// при необходимости добавьте другие значения по умолчанию
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


if (getCookie("powerCV") == "true") {
	power.checked = getCookie("powerCV");
	console.log(getCookie("powerCV"));
} else {
	power.checked = false;
	setCookie("powerCV", "false");
	console.log(getCookie("powerCV"));
}


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
	if (power.checked) {
		setCookie("powerCV", "true");
	} else {
		setCookie("powerCV", "false");
	}

	// написать код отправки значения на python
	// и на питоне включать или выключать CV
});
