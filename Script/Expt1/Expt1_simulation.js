const output = document.getElementById("output");
const simulation = document.getElementById("simulation");
const alpha = document.getElementById("alpha");
const angleDisplay = document.getElementById("angleDisplay");

let angle=0;

const data ={
    firingangle :angle,
    voltage:30
}

alpha.oninput=()=>{
    angle=Number(alpha.value);
    data.firingangle=angle;
    angleDisplay.innerHTML=angle+"&#176;";
    showGraph();
}

let chart=null;

function showGraph(){

    function calculateSine(degrees) {
        var radians = (Math.PI / 180) * degrees;
        return Math.sin(radians);
    }

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

