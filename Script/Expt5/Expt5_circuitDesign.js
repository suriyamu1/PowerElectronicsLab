window.onload = function() {
    if(localStorage.getItem("inputVolt")!=null) {
        localStorage.removeItem("inputVolt");
    }
}

const inputVoltSlider = document.getElementById("inputVoltSlider");
const commVoltSlider = document.getElementById("commVoltSlider");
const gateVoltSlider = document.getElementById("gateVoltSlider");
const gateResSlider = document.getElementById("gateResSlider");
const loadResSlider =document.getElementById("loadResSlider");

const inputVoltSpan = document.getElementById("inputVoltSpan");
const commVoltSpan = document.getElementById("commVoltSpan");
const gateVoltSpan = document.getElementById("gateVoltSpan");
const gateResSpan = document.getElementById("gateResSpan");
const loadResSpan = document.getElementById("loadResSpan");

const scr1 = document.getElementById("scr1");
const scr2 = document.getElementById("scr2");
const diode1 = document.getElementById("diode1");
const capacitor = document.getElementById("capacitor");
const inductor = document.getElementById("inductor");
const ammeter = document.getElementById("ammeter");
const voltmeter = document.getElementById("voltmeter");

const exp_div2 = document.getElementById("exp_div2");

const crct_img_div = document.getElementById("crct_img_div");
const wrong_img_div = document.getElementById("wrong_img_div");


