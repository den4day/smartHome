let power = document.querySelector(".switch__input");
let name = document.querySelector(".cv__down-header");
let photo = document.querySelector(".cv__img");
// name.textContent = "Atrem";
// photo.src = "/pages/cv/img/фотка.png"


power.addEventListener("change", () => {
    console.log(power.checked);

    // написать код отправки значения на python
    // и на питоне включать или выключать CV
});
