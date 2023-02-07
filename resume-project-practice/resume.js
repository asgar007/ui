// ---------------------- scrolling start -------------------------
var navMenuAnchorTags = document.querySelectorAll('.nav-menu a'); // it gives list of all anchor tags
// console.log(navMenuAnchorTags);
var interval;
for(let i=0; i<navMenuAnchorTags.length; i++){
    navMenuAnchorTags[i].addEventListener('click', function(event){
        event.preventDefault();//since anchor tag has default redirecting feature so its need to disable first
        //get section IDs , this is the current section clicked
        var targetSectionID = this.textContent.trim().toLowerCase();
        // console.log(targetSectionID);
        var targetSection = document.getElementById(targetSectionID);
        // console.log(targetSection);
        
        //you can not pass as scrollVertivcally(targetsSection) but as below

        // interval = setInterval(scrollVertically, 10, targetSection);  //or
        interval = setInterval(function(){
            scrollVertically(targetSection);
        }, 10);
        
    });
}
function scrollVertically(targetSection){
    // figure out coordinates of target section
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    //scroll untill
    if(targetSectionCoordinates.top <= 0){
        clearInterval(interval);
        return;
    }
    window.scrollBy(0,20);
}
// ---------------------- scrolling end -------------------------

// ---------------------- autoskill filling start -------------------------
/* 
handle scroll event on window
check skill container visible or not
ensure initial color width is zero
start animatiom 0-> required
Store skill level -> HTML with the help of data attribute
*/
var progressBars = document.querySelectorAll('.skill-progress > div');
var skillContainer = document.getElementById('skill-part')
window.addEventListener('scroll', checkScroll);
var animationDone = false; // this boolean is being used to fire animation once otherwise it would trigger function multiple times

// initially i want to have empty bar
initialiseBars();

function initialiseBars(){
    for(let bar of progressBars){
        bar.style.width = 0 + '%';
    }
}

function checkScroll(){
    //check whether skill container is visible or not
    var coordinates = skillContainer.getBoundingClientRect();
    if(!animationDone && coordinates.top <= window.innerHeight){ // innerheight gives viewport height
        console.log("triggerd");
        animationDone = true;
        fillBars();
    }
    else if(coordinates.top > window.innerHeight){// for animation to fire again and again after reaching to skill section
        animationDone = false;
        initialiseBars();
    }
}

function fillBars(){
    for(let bar of progressBars){
        let targetWidth = bar.getAttribute('data-bar-width');
        let currentWidth = 0;
        let interval = setInterval(function(){
            if(currentWidth > targetWidth){
                clearInterval(interval);
                return;
            }
            currentWidth++;
            bar.style.width = currentWidth + '%';
        },10)
    }
}