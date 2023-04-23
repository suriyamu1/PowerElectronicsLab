const voltSlider = document.getElementById("voltSlider");
const resSlider = document.getElementById("resSlider");
const inductSlider = document.getElementById("inductSlider");

const voltSpan = document.getElementById("voltSpan");
const resSpan = document.getElementById("resSpan");
const inductSpan = document.getElementById("inductSpan");

const scr1 = document.getElementById("scr1");
const scr2 = document.getElementById("scr2");
const diode1 = document.getElementById("diode1");
const diode2 = document.getElementById("diode2");

const ammeter = document.getElementById("ammeter");
const voltmeter = document.getElementById("voltmeter");

const exp_div2 = document.getElementById("exp_div2");

const crct_img_div = document.getElementById("crct_img_div");
const wrong_img_div = document.getElementById("wrong_img_div");

voltSlider.oninput = () => {
    voltSpan.innerHTML = voltSlider.value + "V AC";
    verification();
}
resSlider.oninput = function(){
    resSpan.innerHTML = this.value + " &#8486;";
    verification();
}
inductSlider.oninput = () => {
    inductSpan.innerHTML = inductSlider.value + " mH";
    verification();
}

function verification() {
    // this is to avoid the display of the images if the display is enabled by the below code.
    wrong_img_div.style.display = "none";
    crct_img_div.style.display = "none";

    let v_max = (voltSlider.value)*Math.sqrt(2);
    let i_max = v_max / resSlider.value;
    
    //displaying peak voltage and max load current values
    exp_div2.innerHTML = "<h3 class='glassmorphism'>The peak voltage (V<sub>max</sub>) = V<sub>rms</sub> x 1.414 = "+v_max.toFixed(2)+"V<br>The max load current (I<sub>L</sub>) = "+ v_max.toFixed(2)+"V / " + resSlider.value+"&#8486; = "+ i_max.toFixed(3)+"A </h3>";

    // alert message for choosing proper LOAD RESISTANCE
    if(i_max > 6 && i_max < 10) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The components (SCRs, diodes, load) can only withstand a load current upto 6A. Hence increase the load resistance!";
        wrong_img_div.style.display = "block";
        return;
    }
    if(i_max >= 10) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The load current is dangerously high and it can damage the components. Increase the value of load resistance!</h3>";
        wrong_img_div.style.display = "block";
        return;
    }
    exp_div2.innerHTML += "<h3 class='ok_green'>The value of load resistance is chosen correctly.</h3>";

    // CHOOSING SCRS
    scr_values = [scr1.value, scr2.value, scr3.value, scr4.value];

    flag = 4;
    for(i=0; i<4; i++) {
        if(scr_values[i] == "Choose...") {
            exp_div2.innerHTML += "<h2>You have not chosen SCR-"+ (i+1) +"</h2>";
        }
        else {
            flag--;
        }
    }
    if(flag !== 0) {
        //this means all the SCR dropdowns are not chosen
        return;
    }

    // VERIFICATION FOR ALL 4 SCRs
    for(i=0; i<4; i++) {
        let name_text = "SCR"+(i+1);
        if(verify_PIV(name_text,scr_values[i], v_max)==false)   return;
        if(verify_i_max(name_text,scr_values[i], i_max)==false) return;
    }
    exp_div2.innerHTML += "<h3 class='ok_green'>All the SCRs are chosen correctly !!</h3>";

    // VERIFICATION OF AMMETER
    if(ammeter.value == "Choose...") {
        exp_div2.innerHTML += "<h2>Choose an appropriate ammeter!!</h2>";
        return;
    }

    if(rated_i(ammeter.value) < i_max) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The current rating of the chosen ammeter ("+rated_i(ammeter.value)+"A) is lesser than the maximum load current ("+ i_max.toFixed(2)+"A). Hence this ammeter cannot be chosen.</h3>";

        if(meter_type(ammeter.value)=="Iron") {
            exp_div2.innerHTML += "<h3 class='alert_red'>Since SCRs and diodes are unidirectional devices. They block reverse current. Hence the load current will be pulsating DC current. Hence use a Moving Coil Ammeter</h3>";
        }
        wrong_img_div.style.display = "block";
        return;
    }
    
    if(rated_i(ammeter.value) > i_max) {
        if(meter_type(ammeter.value)=="Iron") {
            exp_div2.innerHTML += "<h3 class='alert_red'>Since SCRs and diodes are unidirectional devices. They block reverse current. Hence the load current will be pulsating DC current. Hence use a Moving Coil Ammeter</h3>";
            wrong_img_div.style.display = "block";
            return;
        }
    }
    exp_div2.innerHTML += "<h3 class='ok_green'>The ammeter is chosen correctly.</h3>";

    // VERIFICATION FOR VOLTMETER
    if(voltmeter.value == "Choose...") {
        exp_div2.innerHTML += "<h2>Choose an appropriate voltmeter!!</h2>";
        return;
    }

    if(rated_v(voltmeter.value) < v_max) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The voltage rating of the chosen voltmeter ("+rated_v(voltmeter.value)+"V) is lesser than the peak output voltage ("+ v_max.toFixed(2)+"V). Hence this voltmeter cannot be chosen.</h3>";

        if(meter_type(voltmeter.value)=="Iron") {
            exp_div2.innerHTML += "<h3 class='alert_red'>Since the output of a semi converter (controlled rectifier) is pulsating DC, use a Moving Coil Voltmeter</h3>";
        }
        wrong_img_div.style.display = "block";
        return;
    }
    
    if(rated_v(voltmeter.value) > v_max) {
        if(meter_type(voltmeter.value)=="Iron") {
            exp_div2.innerHTML += "<h3 class='alert_red'>Since the output of a semi converter (controlled rectifier) is pulsating DC, use a Moving Coil Voltmeter</h3>";
            wrong_img_div.style.display = "block";
            return;
        }
    }
    crct_img_div.style.display = "block";
    exp_div2.innerHTML += "<h3 class='ok_green'>The voltmeter is chosen correctly.</h3>";

    let expt2Values = {
        inputVoltageRMS: voltSlider.value,
        loadResistance: resSlider.value,
        loadCurrentRMS: voltSlider.value/resSlider.value,
        peakInputVoltage: v_max,
        peakLoadCurrent: i_max,
        scrNames: scr_values,
        ammeterName: ammeter.value,
        voltmeterName: voltmeter.value,
        loadInductance: inductSlider.value
    }
    localStorage.setItem("expt2_values",JSON.stringify(expt2Values));
    console.log(expt2Values);
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

function verify_PIV(name, component, v_max) {
    if(get_PIV(component) < v_max) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The PIV of "+ name + " ("+ component +") is only "+get_PIV(component)+"V. Hence "+name+" cannot withstand the peak input voltage when it is reverse biased ("+v_max.toFixed(2)+"V)</h3>";
        wrong_img_div.style.display = "block";
        return false;
    }
    return true;
}

function verify_i_max(name, component, i_max) {
    if(get_i_max(component) < i_max) {
        exp_div2.innerHTML += "<h3 class='alert_red'>The maximum forward current of "+name+" ("+ component +") is only "+get_i_max(component)+"A. Hence "+name+" cannot withstand the load current ("+i_max.toFixed(3)+"A)</h3>";
        wrong_img_div.style.display = "block";
        return false;
    }
    return true;
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