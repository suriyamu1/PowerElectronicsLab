const scr = document.getElementById("scr");
const diode = document.getElementById("diode");
const rload = document.getElementById("rload");
const rl_load = document.getElementById("rl_load");
const mca = document.getElementById("mca");
const mcv = document.getElementById("mcv");
const mia = document.getElementById("mia");
const miv = document.getElementById("miv");

let dragId;

function allowDrop(ev) {
  ev.preventDefault();
} 
scr.ondragstart = (ev)=> {
  dragId =ev.target.id;
}
diode.ondragstart = (ev)=> {
  dragId =ev.target.id;
}
rload.ondragstart = (ev)=> {
  dragId =ev.target.id;
}
rl_load.ondragstart = (ev)=> {
  dragId =ev.target.id;
}
mca.ondragstart = (ev)=> {
  dragId =ev.target.id;
}
mcv.ondragstart = (ev)=> {
  dragId =ev.target.id;
}
mia.ondragstart = (ev)=>
{
  dragId =ev.target.id;
}
miv.ondragstart = (ev)=> {
  dragId =ev.target.id;
}
  
function drop(ev) {
  ev.preventDefault();
  var img = document.createElement('img');
  img.src = `../../Assets/Images/dragAndDropImages/Expt1/${dragId}.PNG`;
  ev.target.style.border = "none";
  ev.target.appendChild(img);
}