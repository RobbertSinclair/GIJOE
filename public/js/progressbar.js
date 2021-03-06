const  Btnprevious  =  document.getElementById('tutorialBack');
const  Btnnext  =  document.getElementById('tutorialForward');
// const  Btnsubmit  =  document.getElementById('Submit');
const pb = document.getElementById("pb");
const progressbar = document.getElementById("pbsection");


let current = 0;
const max = tutorialFiles+1;
// let barLength = bullets.style.


Btnnext.addEventListener('click',  ()  =>  {
    const  bullets  =  [...document.querySelectorAll('.bullets')];

    if(current != max && (tutorialFiles>2 && tutorialFiles<11)){
        bullets[current].classList.add('completed');
        let currentX = bullets[current].getBoundingClientRect().left;
        let nextX = bullets[current+1].getBoundingClientRect().left;
        let lineWidth = nextX - currentX - 36; 
    
        // Create a new element to add
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.width = lineWidth + "px";
    
        // Insert the created element
        bullets[current].appendChild(line);

        bullets[current].classList.remove('currentstep');
        bullets[current+1].classList.add('currentstep');
    }

    current  +=  1;

    progressBarAlt.innerHTML = `${current+1} / ${tutorialFiles}`;

    Btnprevious.style.display  =  'inline';
});

Btnprevious.addEventListener('click',  ()  =>  {    
    const  bullets  =  [...document.querySelectorAll('.bullets')];

    if(current!=max+1 && (tutorialFiles>2 && tutorialFiles<11)){
        //get rid of completed line
        let test = bullets[current-1].childNodes[1];
        test.remove();

        //add empty progress line
        let currentX = bullets[current].getBoundingClientRect().left;
        let prevX = bullets[current-1].getBoundingClientRect().left;
        let lineWidth = currentX - prevX - 36; 
    
        // Create a new element to add
        const line = document.createElement("div");
        line.classList.add("emptyline");
        line.style.width = lineWidth + "px";
    
        bullets[current - 1].appendChild(line);

        bullets[current].classList.remove('currentstep');
    }
    
    if(tutorialFiles>2 && tutorialFiles<11){

        bullets[current - 1].classList.add('currentstep');
        bullets[current - 1].classList.remove('completed');
    }

    current  -=  1;

    progressBarAlt.innerHTML = `${current+1} / ${tutorialFiles}`;

});

function addPb(){

    if(tutorialFiles<2){
        progressBarAlt.classList.add("hidden");
        progressbar.classList.add("hidden");
    }
    else if(tutorialFiles<11){
        progressBarAlt.classList.add("hidden");

        let step = "";

        for(let i = 0; i<tutorialFiles; i++){
            step = step + "<div class=\"step\"><div class=\"bullets\">" + (i+1) + "</div></div>";
        }
    
        pb.innerHTML = step;
    }
    else {
        progressBarAlt.innerHTML = `${current+1} / ${tutorialFiles}`;
        progressbar.classList.add("hidden");
        progressBarAlt.classList.remove("hidden");
    }

}

function addEmptyLines(){
    const  bullets  =  [...document.querySelectorAll('.bullets')];

    for(let i = 0; i < bullets.length-1; i++){
        //add empty progress line
        let currentX = bullets[i].getBoundingClientRect().left;
        let nextX = bullets[i+1].getBoundingClientRect().left;
        let lineWidth = nextX - currentX - 24; 
    
        // Create a new element to add
        const line = document.createElement("div");
        line.classList.add("emptyline");
        line.style.width = lineWidth + "px";
    
        bullets[i].appendChild(line);
    }
    
    bullets[0].classList.add('currentstep');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

addPb();
sleep(5).then(addEmptyLines);