inputVoltSlider.oninput = () => {
    inputVoltSpan.innerHTML = inputVoltSlider.value + "V DC";
    verification();
}
commVoltSlider.oninput = () => {
    commVoltSpan.innerHTML = commVoltSlider.value + "V DC";
    verification();
}
gateVoltSlider.oninput = () => {
    gateVoltSpan.innerHTML = gateVoltSlider.value + "V DC";
    verification();
}
gateResSlider.oninput = () => {
    gateResSpan.innerHTML = gateResSlider.value +" &#8486;";
    verification();
}
loadResSlider.oninput = () => {
    loadResSpan.innerHTML = loadResSlider.value +" &#8486;";
    verification();
}
function verification() {
    // this is to avoid the display of the images if the display is enabled by the below code.
    wrong_img_div.style.display = "none";
    crct_img_div.style.display = "none";
    
    let vinMax = inputVoltSlider.value;
    let i_max = vinMax / loadResSlider.value;
    let i_gate = gateVoltSlider.value / gateResSlider.value;
    
    //displaying output voltage, load current and load resistance values
    exp_div2.innerHTML = 
        "<h3 class='glassmorphism'>The output voltage (V<sub>in</sub>) = "+vinMax+"V<br>"+
        "The load current (I<sub>L</sub>) = "+ vinMax+"V / " + loadResSlider.value+"&#8486; = "+ i_max.toFixed(3)+"A<br>" +
        "The gate current (I<sub>g</sub>) = V<sub>g</sub>/R<sub>g</sub> = "+ gateVoltSlider.value +"/"+gateResSlider.value+" = "+ i_gate.toFixed(3)+"A</h3>";

    // alert message for choosing proper LOAD RESISTANCE
    if(i_max > 6 && i_max < 10) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The components (SCRs, diodes, load) can only withstand a load current upto 6A. Hence increase the load resistance or decrease the input voltage!";
        wrong_img_div.style.display = "block";
        return;
    }
    if(i_max >= 10) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The load current is dangerously high and it can damage the components. Increase the value of load resistance or decrease the input voltage!</h3>";
        wrong_img_div.style.display = "block";
        return;
    }
    exp_div2.innerHTML += "<h3 class='ok_green'>The value of load resistance is chosen correctly (Load current < 6A)</h3>";

    // CHOOSING AND VERIFICATION OF MAIN SCR
    if(scr1.value == "Choose...") {
        exp_div2.innerHTML += "<h2>You have not chosen the Main SCR</h2>";
        return;
    }
    if(verify_PIV("Main SCR",scr1.value, vinMax)==false)   return;
    if(verify_i_max("Main SCR",scr1.value, i_max)==false) return;

    // CHOOSING AND VERIFICATION OF AUX SCR
    if(scr2.value == "Choose...") {
        exp_div2.innerHTML += "<h2>You have not chosen the Auxiliary SCR</h2>";
        return;
    }
    if(verify_PIV("Auxiliary SCR",scr2.value, vinMax)==false)   return;
    if(verify_i_max("Auxiliary SCR",scr2.value, i_max)==false) return;
    exp_div2.innerHTML += "<h3 class='ok_green'>You have chosen the Main and Auxiliary SCR correctly!!</h3>";

    // VERIFICATION OF MAIN SCR GATE CURRENT
    if (verify_i_gate("Main SCR",scr1.value, i_gate)==false)  return;
    exp_div2.innerHTML += "<h3 class='ok_green'>You have designed the firing circuit correctly!!<br>(Gate current is within acceptable limits)</h3>";

    // VERIFICATION OF AMMETER
    if(ammeter.value == "Choose...") {
        exp_div2.innerHTML += "<h2>Choose an appropriate ammeter!!</h2>";
        return;
    }
    if(meter_type(ammeter.value)=="Iron") {
        exp_div2.innerHTML += "<h3 class='alert_red'>The load current of a DC circuit is also DC. Hence use a Moving Coil Ammeter</h3>";
        wrong_img_div.style.display = "block";
        return;
    }
    if(rated_i(ammeter.value) < i_max) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The current rating of the chosen ammeter ("+rated_i(ammeter.value)+"A) is lesser than the maximum load current ("+ i_max.toFixed(2)+"A). Hence this ammeter cannot be chosen.</h3>";
        wrong_img_div.style.display = "block";
        return;
    }
    exp_div2.innerHTML += "<h3 class='ok_green'>The ammeter is chosen correctly.</h3>";

    // VERIFICATION FOR VOLTMETER
    if(voltmeter.value == "Choose...") {
        exp_div2.innerHTML += "<h2>Choose an appropriate voltmeter!!</h2>";
        return;
    }
    if(meter_type(voltmeter.value)=="Iron") {
        exp_div2.innerHTML += "<h3 class='alert_red'>Since the output voltage of a DC circuit  is also DC, use a Moving Coil Voltmeter</h3>";
        wrong_img_div.style.display = "block";
        return;
    }
    if(rated_v(voltmeter.value) < vinMax) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The voltage rating of the chosen voltmeter ("+rated_v(voltmeter.value)+"V) is lesser than the output voltage ("+ vinMax+"V). Hence this voltmeter cannot be chosen.</h3>";
        wrong_img_div.style.display = "block";
        return;
    }
    exp_div2.innerHTML += "<h3 class='ok_green'>The voltmeter is chosen correctly.</h3>";
    
    // VERIFICATION OF CAPACITOR AND INDUCTOR
    if(capacitor.value == "Choose...") {
        exp_div2.innerHTML += "<h2>Choose an appropriate capacitor!!</h2>";
        return;
    }
    if(inductor.value == "Choose...") {
        exp_div2.innerHTML += "<h2>Choose an appropriate inductor!!</h2>";
        return;
    }
    let l = fetchLCVal(inductor);
    let c = fetchLCVal(capacitor);
    let peakResonantCurrent = vinMax * Math.pow(c/l,0.5); // Ip = Vs * sqrt(C/L)
    if(peakResonantCurrent > get_i_max(scr1.value)) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The peak resonant current of the RC circuit, I<sub>p</sub> = V<sub>in</sub> * sqrt(L/C) <br> Therefore, I<sub>p</sub> = "+ vinMax+" * sqrt(" + inductor.value+"/"+ capacitor.value+") = "+peakResonantCurrent.toFixed(3)+"A. "
                           + "<br>I<sub>p</sub> should be lesser than the max. anode current ("+ get_i_max(scr1.value)+"A) of the SCRs.</h3>";
        wrong_img_div.style.display = "block";
        return;
    }
    exp_div2.innerHTML += "<h3 class='ok_green'>I<sub>p</sub> = V<sub>in</sub> * sqrt(L/C) = "+ vinMax+" * sqrt(" + inductor.value+"/"+ capacitor.value+") = "+peakResonantCurrent.toFixed(3)+"A. "
                           + "<br>I<sub>p</sub> ("+peakResonantCurrent.toFixed(3)+"A) is lesser than the max. anode current ("+ get_i_max(scr1.value)+"A) of the SCRs."
                           + "<br>Your design is correct!!</h3>";
    crct_img_div.style.display = "block";

    expt5Values = {
        inputVoltage: vinMax,
        loadCurrent: i_max,
        commVoltage: commVoltSlider.value,
        gateVoltage: gateVoltSlider.value,
        gateResistor: gateResSlider.value,
        gateCurrent: i_gate,
        loadResistor: loadResSlider.value
    };
    localStorage.setItem("expt5Values",JSON.stringify(expt5Values));
}

