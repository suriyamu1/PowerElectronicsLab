var voltageCom = null;
var currentCom = null;
var push =  null;
var triSwitch = null;
var pushCircuit = null;
var triSwitchCircuit = null;
var chart = null;
var circuitName = "VC";
var pushCondition = "unpushed";
var position = 0;

window.onload = function() {
    voltageCom = document.getElementById('voltageCom');
    currentCom = document.getElementById('currentCom');
    push = document.getElementById('push');
    triSwitch = document.getElementById('switch');
    pushCircuit = document.getElementById('pushCircuit');
    triSwitchCircuit = document.getElementById('triCircuit');

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
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Unpushed_V.png"
    }else if (circuitName === "CC"){
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Unpushed_C.png"
    }

    triSwitchCircuit.src = "/Assets/Images/Commutation/Circuit_Position0.png";
    position =0;
}

function changePushCircuit(){

   if(pushCondition==="unpushed"){
       if(circuitName === "VC"){
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Pushed_V.png"
       }else if (circuitName === "CC"){
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Pushed_C.png"
       }
       pushCondition = "pushed";
   } 
   else if(pushCondition==="pushed"){
        if(circuitName === "VC"){
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Unpushed_V.png"
        }else if (circuitName === "CC"){
        pushCircuit.src = "/Assets/Images/Commutation/Circuit_Unpushed_C.png"
        }
        pushCondition = "unpushed";
   }  

}

function changeTriSwitchCircuit(){
   
    if(position===0){
        triSwitchCircuit.src = "/Assets/Images/Commutation/Circuit_Position1.png";
        position = 1;
    }else if(position===1){
        triSwitchCircuit.src = "/Assets/Images/Commutation/Circuit_Position2.png";
        position = 2;
    }else if(position===2){
        triSwitchCircuit.src = "/Assets/Images/Commutation/Circuit_Position0.png";
        position = 0;
    }

}

function showGraph(){
   
    let voltage =[0,0,0,0,0,0,0,0];

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
                data:voltage
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

function showCircuit(){
    chart.destroy();
}

