const switchBtn = document.getElementById("switching");
const circuitImage = document.getElementById("circuitImage");
const waveformImage = document.getElementById("waveformImage");
const explanationText = document.getElementById("explanationText");
const explanation = [``,``];
explanation[1] =    `<ul>
                        <li><b>Switch:</b> Turned ON</li>
                        <li><b>Diode:</b> Reverse biased (does not conducts)</li>
                        <li>Load is directly connected to the source, so <b>Output voltage (V<sub>o</sub>) = Input voltage (V<sub>s</sub>)</b></li>
                        <li>The <b>load current (I<sub>o</sub>) gradually increases</b> and charges the inductor (L) element in the load.</li>
                    </ul>`;

explanation[2] =    `<ul>
                        <li><b>Switch:</b> Turned OFF</li>
                        <li><b>Diode:</b> Forward biased (conducts load current through it)</li>
                        <li>Load is disconnected from the source, so <b>Output voltage (V<sub>o</sub>) = Voltage across diode = 0V</b></li>
                        <li>The inductor current flows from negative terminal of load through the freewheeling diode and reaches positive terminal of load. The <b>load current = inductor current</b>. The load current gradually decreases as inductor discharges.</li>    
                    </ul>`;

function toggleSwitch() {
    // default state
    if(switchBtn.innerText=="Turn OFF the switch") {
        // now switch is OFF
        switchBtn.innerText = "Turn ON the switch";
        explanationText.innerHTML = explanation[2];
        circuitImage.src = "../../Assets/Images/TheoryPage_Images/DC_Chopper/circuit_switching2.PNG";
        waveformImage.src = "../../Assets/Images/TheoryPage_Images/DC_Chopper/waveform_switching2.PNG";
    }
    else {
        switchBtn.innerText = "Turn OFF the switch";
        explanationText.innerHTML = explanation[1];
        circuitImage.src = "../../Assets/Images/TheoryPage_Images/DC_Chopper/circuit_switching1.PNG";
        waveformImage.src = "../../Assets/Images/TheoryPage_Images/DC_Chopper/waveform_switching1.PNG";
    }
}