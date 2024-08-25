const intro = document.querySelector(".intro"),
selectPlayerX = intro.querySelector(".player-options .player-X"),
selectPlayerO = intro.querySelector(".player-options .player-O"),
playSection = document.querySelector(".play-section"),
playersTurn = document.querySelector(".players-turn"),
sectionBox = document.querySelectorAll("section span"),
gameResult = document.querySelector(".game-result"),
resultText = gameResult.querySelector(".result-text"),
replayBtn = gameResult.querySelector("button");

window.onload = () => { //once window loaded
    for (let i = 0; i < sectionBox.length; i++) { 
       sectionBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectPlayerX.onclick = () => {
    intro.classList.add("hide"); 
    playSection.classList.add("show"); 
}

selectPlayerO.onclick = () => { 
    intro.classList.add("hide"); 
    playSection.classList.add("show"); 
    playersTurn.setAttribute("class", "players-turn active player"); 
}

let playerXIcon = "fas fa-times"; 
let playerOIcon = "far fa-circle"; 
let playerIcon = "X"; 
let computer = true; 

// user click function
function clickedBox(element){
    if(playersTurn.classList.contains("player")){
        playerIcon = "O"; 
        element.innerHTML = `<i class="${playerOIcon}"></i>`; 
        element.style.color = "red";
        playersTurn.classList.remove("active"); 
        element.setAttribute("id", playerIcon); 
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; 
        element.style.color = "blue";
        element.setAttribute("id", playerIcon); 
        playersTurn.classList.add("active"); 
    }
    winnerSelect(); 
    element.style.pointerEvents = "none"; 
    playSection.style.pointerEvents = "none"; 
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(); 
    setTimeout(() => {
        machine(computer); 
    }, randomTimeDelay); 
}

function machine(){
    let array = []; 
    if(computer){ 
        playerIcon = "O"; 
        for (let i = 0; i < sectionBox.length; i++) {
            if(sectionBox[i].childElementCount == 0){ 
                array.push(i); 
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; 
        if(array.length > 0){ 
            if(playersTurn.classList.contains("player")){ 
                playerIcon = "X"; 
                sectionBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; 
                sectionBox[randomBox].style.color = "blue";
                sectionBox[randomBox].setAttribute("id", playerIcon); 
                playersTurn.classList.add("active"); 
            } else {
                sectionBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; 
                sectionBox[randomBox].style.color = "red";
                playersTurn.classList.remove("active"); 
                sectionBox[randomBox].setAttribute("id", playerIcon); 
            }
            winnerSelect(); 
        }
        sectionBox[randomBox].style.pointerEvents = "none"; 
        playSection.style.pointerEvents = "auto"; 
        playerIcon = "X"; 
    }
}

function classValue(classname){
    return document.querySelector(".square-" + classname).id; 
}
function icon(value1, value2, value3, icon){ 
    if(classValue(value1) == icon && classValue(value2) == icon && classValue(value3) == icon){
        return true;
    }
}
function winnerSelect() { 
    if(icon(1,2,3,playerIcon) || icon(4,5,6, playerIcon) || icon(7,8,9, playerIcon) || icon(1,4,7, playerIcon) || icon(2,5,8, playerIcon) || icon(3,6,9, playerIcon) || icon(1,5,9, playerIcon) || icon(3,5,7, playerIcon)){
        computer = false; 
        machine(computer); 
        setTimeout(() => { 
            gameResult.classList.add("show");
            playSection.classList.remove("show");
        }, 700); //1s = 1000ms
        resultText.innerHTML = `Player <p>${playerIcon}</p> wins!!`; 
    } else { 
        if(classValue(1) != "" && classValue(2) != "" && classValue(3) != "" && classValue(4) != "" && classValue(5) != "" && classValue(6) != "" && classValue(7) != "" && classValue(8) != "" && classValue(9) != ""){
            computer = false; 
            machine(computer); 
            setTimeout(() => { 
                gameResult.classList.add("show");
                playSection.classList.remove("show");
            }, 700); //1s = 1000ms
            resultText.textContent = "Match has been drawn!"; 
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); //reload the current page on replay button click
}
