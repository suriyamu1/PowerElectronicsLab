const scr = document.getElementById("scr");
const diode = document.getElementById("diode");
const rload = document.getElementById("rload");
const rl_load = document.getElementById("rl_load");
const mca = document.getElementById("mca");
const mcv = document.getElementById("mcv");
const mia = document.getElementById("mia");
const miv = document.getElementById("miv");
let verification=null;
let count =0;
let loadType = null;
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
  let img = document.createElement('img');
  let dropId=ev.target.id;
  if(dropId==="5" && (dragId==="miv" || dragId==="mcv" || dragId==="rl_load" || dragId==="rload")){
    dragId = dragId+"-h"; // id-5 => ammeter  //if mcv,mia,miv are dropped, insert the horizontal img of that component
  }else if((dropId==="6" || dropId==="7") && (dragId==="mca" || dragId=="mia")){
    dragId=dragId+"-v"; //id-6 and id-7 => load or mcv // so if mi,mca are dropped there, insert their vertical images
  }
  img.src = `../../Assets/Images/dragAndDropImages/Expt1/${dragId}.PNG`;
  ev.target.style.border = "none";
  ev.target.innerHTML=null;  // to remove 1,2,3,4 after images are dropped there
  ev.target.appendChild(img);
  if(verification!==false && dragId==="scr" && (dropId==="1" || dropId==="2" || dropId==="3" || dropId==="4")){
    verification=true;
  }else if(verification!==false && (dragId==="mca") && dropId==="5"){
    verification=true;
  }
  else if(verification!==false && (dragId==="rload" || dragId==="rl_load" || dragId==="mcv") && (dropId==="6" || dropId==="7")){
    if(dragId==="rl_load"){
      loadType=dragId;
    }
    verification=true;
  }
  else{
    verification=false;
  }
  count++;
  console.log(verification);
}