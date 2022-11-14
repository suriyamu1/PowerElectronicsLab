const output = document.getElementById("output");
const simulation = document.getElementById("simulation");
const alpha = document.getElementById("alpha");
const angleDisplay = document.getElementById("angleDisplay");
const avgDisplay = document.getElementById("avgDisplay");
const rmsDisplay = document.getElementById("rmsDisplay");
// const component1 = document.getElementById("component1");
// const component2 = document.getElementById("component2");
// const component3 = document.getElementById("component3");
// const component4 = document.getElementById("component4");

let angle=0;

const data ={
    firingangle :angle,
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

alpha.oninput=()=>{
    angle=Number(alpha.value);
    data.firingangle=angle;
    angleDisplay.innerHTML=angle+"&#176;";
    let avg = ((2*data.voltage)/Math.PI)*(calculateCos(angle));
    avgDisplay.innerHTML=avg.toPrecision(5)+" V";
    console.log(avg);
    let rms = (data.voltage/Math.sqrt(2*Math.PI))*Math.sqrt(Math.PI-( (Math.PI / 180) * angle)+(calculateSine(angle)/2));
    rmsDisplay.innerHTML=rms.toPrecision(5)+" V";
    console.log(rms);
    showGraph();
}

let chart=null;

function showGraph(){

    let sineValues=[];
    let labelValue=[];
    let theta=0;

    for(let i=0; i<=720; i++){
        labelValue.push(i+"");
    }

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

function showOutput(){
    console.log(verification);
    // console.log(component1.value);
    if(count===7 && verification===true){
        showGraph();
        output.classList.remove("hide");
        simulation.classList.add("hide");
    }else{
        alert("Your Circuit is wrong");
        location.reload();
    }
    
}

function showCircuit(){
    chart.destroy();
    output.classList.add("hide");
    simulation.classList.remove("hide");
}

