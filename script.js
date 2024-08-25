//I've tried to explain each JavaScript line with comments....Hope you'll understand

//selecting all required elements
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
    for (let i = 0; i < sectionBox.length; i++) { //add onclick attribute in all available span
       sectionBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectPlayerX.onclick = () => {
    intro.classList.add("hide"); //hide select box
    playSection.classList.add("show"); //show the playboard section
}

selectPlayerO.onclick = () => { 
    intro.classList.add("hide"); //hide select box
    playSection.classList.add("show"); //show the playboard section
    playersTurn.setAttribute("class", "players-turn active player"); //set class attribute in players with players active player values
}

let playerXIcon = "fas fa-times"; //class name of fontawesome cross icon
let playerOIcon = "far fa-circle"; //class name of fontawesome circle icon
let playerIcon = "X"; //this is a global variable beacuse we've used this variable inside multiple functions
let computer = true; //this also a global variable with boolen value..we used this variable to stop the bot once match won by someone or drawn

// user click function
function clickedBox(element){
    if(playersTurn.classList.contains("player")){
        playerIcon = "O"; //if player choose (O) then change playerSign to O
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element/box
        element.style.color = "red";
        playersTurn.classList.remove("active"); ///add active class in players
        element.setAttribute("id", playerIcon); //set id attribute in span/box with player choosen sign
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element/box
        element.style.color = "blue";
        element.setAttribute("id", playerIcon); //set id attribute in span/box with player choosen sign
        playersTurn.classList.add("active"); ///add active class in players
    }
    winnerSelect(); //calling selectWinner function
    element.style.pointerEvents = "none"; //once user select any box then that box can'be clicked again
    playSection.style.pointerEvents = "none"; //add pointerEvents none to playboard so user can't immediately click on any other box until bot select
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(); //generating random number so bot will randomly delay to select unselected box
    setTimeout(() => {
        machine(computer); //calling bot function
    }, randomTimeDelay); //passing random delay value
}

// bot auto select function
function machine(){
    let array = []; //creating empty array...we'll store unclicked boxes index
    if(computer){ //if runBot is true
        playerIcon = "O"; //change the playerSign to O so if player has chosen X then bot will O
        for (let i = 0; i < sectionBox.length; i++) {
            if(sectionBox[i].childElementCount == 0){ //if the box/span has no children means <i> tag
                array.push(i); //inserting unclicked boxes number/index inside array
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
        if(array.length > 0){ //if array length is greater than 0
            if(playersTurn.classList.contains("player")){ 
                playerIcon = "X"; //if player has chosen O then bot will X
                sectionBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside bot selected element
                sectionBox[randomBox].style.color = "blue";
                sectionBox[randomBox].setAttribute("id", playerIcon); //set id attribute in span/box with player choosen sign
                playersTurn.classList.add("active"); ///add active class in players
            } else {
                sectionBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside bot selected element
                sectionBox[randomBox].style.color = "red";
                playersTurn.classList.remove("active"); //remove active class in players
                sectionBox[randomBox].setAttribute("id", playerIcon); //set id attribute in span/box with player choosen sign
            }
            winnerSelect(); //calling selectWinner function
        }
        sectionBox[randomBox].style.pointerEvents = "none"; //once bot select any box then user can't click on that box
        playSection.style.pointerEvents = "auto"; //add pointerEvents auto in playboard so user can again click on box
        playerIcon = "X"; //if player has chosen X then bot will be O right then we change the playerSign again to X so user will X because above we have changed the playerSign to O for bot
    }
}

function classValue(classname){
    return document.querySelector(".square-" + classname).id; //return id value
}
function icon(value1, value2, value3, icon){ //checking all id value is equal to sign (X or O) or not if yes then return true
    if(classValue(value1) == icon && classValue(value2) == icon && classValue(value3) == icon){
        return true;
    }
}
function winnerSelect(){ //if the one of following winning combination match then select the winner
    if(icon(1,2,3,playerIcon) || icon(4,5,6, playerIcon) || icon(7,8,9, playerIcon) || icon(1,4,7, playerIcon) || icon(2,5,8, playerIcon) || icon(3,6,9, playerIcon) || icon(1,5,9, playerIcon) || icon(3,5,7, playerIcon)){
        computer = false; //passing the false boolen value to runBot so bot won't run again
        machine(computer); //calling bot function
        setTimeout(()=>{ //after match won by someone then hide the playboard and show the result box after 700ms
            gameResult.classList.add("show");
            playSection.classList.remove("show");
        }, 700); //1s = 1000ms
        resultText.innerHTML = `Player <p>${playerIcon}</p> won the game!`; //displaying winning text with passing playerSign (X or O)
    } else { //if all boxes/element have id value and still no one win then draw the match
        if(classValue(1) != "" && classValue(2) != "" && classValue(3) != "" && classValue(4) != "" && classValue(5) != "" && classValue(6) != "" && classValue(7) != "" && classValue(8) != "" && classValue(9) != ""){
            computer = false; //passing the false boolen value to runBot so bot won't run again
            machine(computer); //calling bot function
            setTimeout(() => { //after match drawn then hide the playboard and show the result box after 700ms
                gameResult.classList.add("show");
                playSection.classList.remove("show");
            }, 700); //1s = 1000ms
            resultText.textContent = "Match has been drawn!"; //displaying draw match text
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); //reload the current page on replay button click
}