const voltSlider = document.getElementById("voltSlider");
const span = document.getElementById("voltValue");
span.innerText = voltSlider.value + "V AC";

voltSlider.oninput = function() {
    span.innerHTML = this.value + "V AC";
}

const scr1 = document.getElementById("scr1");
console.log(scr1.value);