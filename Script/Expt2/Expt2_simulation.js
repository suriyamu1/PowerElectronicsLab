const output = document.getElementById("output");
const simulation = document.getElementById("simulation");
const alpha = document.getElementById("alpha");
const angleDisplay = document.getElementById("angleDisplay");
const avgDisplay = document.getElementById("avgDisplay");
const rmsDisplay = document.getElementById("rmsDisplay");
let angle=0;
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
    inVolt.innerHTML = expt_values.InputVoltageRMS+"/"+expt_values.InputVoltageRMS+" V";
    outVolt.innerHTML = expt_values.avg.toFixed(2)+" V";
    loadRes.innerHTML = expt_values.loadResistance+" ohm";
}

const data ={
    firingangle :angle,
    voltage:0
}

function calculateCos(degrees) {
    var radians = (Math.PI / 180) * degrees;
    return Math.cos(radians);
}

function calculateSine(degrees) {
    var radians = (Math.PI / 180) * degrees;
    return Math.sin(radians);
}

alpha.oninput=()=>{
    angle=Number(alpha.value);
    data.firingangle=angle;
    angleDisplay.innerHTML=angle+"&#176;";
    avg = ((2*data.voltage)/Math.PI)*(calculateCos(angle));
    avgDisplay.innerHTML=avg.toPrecision(5)+" V";
    rms = (data.voltage/Math.sqrt(2*Math.PI))*Math.sqrt(Math.PI-( (Math.PI / 180) * angle)+(calculateSine(angle)/2));
    rmsDisplay.innerHTML=rms.toPrecision(5)+" V";
    showGraph();
    expt_values.avg = avg;
    localStorage.setItem("expt2_values",JSON.stringify(expt_values));
}

let chart=null;

function showGraph(){
    let sineValues=[];
    let labelValue=[];
    let theta=0;

    for(let i=0; i<=720; i++){
        labelValue.push(i+"");
    }
if(loadType!=="rl_load"){
    for(let i=0;i<=720;i++){
        theta=theta%360;
        if((theta>=data.firingangle && theta<=180) || (theta>=180+data.firingangle &&theta<=360)){
            let x= data.voltage*Math.sqrt(2)*calculateSine(theta);
            sineValues.push(Math.abs(x));
        }else{
            sineValues.push(0);
        }
        theta+=1;
    }
}
else{
    for(let i=0;i<=720;i++){
        theta=theta%360;
        let x= data.voltage*Math.sqrt(2)*calculateSine(theta);
        if((theta>=data.firingangle && theta<=180) || (theta>=180+data.firingangle &&theta<=360)){
            sineValues.push(Math.abs(x));
        }else if(theta >= 0 && theta<data.firingangle){
            sineValues.push(x*-1);
        }
        else if(theta > 180 && theta < 180+data.firingangle){
            sineValues.push(x);
        }
        theta+=1;
    }
}
   

    const ctx = document.getElementById("waveform");
    if(chart!==null) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets:[{
                label:"Single phase semi converter waveform",
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
}

function showCircuit(){
    chart.destroy();
    setReadings();
    output.classList.add("hide");
    simulation.classList.remove("hide");
}