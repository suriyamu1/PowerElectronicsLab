var voltageCom = null;
var currentCom = null;
var push =  null;
var triSwitch = null;
var pushCircuit = null;
var triSwitchCircuit = null;
var inVolt = null;
var outVolt = null;
var gateVolt = null;
var current = null;
var loadRes = null;
var gateRes = null;
var comVolt = null;
var chart = null;
var circuitName = "VC";
var pushCondition = "unpushed";
var position = 0;
var voltageArr =[0,0,0,0,0,0,0,0];
var pushFlag = false;
var expt_values = null;

window.onload = function() {
    
    voltageCom = document.getElementById('voltageCom');
    currentCom = document.getElementById('currentCom');
    push = document.getElementById('push');
    triSwitch = document.getElementById('switch');
    pushCircuit = document.getElementById('pushCircuit');
    triSwitchCircuit = document.getElementById('triCircuit');
    inVolt = document.getElementById('inVolt');
    outVolt = document.getElementById('outVolt');
    gateVolt = document.getElementById('gateVolt');
    current = document.getElementById('current');
    loadRes = document.getElementById('loadRes');
    gateRes = document.getElementById('gateRes');;
    comVolt = document.getElementById('comVolt');

    expt_values = JSON.parse(localStorage.getItem('expt5_values'));
   
    inVolt.innerHTML = expt_values.inputVoltage+" V";
    outVolt.innerHTML = expt_values.inputVoltage+" V";
    gateVolt.innerHTML = expt_values.gateVoltage+" V";
    current.innerHTML = expt_values.loadCurrent.toFixed(2)+" A";
    comVolt.innerHTML = expt_values.commonVoltage+" V";
    loadRes.innerHTML = expt_values.loadresistor+" ohm";
    gateRes.innerHTML = expt_values.gateResistor+" ohm";

    voltageCom.onclick = changeCircuit;
    currentCom.onclick = changeCircuit;
    push.onclick = changePushCircuit;
    triSwitch.onclick = changeTriSwitchCircuit;

    showGraph();
}


function changeCircuit(){
    let clickedButton = document.querySelector('input[name="circuitOption"]:checked') 
    circuitName = clickedButton.value;
    
    if(circuitName === "VC"){
<<<<<<< HEAD
        pushCircuit.src = "../../Assets/Images/Commutation/Circuit_Unpushed_V.PNG"
    }else if (circuitName === "CC"){
        pushCircuit.src = "../..//Assets/Images/Commutation/Circuit_Unpushed_C.PNG"
    }

    triSwitchCircuit.src = "../../Assets/Images/Commutation/Circuit_Position0.PNG";
=======
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Unpushed_V.png"
    }else if (circuitName === "CC"){
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Unpushed_C.png"
    }

    triSwitchCircuit.src = "/Assets/Images/Commutation/Circuit_Position0.png";
>>>>>>> db90a1b35a57dd875614ffcbab859cc5ded346bb
    position =0;
}

function changePushCircuit(){

   if(pushCondition==="unpushed"){
       
       pushFlag = true;
       alert("Release the push button after few seconds");
       if(circuitName === "VC"){
<<<<<<< HEAD
        pushCircuit.src = "../../Assets/Images/Commutation/Circuit_Pushed_V.PNG"
       }else if (circuitName === "CC"){
        pushCircuit.src = "../../Assets/Images/Commutation/Circuit_Pushed_C.PNG"
=======
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Pushed_V.png"
       }else if (circuitName === "CC"){
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Pushed_C.png"
>>>>>>> db90a1b35a57dd875614ffcbab859cc5ded346bb
       }
       pushCondition = "pushed";
   } 
   else if(pushCondition==="pushed"){
        if(circuitName === "VC"){
<<<<<<< HEAD
        pushCircuit.src = "../../Assets/Images/Commutation/Circuit_Unpushed_V.PNG"
        }else if (circuitName === "CC"){
        pushCircuit.src = "../../Assets/Images/Commutation/Circuit_Unpushed_C.PNG"
=======
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Unpushed_V.png"
        }else if (circuitName === "CC"){
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Unpushed_C.png"
>>>>>>> db90a1b35a57dd875614ffcbab859cc5ded346bb
        }
        pushCondition = "unpushed";
   }  

}

function changeTriSwitchCircuit(){
   
    if(position===0){
<<<<<<< HEAD
        triSwitchCircuit.src = "../../Assets/Images/Commutation/Circuit_Position1.PNG";
=======
        triSwitchCircuit.src = "/Assets/Images/Commutation/Circuit_Position1.png";
>>>>>>> db90a1b35a57dd875614ffcbab859cc5ded346bb
        position = 1;
    }else if(position===1){
        if(!pushFlag){
            alert("Let the Capacitor to charge by pushing the push button for few seconds");
         }
        else if(pushFlag && pushCondition==="pushed"){
             alert("Release the push button, Capacitor is charged");
         }
        else{        
<<<<<<< HEAD
            triSwitchCircuit.src = "../../Assets/Images/Commutation/Circuit_Position2.PNG";
            position = 2;
         }
    }else if(position===2){   
        triSwitchCircuit.src = "../../Assets/Images/Commutation/Circuit_Position0.PNG";
=======
            triSwitchCircuit.src = "/Assets/Images/Commutation/Circuit_Position2.png";
            position = 2;
         }
    }else if(position===2){   
        triSwitchCircuit.src = "/Assets/Images/Commutation/Circuit_Position0.png";
>>>>>>> db90a1b35a57dd875614ffcbab859cc5ded346bb
        position = 0;
        pushFlag = false;
        pushCondition = "unpushed";
    }
    setVoltage(position);
}

function setVoltage(switchPosition){

   let voltage =  expt_values.inputVoltage;

   if(voltage!=null){
    if(switchPosition===1){
        voltageArr = [];
        for(let i=0;i<8;i++){
            voltageArr.push(voltage);
        }
    }else if(switchPosition===2){
        voltageArr =[0,0,0,0,0,0,0,0];
    }
    showGraph();
   }else if(voltage==null){
    alert("Do Circuit Design Verfication First");
    window.location.href = "/HTML/Expt5_Commutation/expt5_circuit_design.html"
   }
}

function showGraph(){
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    const ctx = document.getElementById("waveform");

    if(chart!==null) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:[1,2,3,4,5,6,7,8],
            datasets:[{
                label:"SCR Commutation",
                lineTension:0.17,
                backgroundColor:"rgba(255, 121, 121,1.0)",
                borderColor:"#2E0249",
                data:voltageArr
            }]
        },
        options: {
            elements:{
                point:{
                    radius:0
                }
            },
            scales:{
                y: {
                    suggestedMin: -30,
                    suggestedMax: 30
                },
                yAxes:{
                    title:{
                        display:true,
                        text:"Voltage(V)",
                        font: {
                            size: 15
                        }
                    }
                },
                xAxes:{
                    title:{
                        display:true,
                        text:"time(milliseconds)",
                        font: {
                            size: 15
                        }
                    }
                }
            }
        }
    });
}

