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

const exp_div = document.getElementById("explanation_div");


voltSlider.oninput = () => {
    voltSpan.innerHTML = voltSlider.value + "V AC";
    verification();
};

resSlider.oninput = function(){
    resSpan.innerHTML = this.value + " &#8486;";
    verification();
}

inductSlider.oninput = () => {
    inductSpan.innerHTML = inductSlider.value + " mH";
    verification();
}








function verification() {
    let v_max = (voltSlider.value)*Math.sqrt(2);
    let i_max = v_max / resSlider.value;
    
    //displaying peak voltage and max load current values
    exp_div.innerHTML = "<h3>The peak voltage is "+v_max.toFixed(2)+"V. The maximum load current is "+ v_max.toFixed(2)+"V / " + resSlider.value+"&#8486; = "+ i_max.toFixed(3)+"A </h3>";

    // alert message for choosing proper LOAD RESISTANCE
    if(i_max > 6 && i_max < 10) {
        exp_div.innerHTML += "The components (SCRs, diodes, load) can only withstand a load current upto 6A. Hence increase the load resistance.";
        return;
    }
    if(i_max >= 10) {
        exp_div.innerHTML += "The load current is dangerously high and it can damage the components. Increase the value of load resistance!";
        return;
    }

    // alert message for not choosing SCRs from the drop-down
    if(scr1.value == "Choose..." || scr2.value == "Choose...") {
        exp_div.innerHTML += "Choose both the SCRs!";
        return;
    }

    //verification for SCR-1
    if(verify_PIV("SCR-1",scr1.value, v_max)==false)   return;
    if(verify_i_max("SCR-1",scr1.value, i_max)==false) return;

    //verification for SCR-2
    if(verify_PIV("SCR-2",scr2.value, v_max)==false)   return;
    if(verify_i_max("SCR-2",scr2.value, i_max)==false) return;

    // alert message for not choosing diodes from the drop-down
    if(diode1.value == "Choose..." || diode2.value == "Choose...") {
        exp_div.innerHTML += "Choose both the diodes!";
        return;
    }

    //verification for diode-1
    if(verify_PIV("Diode-1",diode1.value, v_max)==false)   return;
    if(verify_i_max("Diode-1",diode1.value, i_max)==false) return;

    //verification for diode-2
    if(verify_PIV("Diode-2",diode2.value, v_max)==false)   return;
    if(verify_i_max("Diode-2",diode2.value, i_max)==false) return;


    // verification for ammeter
    if(ammeter.value == "Choose...") {
        exp_div.innerHTML += "Choose an appropriate ammeter!!";
        return;
    }

    if(rated_i(ammeter.value) < i_max) {
        exp_div.innerHTML += "The current rating of the chosen ammeter ("+rated_i(ammeter.value)+"A) is lesser than the maximum load current ("+ i_max.toFixed(2)+"A). Hence this ammeter cannot be chosen.<br>";

        if(meter_type(ammeter.value)=="Iron") {
            exp_div.innerHTML += "Since SCRs and diodes are unidirectional devices. They block reverse current. Hence the load current will be pulsating DC current. Hence use a Moving Coil Ammeter";
        }
        return;
    }
    
    if(rated_i(ammeter.value) > i_max) {
        if(meter_type(ammeter.value)=="Iron") {
            exp_div.innerHTML += "Since SCRs and diodes are unidirectional devices. They block reverse current. Hence the load current will be pulsating DC current. Hence use a Moving Coil Ammeter";
        }
    }

    // verification for VOLTMETER
    if(voltmeter.value == "Choose...") {
        exp_div.innerHTML += "Choose an appropriate voltmeter!!";
        return;
    }

    if(rated_v(voltmeter.value) < v_max) {
        exp_div.innerHTML += "The voltage rating of the chosen voltmeter ("+rated_v(voltmeter.value)+"V) is lesser than the peak output voltage ("+ v_max.toFixed(2)+"V). Hence this voltmeter cannot be chosen.<br>";

        if(meter_type(voltmeter.value)=="Iron") {
            console.log(voltmeter.value);
            console.log(meter_type(voltmeter.value));
            exp_div.innerHTML += "Since the output of a semi converter (controlled rectifier) is pulsating DC, use a Moving Coil Voltmeter";
        }
        return;
    }
    
    if(rated_v(voltmeter.value) > v_max) {
        if(meter_type(voltmeter.value)=="Iron") {
            exp_div.innerHTML += "Since the output of a semi converter (controlled rectifier) is pulsating DC, use a Moving Coil Voltmeter";
        }
    }
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
    if(component == "H2P4M" || component == "CMF01" || component == "PSC406")
        return 2;
    if(component == "S6004V")
        return 4;
    if(component == "SK006L" || component == "6A10")
        return 6;
}

function verify_PIV(name, component, v_max) {
    if(get_PIV(component) < v_max) {
        exp_div.innerHTML += "The PIV of "+ name + " is only "+get_PIV(component)+"V. Hence "+name+" cannot withstand the peak input voltage when it is reverse biased ("+v_max.toFixed(2)+"V)";
        return false;
    }
    return true;
}

function verify_i_max(name, component, i_max) {
    if(get_i_max(component) < i_max) {
        exp_div.innerHTML += "The maximum forward current of "+name+" is only "+get_i_max(component)+"A. Hence "+name+" cannot withstand the load current ("+i_max.toFixed(3)+"A)";
        return false;
    }
    return true;
}

function rated_i(ammeter_name) {
    if(ammeter_name == "(0 - 2A) Moving Coil" || ammeter_name == "(0 - 2A) Moving Iron") {
        return 2;
    }
    if(ammeter_name == "(0 - 5A) Moving Coil" || ammeter_name == "(0 - 5A) Moving Iron") {
        return 5;
    }
    if(ammeter_name == "(0 - 7.5A) Moving Coil" || ammeter_name == "(0 - 7.5A) Moving Iron") {
        return 7.5;
    }
    return -5;
} 

function rated_v(voltmeter_name) {
    if(voltmeter_name == "(0-200V) Moving Coil" || voltmeter_name == "(0-200V) Moving Iron") {
        return 200;
    }
    if(voltmeter_name == "(0-500V) Moving Coil" || voltmeter_name == "(0-500V) Moving Iron") {
        return 500;
    }
    if(voltmeter_name == "(0-750V) Moving Coil" || voltmeter_name == "(0-750V) Moving Iron") {
        return 750;
    }
    return -10;
} 

function meter_type(component_name) {
    let len = component_name.length;
    //returns "Coil" or "Iron"
    return component_name.substring(len-4, len);
}