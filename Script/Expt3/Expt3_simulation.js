const output = document.getElementById("output");
const simulation = document.getElementById("simulation");
const avgDisplay = document.getElementById("avgDisplay");
const rmsDisplay = document.getElementById("rmsDisplay");
const voltageDisplay = document.getElementById("voltageDisplay");
const pwmCircuit = document.getElementById("PWM");

let chart1=null;
let chart2=null;
let chart3=null;

const data={
    referenceValue:12,
    voltage:30
}

reference.oninput=()=>{
    data.referenceValue=Number(reference.value);
    voltageDisplay.innerHTML= data.referenceValue+" V";
    showGraph();
}

function showGraph(){
    let triangleValues=[];
    let referenceValues=[];
    let comparatorValues=[];
    let outputValues=[];
    let labelValue=[];
    let theta=0;

    for(let i=0; i<=100; i++){
        labelValue.push(i+"");
    }

    for(let i=0;i<=100;i++){
        theta=theta%20;
        if(theta<=5){
            triangleValues.push(2.4*theta);
        }else if(theta>5 && theta<=15){
            triangleValues.push(24-(2.4*theta));
        }else if(theta>15 && theta<=20){
            triangleValues.push((2.4*theta)-48);
        }
        theta+=1;
        referenceValues.push(data.referenceValue);
    }

    for(let i=0;i<=100;i++){
        if(triangleValues[i]<=data.referenceValue){
            comparatorValues.push(12);
            outputValues.push(data.voltage);
        }
        else{
            comparatorValues.push(0);
            outputValues.push(0);
        }
    }

    const ctx1 = document.getElementById("waveform1");
    if(chart1!==null) chart1.destroy();
    chart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            datasets:[{
                label:"Carrier Signal",
                lineTension:0.17,
                backgroundColor:"rgba(255, 121, 121,1.0)",
                borderColor:"#2E0249",
                data:triangleValues
            },{
                label:"Reference Signal",
                backgroundColor:"rgba(255, 121, 121,1.0)",
                borderColor:"#DC0000",
                data:referenceValues
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
                        text:"time(milliseconds)",
                        font: {
                            size: 15
                        }
                    }
                }
            }
        }
    });

    const ctx2 = document.getElementById("waveform2");
    if(chart2!==null) chart2.destroy();
    chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            datasets:[{
                label:"Comparator Output",
                lineTension:0.17,
                backgroundColor:"rgba(255, 121, 121,1.0)",
                borderColor:"#2E0249",
                data:comparatorValues
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
                        text:"time(milliseconds)",
                        font: {
                            size: 15
                        }
                    }
                }
            }
        }
    });

    const ctx3 = document.getElementById("waveform3");
    if(chart3!==null) chart3.destroy();
    chart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            datasets:[{
                label:"DC Chopper Output",
                lineTension:0.17,
                backgroundColor:"rgba(255, 121, 121,1.0)",
                borderColor:"#2E0249",
                data:outputValues
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
                        text:"time(milliseconds)",
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

function showCircuit1(){
    chart1.destroy();
    chart2.destroy();
    chart3.destroy();
    output.classList.add("hide");
    simulation.classList.remove("hide");
}

function showPwm(){
    pwmCircuit.classList.remove("hide");
    simulation.classList.add("hide");
}

function showCircuit2(){
    pwmCircuit.classList.add("hide");
    simulation.classList.remove("hide");
}

