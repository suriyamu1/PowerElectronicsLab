const diode = document.getElementById("diode");
const rload = document.getElementById("rload")
const rl_load = document.getElementById("rl_load");
const mca = document.getElementById("mca");
const mcv= document.getElementById("mcv");
const mia = document.getElementById("mia");
const miv = document.getElementById("miv");
const transistor = document.getElementById("transistor");
const DcSource = document.getElementById("DcSource");

let dragId;
let dragComponentName;
let components =[null,null,null,null,null,null];
let componentsName= [null,null,null,null,null,null];

function allowDrop(ev) {
ev.preventDefault();
}

diode.ondragstart    = (ev)=> { dragId = ev.target.id;
                                dragComponentName = ev.target.alt;}
rload.ondragstart    = (ev)=> { dragId = ev.target.id;
                                dragComponentName = ev.target.alt;}
rl_load.ondragstart  = (ev)=> { dragId = ev.target.id;
                                dragComponentName = ev.target.alt;}
mca.ondragstart      = (ev)=> { dragId = ev.target.id;
                                dragComponentName = ev.target.alt;}
mcv.ondragstart      = (ev)=> { dragId = ev.target.id;
                                dragComponentName = ev.target.alt;}
mia.ondragstart      = (ev)=> { dragId = ev.target.id;
                                dragComponentName = ev.target.alt;}
miv.ondragstart      = (ev)=> { dragId = ev.target.id;
                                dragComponentName = ev.target.alt;}
transistor.ondragstart = (ev)=> { dragId = ev.target.id;
                                dragComponentName = ev.target.alt;}
DcSource.ondragstart = (ev)=> { dragId = ev.target.id;
                                dragComponentName = ev.target.alt;}

function drop(ev) {
    ev.preventDefault();
    let img = document.createElement('img');
    let dropId=ev.target.id;

    components[Number(dropId)-1] = dragId;
    componentsName[Number(dropId)-1] = dragComponentName;

    if(dropId==="2" && (dragId==="miv" || dragId==="mcv" || dragId==="rl_load" || dragId==="rload" || dragId==="diode")){
      dragId = dragId+"_h";
    }else if((dropId==="4" || dropId==="5" || dropId==="6") && (dragId==="mca" || dragId==="mia")){
      dragId=dragId+"_v"+"_"+dropId;
    }else if((dropId==="4" || dropId==="5" || dropId==="6") && (dragId==="mcv" || dragId==="miv" || dragId==="diode" || dragId==="rl_load" || dragId==="rload")){
      dragId= dragId+"_"+dropId;
    }

    ev.target.style.border = "none";
    img.src = `../../Assets/Images/DC_chopper/DragandDrop/${dragId}.png`;
    ev.target.innerHTML=null;  // to remove 1,2,3,4 after images are dropped there
    ev.target.appendChild(img);
  }

  function verifyCircuit(){

    if(components.includes(null)){
      alert('The circuit is open circuited. Complete the circuit and try again.');
      location.reload();
      return;
    }

    //Position 1
    if(components[0] !== "DcSource"){
      alert('Connect DC voltage source in correct position');
      location.reload(); 
      return;
    }

    //Position 2
    if(components[1]==="mia"){
      alert('The voltage source is DC. We use moving coil instruments for DC circuits. Hence use a moving coil ammeter.');
      location.reload(); 
      return;
    }else if(components[1]==="miv" || components[1]==="mcv"){
      alert(componentsName[1]+" is connected in wrong position. Voltmeter should be connected in series with the voltage source.");
      location.reload(); 
      return;
    }else if(components[1]!=="mca"){
      alert(componentsName[1]+" is connected in wrong position");
      location.reload(); 
      return;
    }

    //Position 3
    if(components[2] !== "transistor"){
      alert('Connect transistor in correct position');
      location.reload(); 
      return;
    }

    //Position 4,5 and 6

    for(let i=3; i<=5; i++){
      if(components[i]==="mia"|| components[i]==="mca"){
        alert('Ammeter should not be connected in parallel with CRO');
        location.reload(); 
        return;
      }else if(components[i]==="transistor"){
        alert('Transistor should not be connected in parallel with CRO');
        location.reload(); 
        return;
      }else if(components[i]==="DcSource"){
        alert('DC Source should not be connected in parallel with CRO');
        location.reload(); 
        return;
      }else if(components[i]==="miv"){
        alert('Moving iron voltmeter cannot be used to measure the output voltage since output voltage is pulsating DC.');
        location.reload(); 
        return;
      }
    }
    

    showGraph();
  }
  