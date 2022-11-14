const scr = document.getElementById("scr");
const diode = document.getElementById("diode");
const rload = document.getElementById("rload");
const rl_load = document.getElementById("rl_load");
const mca = document.getElementById("mca");
const mcv = document.getElementById("mcv");
const mia = document.getElementById("mia");
const miv = document.getElementById("miv");
let verification=null;
let prevScr="0";
let prevdiode="0";
let count =0;

let ans = "bitch";
const component1 = document.getElementsByName("component1");  //gives an array

for(i=0; i<component1.length;i++) {
  if(component1[i].checked) {
    ans = component1[i].value;
  }
}
console.log(ans);

let dragId;
function display_firing_angle() {
  for(i=0; i<component1.length;i++) {
    if(component1[i].checked) {
      ans = component1[i].value;
    }
  }
  console.log("here: "+ans);
}
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
    dragId = dragId+"-h";
  }else if((dropId==="6" || dropId==="7") && (dragId==="mca" || dragId=="mia")){
    dragId=dragId+"-v";
  }
  img.src = `../../Assets/Images/dragAndDropImages/Expt1/${dragId}.PNG`;
  ev.target.style.border = "none";
  ev.target.innerHTML =null;
  ev.target.appendChild(img);
  if(verification!==false && dragId==="scr" && (prevScr==="0" || (dropId==="1" && (prevScr==="2" || prevScr==="3")) || (dropId==="2" && (prevScr==="1" || prevScr==="4"))|| (dropId==="3" && (prevScr==="1" || prevScr==="4"))|| (dropId==="4" && (prevScr==="2" || prevScr==="3")))){
    verification=true;
    prevScr=dropId;
  }else if(verification!==false && dragId==="diode" && (prevdiode==="0" || (dropId==="1" && prevdiode==="2") || (dropId==="2" && (prevScr==="1" || prevScr==="4"))|| (dropId==="3" && prevScr==="4")|| (dropId==="4" && (prevScr==="2" || prevScr==="3")))){
    verification=true;
    prevScr=dropId;
  }
  else if(verification!==false && (dragId==="mca") && dropId==="5"){
    verification=true;
  }
  else if(verification!==false && (dragId==="rload" || dragId==="rl_load" || dragId==="mcv") && (dropId==="6" || dropId==="7")){
    verification=true;
  }
  else{
    verification=false;
  }
  count++;
  console.log(verification);
}
