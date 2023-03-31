let socket = io("http://localhost:3000");

let power = document.querySelector(".switch__input");
let name = document.querySelector(".cv__down-header");
let photo = document.querySelector(".cv__photo");


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


if (getCookie("powerCV") == "true") {
	power.checked = getCookie("powerCV");
} else {
	power.checked = false;
	setCookie("powerCV", "false");
}


if (getCookie("cvState")) {
	document.querySelector(".cv__down-header").textContent = getCookie("cvState");
	photo.src = `/pages/cv/img/${getCookie("cvState")}.png`;
}


socket.on("names", rec_name => {
	if (rec_name == "Artyom") {
		name.textContent = "Artem";
		photo.src = `/pages/cv/img/Artem.png`;
		setCookie("cvState", name.textContent);
	} else if (rec_name == "Android") {
		name.textContent = "Andrew";
		photo.src = `/pages/cv/img/Andrew.png`;
		setCookie("cvState", name.textContent);
	} else if (rec_name == "Susya") {
		name.textContent = "Asya";
		photo.src = `/pages/cv/img/Asya.png`;
		setCookie("cvState", name.textContent);
	} else {
		name.textContent = "Unknown";
		photo.src = `/pages/cv/img/Unknown.png`
		setCookie("cvState", name.textContent);
	}
});


power.addEventListener("change", () => {
	if (power.checked) {
		setCookie("powerCV", "true");
	} else {
		setCookie("powerCV", "false");
	}
});
