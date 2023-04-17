const output = document.getElementById("output");
const simulation = document.getElementById("simulation");
const alpha1 = document.getElementById("alpha1");
const alpha2 = document.getElementById("alpha2");
const angleDisplay1 = document.getElementById("angleDisplay1");
const angleDisplay2 = document.getElementById("angleDisplay2");
const avgDisplay = document.getElementById("avgDisplay");
const rmsDisplay = document.getElementById("rmsDisplay");
const control1 = document.getElementById("control1");
const control2 = document.getElementById("control2");

let scr1;
let scr2;
let diode1;
let diode2;

var avg =0;
var rms =0;
var expt_values = null;

window.onload = function() {
    expt_values = JSON.parse(localStorage.getItem('expt2_values'));
    data.voltage = expt_values.inputVoltageRMS;
    console.log(expt_values);
}
  
function setReadings(){
    current.innerHTML = expt_values.peakLoadCurrent.toFixed(2)+" A";
    inVolt.innerHTML = expt_values.inputVoltageRMS+" V";
    outVolt.innerHTML = expt_values.avg.toFixed(2)+" V";
    loadRes.innerHTML = expt_values.loadResistance+" ohm";
}

const data ={
    firingangle1:0,
    firingangle2:180,
    voltage:230
}

function calculateCos(degrees) {
    var radians = (Math.PI / 180) * degrees;
    return Math.cos(radians);
}

function calculateSine(degrees) {
    var radians = (Math.PI / 180) * degrees;
    return Math.sin(radians);
}

alpha1.oninput=()=>{
    data.firingangle1=Number(alpha1.value);
    angleDisplay1.innerHTML=data.firingangle1+"&#176;";
    showGraph();
}

alpha2.oninput=()=>{
    data.firingangle2=180+Number(alpha2.value);
    angleDisplay2.innerHTML= data.firingangle2+"&#176;";
    showGraph();
}

let chart=null;

function showGraph(){
    let sineValues=[];
    let labelValue=[];
    let theta=0;

    if(components[0]==="scr" && components[1]==="diode"){
        control2.classList.add("hide");
    }else if(components[0]==="diode" && components[1]==="diode"){
        control1.classList.add("hide");
        control2.classList.add("hide");
    }else if(components[0]==="diode" && components[1]==="scr"){
        control1.classList.add("hide");
    }

    for(let i=0; i<=720; i++){
        labelValue.push(i+"");
    }

    for(let i=0;i<=720;i++){
        theta=theta%360;
        let x= data.voltage*Math.sqrt(2)*calculateSine(theta);
        if(theta>=data.firingangle1 && theta<=180){
            sineValues.push(x);
        }else if(theta >= data.firingangle2 && theta<=360){
            sineValues.push(x);
        }else{
            sineValues.push(0);
        }
        theta+=1;
    }

    const ctx = document.getElementById("waveform");
    if(chart!==null) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets:[{
                label:"AC voltage controller waveform",
                lineTension:0.17,
                backgroundColor:"rgba(255, 121, 121,1.0)",
                borderColor:"#2E0249",
                data:sineValues
            }],
            labels:labelValue,
        },
        options: {
            elements:{
                point:{
                    radius:0
                }
            },
            scales:{
                y: {
                    suggestedMin: -15,
                    suggestedMax: 15
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
                        text:"Angle(degrees)",
                        font: {
                            size: 15
                        }
                    }
                }
            }
        }
    });

    output.classList.remove("hide");
    simulation.classList.add("hide");
}

function showCircuit(){
    chart.destroy();
    output.classList.add("hide");
    simulation.classList.remove("hide");
}

