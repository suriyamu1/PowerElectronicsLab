const output = document.getElementById("output");
const simulation = document.getElementById("simulation");
const alpha1 = document.getElementById("alpha1");
const alpha2 = document.getElementById("alpha2");
const angleDisplay1 = document.getElementById("angleDisplay1");
const angleDisplay2 = document.getElementById("angleDisplay2");
const avgDisplay = document.getElementById("avgDisplay");
const rmsDisplay = document.getElementById("rmsDisplay");

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
    // let avg = ((2*data.voltage)/Math.PI)*(calculateCos(angle));
    // avgDisplay.innerHTML=avg.toPrecision(5)+" V";
    // // console.log(avg);
    // let rms = (data.voltage/Math.sqrt(2*Math.PI))*Math.sqrt(Math.PI-( (Math.PI / 180) * angle)+(calculateSine(angle)/2));
    // rmsDisplay.innerHTML=rms.toPrecision(5)+" V";
    // // console.log(rms);
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
