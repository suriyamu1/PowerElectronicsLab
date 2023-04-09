const scrv= document.getElementById("scr")
const diode = document.getElementById("diode");
const rload = document.getElementById("rload")
const mca = document.getElementById("mca");
const mcv= document.getElementById("mcv");
const mia = document.getElementById("mia");
const miv = document.getElementById("miv");
const firingAngle1 = document.getElementById("component1");
const firingAngle2 = document.getElementById("component2");

let dragId;
let dragComponentName;
let components =[null,null,null,null,null];
let componentsName =[null,null,null,null,null]

function allowDrop(ev) {
ev.preventDefault();
}

scrv.ondragstart     = (ev)=> { dragId = ev.target.id;
                                dragComponentName=ev.target.alt;}
diode.ondragstart    = (ev)=> { dragId = ev.target.id;
                                dragComponentName=ev.target.alt;}
rload.ondragstart    = (ev)=> { dragId = ev.target.id;
                                dragComponentName=ev.target.alt;}
mca.ondragstart      = (ev)=> { dragId = ev.target.id;
                                dragComponentName=ev.target.alt;}
mcv.ondragstart      = (ev)=> { dragId = ev.target.id;
                                dragComponentName=ev.target.alt;}
mia.ondragstart      = (ev)=> { dragId = ev.target.id;
                                dragComponentName=ev.target.alt;}
miv.ondragstart      = (ev)=> { dragId = ev.target.id;
                                dragComponentName=ev.target.alt;}

function drop(ev) {
    ev.preventDefault();
    let img = document.createElement('img');
    let dropId=ev.target.id;
    components[Number(dropId)-1] = dragId;
    componentsName[Number(dropId)-1] = dragComponentName;
    dragId = dragId+"_"+dropId;
    ev.target.style.border = "none";
    img.src = `../../Assets/Images/ACVR/DragAndDrop/${dragId}.png`;
    ev.target.innerHTML=null;
    ev.target.appendChild(img);
  }

  function verifyCircuit(){
    if(components.includes(null)){
      alert('The circuit is open circuited. Complete the circuit and try again.');
      location.reload();
      return;
    }

    //position 1
    if(!(components[0]==="scr" || components[0]==="diode")){
      alert('Connect SCR or Diode in the parallel circuit. Don\'t connect other components in the parallel circuit');
      location.reload();
      return;
    }

    //position 2
    if(!(components[1]==="scr" || components[1]==="diode")){
      alert('Connect SCR or Diode in the parallel circuit. Don\'t connect other components in the parallel circuit');
      location.reload();
      return;
    }

    //position 3
    if(components[2]==="mca"){
      alert('The voltage source is AC. We use moving iron instruments for AC circuits. Hence use a moving iron ammeter.');
      location.reload(); 
      return;
    }else if(components[2]==="miv" || components[2]==="mcv"){
      alert(componentsName[2]+" is connected in wrong position. Voltmeter should be connected in series with the voltage source.");
      location.reload(); 
      return;
    }else if(components[2]!=="mia"){
      alert(componentsName[2]+" is connected in wrong position");
      location.reload(); 
      return;
    }

    //position 4,5
    for(let i=4; i<=5; i++){
      if(components[i]==="mia"|| components[i]==="mca"){
        alert('Ammeter should not be connected in parallel with CRO');
        location.reload(); 
        return;
      }else if(components[i]==="scr"){
        alert('SCR should not be connected in parallel with CRO');
        location.reload(); 
        return;
      }else if(components[i]==="diode"){
        alert('Diode should not be connected in parallel with CRO');
        location.reload(); 
        return;
      }else if(components[i]==="mcv"){
        alert('The voltage source is AC. We use moving iron instruments for AC circuits. Hence use a moving iron voltmeter.');
        location.reload(); 
        return;
      }
    }

    //verify firing angle

    if(components[0]==="scr" && components[1]==="scr"){
      if(firingAngle1.value!=="a" && firingAngle2.value!=="180 + a"){
        alert('Given firing angle for both the components are not correct.');
        location.reload(); 
        return;
      }
      if(firingAngle1.value==="a" && firingAngle2.value!=="180 + a"){
        alert('Given firing angle for the component 2 is not correct.');
        location.reload(); 
        return;
      }
      if(firingAngle1.value!=="a" && firingAngle2.value==="180 + a"){
        alert('Given firing angle for the component 1 is not correct.');
        location.reload(); 
        return;
      }
    }else if(components[0]==="scr" && components[1]==="diode"){
      if(firingAngle1.value!=="a" && firingAngle2.value!=="Nil"){
        alert('Given firing angle for both the components are not correct.');
        location.reload(); 
        return;
      }
      if(firingAngle1.value==="a" && firingAngle2.value!=="Nil"){
        alert('You cannot provide firing angle for diode');
        location.reload(); 
        return;
      }
      if(firingAngle1.value!=="a" && firingAngle2.value==="Nil"){
        alert('Given firing angle for the component 1 is not correct.');
        location.reload(); 
        return;
      }
    }else if(components[0]==="diode" && components[1]==="diode"){
      if(firingAngle1.value!=="Nil" || firingAngle2.value!=="Nil"){
        alert('You cannot provide firing angle for diode');
        location.reload(); 
        return;
      }
    }else if(components[0]==="diode" && components[1]==="scr"){
      if(firingAngle1.value!=="Nil" && firingAngle2.value!=="180+a"){
        alert('Given firing angle for both the components are not correct.');
        location.reload(); 
        return;
      }
      if(firingAngle1.value!=="Nil" && firingAngle2.value==="180+a"){
        alert('You cannot provide firing angle for diode');
        location.reload(); 
        return;
      }
      if(firingAngle1.value==="Nil" && firingAngle2.value!=="180+a"){
        alert('Given firing angle for the component 2 is not correct.');
        location.reload(); 
        return;
      }
    }
    

    showGraph();

  }