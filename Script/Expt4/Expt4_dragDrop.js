const scrv= document.getElementById("scr")
const diode = document.getElementById("diode");
const rload = document.getElementById("rload")
const mca = document.getElementById("mca");
const mcv= document.getElementById("mcv");
const mia = document.getElementById("mia");
const miv = document.getElementById("miv");

let dragId;
let loadType = null;
let components =[null,null,null,null,null,null];

function allowDrop(ev) {
ev.preventDefault();
}

scrv.ondragstart     = (ev)=> { dragId = ev.target.id;}
diode.ondragstart    = (ev)=> { dragId = ev.target.id; }
rload.ondragstart    = (ev)=> { dragId = ev.target.id; }
mca.ondragstart      = (ev)=> { dragId = ev.target.id; }
mcv.ondragstart      = (ev)=> { dragId = ev.target.id; }
mia.ondragstart      = (ev)=> { dragId = ev.target.id; }
miv.ondragstart      = (ev)=> { dragId = ev.target.id; }

function drop(ev) {
    ev.preventDefault();
    let img = document.createElement('img');
    let dropId=ev.target.id;
    console.log(dropId);
    console.log(dragId);

    components[Number(dropId)-1] = dragId;

    dragId = dragId+"_"+dropId;

    ev.target.style.border = "none";
    img.src = `../../Assets/Images/ACVR/DragAndDrop/${dragId}.png`;
    ev.target.innerHTML=null;  // to remove 1,2,3,4 after images are dropped there
    ev.target.appendChild(img);
  }