function fetchLCVal(component) {
    let val = component.value;
    if(val=="3.3 nF")
        return 3.3 * (Math.pow(10,-9));
    else if(val=="22 nF")
        return 22 * (Math.pow(10,-9));
    else if(val=="33 nF")
        return 33 * (Math.pow(10,-9));
    else if(val=="44 nF")
        return 44 * (Math.pow(10,-9));
    else if(val=="500 uH")
        return 500 * (Math.pow(10,-6));
    else if(val=="750 uH")
        return 750 * (Math.pow(10,-6));
    else if(val=="1 mH")
        return Math.pow(10,-3);
    else
        return -1;
}

function get_PIV(component) {
    if(component == "S4S1" || component == "H2P4M" || component == "1N4004")
        return 400;
    if(component == "S6004V" || component == "CMF01" || component == "PSC406")
        return 600;
    if(component == "SK006L" || component == "6A10")
        return 1000;
    return -1;
}

function get_i_max(component) {
    if(component == "S4S1")
        return 0.8;
    if(component == "1N4004")
        return 1;
    if(component == "H2P4M" || component == "CMF01")
        return 2;
    if(component == "S6004V" || component == "PSC406")
        return 4;
    if(component == "SK006L" || component == "6A10")
        return 6;
    return -20;
}

function verify_PIV(name, component, vinMax) {
    if(get_PIV(component) < vinMax) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The PIV of "+ name + " ("+ component +") is only "+get_PIV(component)+"V. Hence "+name+" cannot withstand the input voltage ("+vinMax+"V)</h3>";
        wrong_img_div.style.display = "block";
        return false;
    }
    return true;
}

function verify_i_max(name, component, i_max) {
    if(get_i_max(component) < i_max) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The maximum forward current of "+ name + " ("+ component +") is only "+get_i_max(component)+"A. Hence "+name+" cannot withstand the load current ("+i_max.toFixed(3)+"A)</h3>";
        wrong_img_div.style.display = "block";
        return false;
    }
    return true;
}

function verify_i_gate(name, component, i_gate) {
    if(i_gate==0) {
        exp_div2.innerHTML += "<h3 class='alert_red'>Gate current cannot be zero!!</h3>";
        return false;
    }
    if(maxGateCurrent(component) < i_gate) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The maximum gate current of "+ name + " ("+ component +") is only "+maxGateCurrent(component)+"A. Hence "+name+" cannot withstand the gate current ("+i_gate.toFixed(3)+"A)"+
        "<br>(Hint: Increase gate resistance or decrease gate voltage)</h3>";
        wrong_img_div.style.display = "block";
        return false;
    }
    return true;
}

function maxGateCurrent(scrName) {
    if(scrName=="S4S1" || scrName=="S6004V")
        return 1;
    if(scrName=="H2P4M")
        return 0.2;
    if(scrName=="SK006L")
        return 2;
}

function rated_i(ammeter_name) {
    if(ammeter_name == "(0 - 2A) Moving Coil" || ammeter_name == "(0 - 2A) Moving Iron")     
        return 2;
    if(ammeter_name == "(0 - 5A) Moving Coil" || ammeter_name == "(0 - 5A) Moving Iron")
        return 5;
    if(ammeter_name == "(0 - 7.5A) Moving Coil" || ammeter_name == "(0 - 7.5A) Moving Iron")
        return 7.5;
    return -5;
} 

function rated_v(voltmeter_name) {
    if(voltmeter_name == "(0-200V) Moving Coil" || voltmeter_name == "(0-200V) Moving Iron")
        return 200;
    if(voltmeter_name == "(0-500V) Moving Coil" || voltmeter_name == "(0-500V) Moving Iron")
        return 500;
    if(voltmeter_name == "(0-750V) Moving Coil" || voltmeter_name == "(0-750V) Moving Iron")
        return 750;
    return -10;
} 

function meter_type(component_name) {
    let len = component_name.length;
    return component_name.substring(len-4, len); //returns "Coil" or "Iron"
}