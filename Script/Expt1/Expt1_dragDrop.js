const scr = document.getElementById("scr");
const diode = document.getElementById("diode");
const rload = document.getElementById("rload");
const rl_load = document.getElementById("rl_load");
const mca = document.getElementById("mca");
const mcv = document.getElementById("mcv");
const mia = document.getElementById("mia");
const miv = document.getElementById("miv");
const current = document.getElementById("current");
const inVolt = document.getElementById("inVolt");
const outVolt = document.getElementById("outVolt");
const loadRes = document.getElementById("loadRes");

let components = []; //to store HTML DOM of the scrs and diodes
let items = []; // to store dropId of components in positions 1,2,3,4,5,6,7

//lookup table
const png_images = ["diode","mca_v","mcv_h","mia_v","miv_h","rl_load_h","rload_h"]; //draganddropImages folder

for(i=1; i<=4; i++) {
  components[i] = document.getElementById("component"+i);
}

let dragId;

function allowDrop(ev) {
  ev.preventDefault();
}

scr.ondragstart     = (ev)=> { dragId =ev.target.id; }
diode.ondragstart   = (ev)=> { dragId =ev.target.id; }
rload.ondragstart   = (ev)=> { dragId =ev.target.id; }
rl_load.ondragstart = (ev)=> { dragId =ev.target.id; }
mca.ondragstart     = (ev)=> { dragId =ev.target.id; }
mcv.ondragstart     = (ev)=> { dragId =ev.target.id; }
mia.ondragstart     = (ev)=> { dragId =ev.target.id; }
miv.ondragstart     = (ev)=> { dragId =ev.target.id; }


function drop(ev) {
  ev.preventDefault();
  let img = document.createElement('img');
  let dropId=ev.target.id;
  if(dropId==="5" && (dragId==="miv" || dragId==="mcv" || dragId==="rl_load" || dragId==="rload")){
    dragId = dragId+"_h"; 
  }else if((dropId==="6" || dropId==="7") && (dragId==="mca" || dragId=="mia")){
    dragId=dragId+"_v";
  }
  items[dropId] = dragId;
  if(png_images.includes(dragId))
    img.src = `../../Assets/Images/dragAndDropImages/Expt1/${dragId}.png`;
  else
    img.src = `../../Assets/Images/dragAndDropImages/Expt1/${dragId}.PNG`;
  ev.target.style.border = "none";
  ev.target.innerHTML =null;
  ev.target.appendChild(img);
}


