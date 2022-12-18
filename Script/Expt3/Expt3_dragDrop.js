const scr = document.getElementById("scr");
const diode = document.getElementById("diode");
const rload = document.getElementById("rload");
const rl_load = document.getElementById("rl_load");
const mca = document.getElementById("mca");
const mcv = document.getElementById("mcv");
const mia = document.getElementById("mia");
const miv = document.getElementById("miv");
const transistor = document.getElementById("transistor");
const source = document.getElementById("source");

let dragId;
let loadType = null;

function allowDrop(ev) {
ev.preventDefault();
}

scr.ondragstart      = (ev)=> { dragId = ev.target.id; }
diode.ondragstart    = (ev)=> { dragId = ev.target.id; }
rload.ondragstart    = (ev)=> { dragId = ev.target.id; }
rl_load.ondragstart  = (ev)=> {
  dragId = ev.target.id;
  loadType = "rl_load" 
}
mca.ondragstart      = (ev)=> { dragId = ev.target.id; }
mcv.ondragstart      = (ev)=> { dragId = ev.target.id; }
mia.ondragstart      = (ev)=> { dragId = ev.target.id; }
miv.ondragstart      = (ev)=> { dragId = ev.target.id; }
transistor.ondragstart = (ev)=> { dragId = ev.target.id;}
source.ondragstart = (ev)=> { dragId = ev.target.id; }

function drop(ev) {
    ev.preventDefault();
    let img = document.createElement('img');
    let dropId=ev.target.id;
    ev.target.style.border = "none";
    img.src = `../../Assets/Images/DC_chopper/DragandDrop/${dragId}.PNG`;
    ev.target.innerHTML=null;  // to remove 1,2,3,4 after images are dropped there
    ev.target.appendChild(img);
  }
  