//This should really be a class tbh
const speedBumps = new Array("forward", "left", "right");
const slider = document.getElementById( "custom-handle" );

let isGoSlowOn = true;

function slowDownAt(codeBit, codeFragment){
    let delayTime = slider.innerHTML;
    let regex = new RegExp(codeBit, "gi"); //perform a global, case insensitive replacement

    let substitution = " await sleep(" + delayTime + "); " + codeBit;

    return codeFragment.replace(regex, substitution);  
}

function goSlowMode(codeFragment){
    if(isGoSlowOn){
        codeFragment = "async function code(){ " + codeFragment + " } code().catch(err => {alert});";
        for(let i = 0; i < speedBumps.length; i++){
            codeFragment = slowDownAt(speedBumps[i], codeFragment);
        }
    }
    return codeFragment;
}

function goSlowSwitch(){
    
    isGoSlowOn = !isGoSlowOn;

}