function verify_circuit() {
  // VERIFYING the positions 1,2,3,4
  for(i=1; i<=4; i++) {
    if(items[i]=='mca' || items[i]=='mia') {
      alert('Ammeter is connected in wrong position. Ammeter must be in series with the load.');
      location.reload(); return;
    }
  }

  for(i=1; i<=4; i++) {
    if(items[i]=='mcv' || items[i]=='miv') {
      alert('Voltmeter is connected in wrong position. Voltmeter must be in parallel to the load and CRO.');
      location.reload();
      return;
    }
  }

  for(i=1; i<=4; i++) {
    if(items[i]=='rload' || items[i]=='rl_load') {
      alert('Load is connected in the wrong position.');
      location.reload();
      return;
    }
  }

  // if execution comes here, it means items[1,2,3,4] is SCR or diode only
  if( (items[1]!= null && items[4]!=null) || (items[2]!= null && items[3] != null)) {
    // circuit is closed till now
  }
  else {
    alert('The circuit is open circuited. Complete the circuit and try again.');
    location.reload();
    return;
  }

  // VERIFYING POSITION 5
  if(items[5]==null) {
    alert('The circuit is open circuited!! Connect the ammeter and try again!');
    return;
  }
  else if(items[5]==='mca') {
      //ckt is correct upto now
  }
  else if(items[5]==='mcv-h' || items[5]==='miv-h') {
    alert('Voltmeter must not be connected in series with the load and supply.');
    location.reload();
    return;
  }
  else if(items[5]==='mia') {
    alert('The output of a converter is DC. We use moving coil instruments for DC circuits. Hence use a moving coil ammeter.');
    location.reload();
    return;
  }
  else if(items[5] === 'rload-h' || items[5] === 'rl_load-h') {
    alert('The load is connected in the wrong position. To view the output voltage waveform, load must be connected parallel to the CRO.');
    location.reload();
    return;
  }
  else if(items[5]=='scr'||items[6]=='diode') {
    alert('Diodes and SCRs should be connected only within the bridge circuit or in parallel (freewheeling) to the load.');
    location.reload();
    return;
  }

  // VERIFICATION OF POSITION-6 and POSITION-7
  if(items[6]==null && items[7]==null) {
    alert('Connect the load to complete the circuit.');
    return;
  }

  for(i=6; i<=7; i++) {
    if(items[i] == 'scr') {
      alert('SCR should not be connected across the load.');
      location.reload(); return;
    }
    else if(items[i]=='diode') {
      alert('Diode connected across the load acts as freewheeling diode. Semi converter does not need freewheeling diode.');
      location.reload(); return;
    }
    else if(items[i]=='mca-v' || items[7]=='mia-v') {
      alert('Ammeter should not be connected in parallel with the load. It should only be connected in series!');
      location.reload(); return;
    }
    else if(items[i]=='miv') {
      alert('Moving iron voltmeter cannot be used to measure the output voltage since output voltage is pulsating DC.');
      location.reload(); return;
    }
      
  }
  if((items[6]=='rload' || items[6] == 'rl_load') && (items[7]=='rload' || items[7] == 'rl_load')) {
    // if both positions 6 and 7 have loads (R or RL), then it should not be allowed
    alert('Connect only one load in the circuit.');
    location.reload();
    return;
  }

  if(items[6]==='mcv' && items[7]==='mcv') {
    alert('One voltmeter is enough!!');
    location.reload();
    return;
  }

  if(items[6]==null || items[7] == null) {
    alert('Connect both load and voltmeter across the CRO to complete the circuit');
    return;
  }

  // if all the edge cases above are not executed, the circuit is complete.

  // NOW WE HAVE TO VERIFY THE FIRING ANGLES and COMBO of SCR & DIODES
  for(i=1; i<=4; i++) {
    theta = components[i].value;

    if(items[i]=='scr') {
      if(theta === 'Nil') {
        alert('Give firing pulse to the SCR-'+i);
        return;
      }
    }
    if(items[i]=='diode') {
      if(theta !== 'Nil') {
        alert('You cannot give firing pulse to a diode!');
        return;
      }
    }
  }
  let scr_count = 0, diode_count = 0;
  for(i=1; i<=4; i++) {
    if(items[i]=='scr')
      scr_count++;
    else if(items[i]=='diode')
      diode_count++;
  }

  if(scr_count !== 2 || diode_count !== 2) {
    alert('1-Phase Semi converter should have 2 SCRs and 2 diodes.');
    location.reload(); return;
  }

  if(items[1]=='scr' && items[4]=='scr') {
    alert('In this circuit, both the SCRs will be forward biased in positive half cycle and both SCRs will be reverse biased in negative half cycle. So we can only control the positive half cycle. Hence this is not a semi-converter circuit');
    location.reload(); return;
  }

  if(items[2]=='scr' && items[3]=='scr') {
    alert('In this circuit, both the SCRs will be reverse biased in positive half cycle and both SCRs will be forward biased in negative half cycle. So we can only control the negative half cycle. Hence this is not a semi-converter circuit');
    location.reload(); return;
  }

  if(items[1]=='scr' && items[2]=='scr' && items[3]=='diode' && items[4]=='diode') {
    if(components[1].value=='a' && components[2].value == '180 + a') {
      showGraph();
      output.classList.remove("hide");
      simulation.classList.add("hide");
    }
    else {
      alert('The components are connected correctly but firing angles are not given correctly. Please retry');
      return;
    }
  }

  if(items[3]=='scr' && items[4]=='scr' && items[1]=='diode' && items[1]=='diode') {
    if(components[4].value=='a' && components[3].value == '180 + a') {
      showGraph();
      output.classList.remove("hide");
      simulation.classList.add("hide");
    }
    else {
      alert('The components are connected correctly but firing angles are not given correctly. Please retry');
      return;
    }
  }

  if(items[1]=='scr' && items[3]=='scr' && items[2]=='diode' && items[4]=='diode') {
    if(components[1].value=='a' && components[3].value == '180 + a') {
      showGraph();
      output.classList.remove("hide");
      simulation.classList.add("hide");
    }
    else {
      alert('The components are connected correctly but firing angles are not given correctly. Please retry');
      return;
    }
  }

  if(items[2]=='scr' && items[4]=='scr' && items[1]=='diode' && items[3]=='diode') {
    if(components[4].value=='a' && components[2].value == '180 + a') {
      showGraph();
      output.classList.remove("hide");
      simulation.classList.add("hide");
    }
    else {
      alert('The components are connected correctly but firing angles are not given correctly. Please retry');
      return;
    }
  }
  // showGraph();
  // output.classList.remove("hide");
  // simulation.classList.add("hide");
}