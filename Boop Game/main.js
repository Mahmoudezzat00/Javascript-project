// whole screen listener
// if 4 clicks in 2 seconds, go to next page
var clickCount = 0;
var clickTime = 0;

document.addEventListener("click", function () {
    var currTime = new Date().getTime();
    if (currTime - clickTime < 100000) {
        //clickCount++;
        if (clickCount == 2) {
            if (currPageNumber == 1) {
                clickCount = 1;
                showSecondPageRightAway();
            }
            else if (currPageNumber == 2) {
                clickCount = 1;
                showThirdPageRightAway();
            }
            else if (currPageNumber == 3) {
                clickCount = 1;
                //showFourthPageRightAway();
            }
        }
    }
    else {
        clickCount = 1;
    }
    clickTime = currTime;
});

function showSecondPageRightAway() {
    currPageNumber++;
    document.body.style.backgroundColor = "#ABE7DB";//same colour as second cat
    pic.src = "./minimalist/inputNames.gif";
    showPage(2);
    hidePage(1);
}


function showThirdPageRightAway() {
    name1 = document.getElementById("player1").value;

    //get name2
    name2 = document.getElementById("player2").value;

    //get playfield
    playField = document.getElementById("playField").value;

    //get numCats
    numCats = document.getElementById("numCats").value;

    //get pointsToWin
    pointsToWin = document.getElementById("Points").value;

    //if any empty, alert
    //if all filled, go to next page, setup in next page function
    //from second to third
    //separate checks for each field and their min and max
    if (playField < 4 || playField > 6) {
        showAlert("Playfield must be between 6 and 10");
    }
    else if (numCats < 3 || numCats > 10) {
        showAlert("Number of cats must be between 3 and 10");
    }
    else if (pointsToWin < 1 || pointsToWin > 6) {
        showAlert("Points to win must be between 1 and 6");
    }
    else if (name1 == "" || name2 == "" || name1 == " " || name2 == " " || name1.length > 6 || name2.length > 6) {
        showAlert("Please enter both names with no more than 6 letters to continue");
    }
    else {
        hidePage(2);
        showPage(3);
        currPageNumber++;
        pic.src = "./minimalist/thirdPageGameplayCropped.gif";
        document.body.style.backgroundColor = "#fee89b";
        //alert
        document.getElementById("container").style.display = "grid";
        generatePlayField();
    }
}

document.getElementById("save").addEventListener("click", saveButton);

function saveButton() {
    showAlert("Coming Soon!");
}

//page counter
var currPageNumber = 1;
var numberOfPages = 5;
//variables to store data from input fields
var name1 = "";
var name2 = "";
var playField = "";
var numCats = 0;
var pointsToWin = 0;
//button listener
//print to console the current page number
// document.getElementById("next").addEventListener("click", function () {
//     
// });

var pic = document.getElementById("animate");
//72 frames * 40ms= 2880
//nextPage
document.getElementById("next" + currPageNumber).addEventListener("click", nextPage);

function nextPage() {
    if (currPageNumber == 1) {
        pic.src = "./minimalist/homepageEdit.gif";
        setTimeout(firstPageUpdate, (5 * 60) + (82 * 40));
        //the number of frames until lights on
        currPageNumber++;
    } else if (currPageNumber == 2) {
        //actual work
        //get data from input fields
        //get name1
        name1 = document.getElementById("player1").value;

        //get name2
        name2 = document.getElementById("player2").value;

        //get playfield
        playField = document.getElementById("playField").value;

        //get numCats
        numCats = document.getElementById("numCats").value;

        //get pointsToWin
        pointsToWin = document.getElementById("Points").value;

        //if any empty, alert
        //if all filled, go to next page, setup in next page function
        //from second to third
        //separate checks for each field and their min and max
        if (playField < 4 || playField > 6) {
            showAlert("Playfield must be between 4 and 6");
        }
        else if (numCats < 3 || numCats > 10) {
            showAlert("Number of cats must be between 3 and 10");
        }
        else if (pointsToWin < 1 || pointsToWin > 6) {
            showAlert("Points to win must be between 1 and 6");
        }
        else if (name1 == "" || name2 == "" || name1 == " " || name2 == " " || name1.length > 6 || name2.length > 6) {
            showAlert("Please enter both names with no more than 6 letters to continue");
        }

        else {
            currPageNumber++;
            fadeAndHide(currPageNumber - 1);
            fadeInPage(currPageNumber);
        }
    }
    else {
        if (currPageNumber < numberOfPages) {
            currPageNumber++;
            fadeOutPage(currPageNumber - 1);
            fadeInPage(currPageNumber);
        }
    }
    //remove old listener to disable double clicking
    document.getElementById("next" + (currPageNumber - 1)).removeEventListener("click", nextPage);
    //add new listener
    document.getElementById("next" + currPageNumber).addEventListener("click", nextPage);
}

function firstPageUpdate() {
    //from first page to second page
    //set page2 input fields to empty
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
    document.getElementById("playField").value = "";
    document.getElementById("numCats").value = "";
    document.getElementById("Points").value = "";
    turnBackWhite();
    //hide old elements
    hidePage(1);
    //don't use the fadeout function because I need the elements to dissappear instantly due to the cat
    //fade out the cat
    setTimeout(function () {
        //fade out cat
        //fade(pic);
        pic.style.animation = "fadeout 5s linear forwards";
        //fade in second page
        setTimeout(function () {
            //remove cat
            pic.src = "";
            //fade in body new colour 
            document.body.style.transition = "background-color 4s ease";
            document.body.style.backgroundColor = "#ABE7DB";//same colour as second cat
            fadeInPage(2);//fade in rest of page elements input boxes and titles
            setTimeout(replaceCat, 1000);//so that the cat fades in correctly a bit after some background colour has loaded in
            //unfade(pic);
        }, 5500);
    }, 3000);
}

function replaceCat() {
    pic.src = "./minimalist/inputNames.gif";
    pic.style.opacity = "0";
    pic.style.display = "block";
    pic.style.animation = "fadein 8s linear forwards";
}

function turnBackWhite() {
    document.body.style.backgroundColor = "white";
}

//hide all not in current page number
function hidePage(pageToHide) {
    var pageElements = document.getElementsByClassName("p" + pageToHide);
    //
    for (var j = 0; j < pageElements.length; j++) {
        //
        //
        pageElements[j].style.display = "none";
    }
}
function fadeOutPage(pageToHide) {
    var pageElements = document.getElementsByClassName("p" + pageToHide);
    //
    //fade out pic
    pic.style.animation = "fadeout 5s linear forwards";
    for (var j = 0; j < pageElements.length; j++) {
        //
        //
        //pageElements[j].style.display = "none";
        pageElements[j].style.animation = "fadeout 5s linear forwards";
    }
}

function fadeAndHide(pageToHide) {
    fadeOutPage(pageToHide);
    setTimeout(function () {
        hidePage(pageToHide);
    }, 5000);
}

function fadeInPage(pageToShow) {
    var pageElements = document.getElementsByClassName("p" + pageToShow);
    //show elements
    //third page colour
    if (pageToShow == 3) {
        //gameplay page
        //generate playfield based on inputs
        generatePlayField();
        //setbackground color
        setTimeout(function () {
            document.body.style.transition = "background-color 4s ease";
            document.body.style.backgroundColor = "#fee89b";
            for (var j = 0; j < pageElements.length; j++) {
                pageElements[j].style.display = "block";
                pageElements[j].style.animation = "fadein 5s linear forwards";
            }
            for (var j = 0; j < pageElements.length; j++) {
                //
                //
                if (pageElements[j].id != "") {
                    pageElements[j].style.display = "grid";
                    pageElements[j].style.animation = "fadein 5s linear forwards";
                }
            }


            //background and elements and picture have faded out
            pic.src = "";
            pic.style.display = "none";
            pic.style.opacity = "0";
            pic.animation = "";
            document.getElementById("container").style.display = "grid";
            //set new pic            
            setTimeout(function () {
                pic.src = "./minimalist/thirdPageGameplayCropped.gif";
                pic.style.display = "block";
                pic.style.opacity = "0";
                pic.style.animation = "fadein 5s linear forwards";
            }, 2000);
        }, 5000);//to give time for the last pic to dissappear appropriately
    } else {
        for (var j = 0; j < pageElements.length; j++) {
            //
            //
            pageElements[j].style.display = "block";
            pageElements[j].style.animation = "fadein 5s linear forwards";
        }
    }
}

function showPage(pageToShow) {
    var pageElements = document.getElementsByClassName("p" + pageToShow);
    //show elements
    for (var j = 0; j < pageElements.length; j++) {
        //
        //
        pageElements[j].style.display = "block";
        //pageElements[j].style += ";animation: fadein 5s linear forwards;";

    }
}

function showAlert(message, endGame) {
    document.getElementById("alert-message").innerHTML = message;
    document.getElementById("overlay").style.display = "flex";
    if (endGame) {
        document.getElementById("alert-title").innerHTML = "GAME OVER";
        document.getElementById("alert-button").innerHTML = "Restart same Game";
        document.getElementById("alert-button2").innerHTML = "Restart and use new Game details";
        document.getElementById("alert-button2").style.display = "inline-block";
        document.getElementById("alert-button2").onclick = function () {
            //restart whole game
            //refresh page
            location.reload();
        }
        terminateTimers();

        document.getElementById("Cat").style.backgroundColor = "";
        document.getElementById("Cat2").style.backgroundColor = "";
        document.getElementById("alert-button").onclick = function () {
            restartPlayField();
        }
    } else {
        document.getElementById("alert-title").innerHTML = "ERROR";
        document.getElementById("alert-button").innerHTML = "OK";
        document.getElementById("alert-button2").style.display = "none";
            
    }
}

function hideAlert() {
    document.getElementById("overlay").style.display = "none";
}

var turnCount1 = 1;
var turnCount2 = 0;

var selected = false;
var selectedCell = 0;
var updatedCells = [];
var endTurnButton = document.getElementById("nextTurn");
var saveButton = document.getElementById("save");
var player1Score = 0;
var player2Score = 0;
var player1ScoreDisplay = document.getElementById("player1Score");
var player2ScoreDisplay = document.getElementById("player2Score");
var player1NameDisplay = document.getElementById("player1Name");
var player2NameDisplay = document.getElementById("player2Name");
var player1Turn = true;
var TurnDisplay = document.getElementById("currentPlayer");
var player1Timer = 0;
var player2Timer = 0;
var player1TimerDisplay = document.getElementById("Timer");
var player2TimerDisplay = document.getElementById("Timer2");
var player1numCats = 0;
var player2numCats = 0;
var player1numCatsDisplay = document.getElementById("player1numCats");
var player2numCatsDisplay = document.getElementById("player2numCats");
var gameOver = false;


function restartPlayField() {
    //hide alert
    hideAlert();
    //reset all variables
    selected = false;
    selectedCell = 0;
    updatedCells = [];
    dragUpdatedCells = [];

    player1Score = 0;
    player2Score = 0;

    player1Turn = true;
    player1Timer = 0;
    player2Timer = 0;

    player1numCats = 0;
    player2numCats = 0;

    gameOver = false;

    //reset playfield
    //clear playfield
    var playField = document.getElementById("playField");
    playField.innerHTML = "";
    //enable image drop for player 1
    //disable for player 2
    disableImageDrag(2);
    //reset timers and point scores

    terminTimers = false;
    //reset turn counter
    turnCount1 = 1;
    turnCount2 = 0;
    //reset counter
    minutes1 = 2;
    seconds1 = 1;
    minutes2 = 2;
    seconds2 = 1;

    //reset cat background player 2 to no colour
    var catBackground = document.getElementById("Cat2");
    catBackground.style.backgroundColor = "";

    //to refresh the timer display
    player1NameDisplay.innerHTML = name1;
    player2NameDisplay.innerHTML = name2;
    player1ScoreDisplay.innerHTML = player1Score;
    player2ScoreDisplay.innerHTML = player2Score;
    player1Timer = "2:00";
    player1TimerDisplay.innerHTML = player1Timer;
    player2Timer = "2:00";
    player2TimerDisplay.innerHTML = player2Timer;
    player1numCats = numCats;
    player2numCats = numCats;
    player1numCatsDisplay.innerHTML = "Cats: " + player1numCats;
    player2numCatsDisplay.innerHTML = "Cats: " + player2numCats;



    //clear playfield
    var playField = document.getElementById("playField");
    playField.innerHTML = "";
    //generate playfield

    generatePlayField();
}
function generatePlayField() {
    //set container display to grid
    //document.getElementById("container").style.display = "grid";
    //initially will not have the following styles in the css document
    //add the cells based on playfield size input
    //generate inner html string of divs and their locations and set their styles
    //get the playfield size
    //set player details
    player1NameDisplay.innerHTML = name1;
    player2NameDisplay.innerHTML = name2;
    player1ScoreDisplay.innerHTML = player1Score;
    player2ScoreDisplay.innerHTML = player2Score;
    //player1Timer = 60 * 2;
    player1TimerDisplay.innerHTML = player1Timer;
    player2Timer = "2:00";
    player2TimerDisplay.innerHTML = player2Timer;
    player1numCats = numCats;
    player2numCats = numCats;
    player1numCatsDisplay.innerHTML = "Cats: " + player1numCats;
    player2numCatsDisplay.innerHTML = "Cats: " + player2numCats;

    //start game
    TurnDisplay.innerHTML = name1 + "'s Turn";
    player2TimerDisplay.style.backgroundColor = "";
    player1TimerDisplay.style.backgroundColor = "#fee89b";

    counter1();
    disableImageDrag(2);
    player1Turn = true;
    gameOver = false;

    var catBackground1 = document.getElementById("Cat");
    catBackground1.style.backgroundColor = "#AAFF00";

    //add event listener to end turn button, when clicked execute endTurn function
    endTurnButton.addEventListener("click", endTurn);

    //generate the inner html string
    var innerHTMLCode = "";
    for (var i = 0; i < playField; i++) {
        for (var j = 0; j < playField; j++) {
            innerHTMLCode += "<div class=cell id=cell" + i + "_" + j + " ondrop=\"dropcopy(event)\"ondragover=\"allowDrop(event,this)\" style=\"padding: 0px 0px;justify-items: center;align-items: center; display:grid;object-fit: contain;max-height:100%; max-width:100%; grid-area:cell" + i + "_" + j + ";\"></div>";
        }
    }
    //set the inner html of the playfield
    document.getElementById("gameField").innerHTML = innerHTMLCode;

    //set the styles to correspond to the names of the cells
    var cells = document.getElementsByClassName("cell");


    //set the styles of the playfield
    //generate the grid-template-columns and grid-template-rows strings;
    var gridTemplateColumns = "";
    var gridTemplateRows = "";
    for (var i = 0; i < playField; i++) {
        gridTemplateColumns += "1fr ";
        gridTemplateRows += "1fr ";
    }
    gridTemplateColumns = gridTemplateColumns.slice(0, -1);
    gridTemplateRows = gridTemplateRows.slice(0, -1);
    gridTemplateColumns += "";
    gridTemplateRows += "";
    //set the styles of the grid-template-areas:
    var gridTemplateAreas = "\"";
    for (var i = 0; i < playField; i++) {
        for (var j = 0; j < playField; j++) {
            gridTemplateAreas += "cell" + i + "_" + j + " ";
        }
        gridTemplateAreas = gridTemplateAreas.slice(0, -1);//remove last space before closing quote
        gridTemplateAreas += "\"\"";
    }
    gridTemplateAreas = gridTemplateAreas.slice(0, -1);//remove last speech marks before closing quote
    gridTemplateAreas += ""
    //set max-height and max-width of the playfield

    //document.getElementById("gameField").style.cssText = gridTemplateAreas.concat(gridTemplateColumns,gridTemplateRows);
    document.getElementById("gameField").style.gridTemplateAreas = gridTemplateAreas;
    document.getElementById("gameField").style.gridTemplateColumns = gridTemplateColumns;
    document.getElementById("gameField").style.gridTemplateRows = gridTemplateRows;
    // set width and height
    document.getElementById("gameField").style.width = "100%";
    document.getElementById("gameField").style.height = "100%";
    //document.getElementById("gameField").style.maxHeight = "100%";
    //document.getElementById("gameField").style.maxWidth = "100%";
    //set the style of the cells to show as squares with a border background 
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.border = "1px solid #503D3F";
        cells[i].style.borderRadius = "5px";
        //set background color to #FEE89B
        //cells[i].style.background = "#33CA7F";

        //cells[i].style.background = "radial-gradient(circle,#FEE89B 20%, #ABE7DB 100%";
    }
    // //set hover for cells
    for (var i = 0; i < cells.length; i++) {
        //insert cells[i].id into the function
        let cell = cells[i];

        cell.onmouseover = () => {
            if (cellIsEmpty(cell.id) || (selected && cell.id == selectedCell.id)) {
                if (selected && cell.id === selectedCell.id) {
                    //works, nothing happens when over a cell that is already selected
                    //return;
                    //ALERT
                    //will disable this, so that the player can see what his current choice would still cause
                } else {
                    cell.style.background = "#9AD1D4";
                }
                //array of surronding cells
                var surrondingCells = getSurroundingCells(cell.id);
                //will loop over the surronding cells to update their backgrounds
                //either the cell will fall off
                //or the cell will be shifted if it has a cat
                //or nothing will happen to the cell, if it is empty
                for (var j = 0; j < surrondingCells.length; j++) {
                    var currentSurrondingCell = surrondingCells[j];
                    if (currentSurrondingCell == null) {
                        //if our hoverOverCell is in the corner, then its neighbour is empty/null so move onto next neighbour
                        continue;
                    }
                    //if cell and a neighbour are on same axis as main cell, then won't move so set a different color
                    //this can be calculated by the index of the cells in the array for the main cell and the neighbour
                    //main cell has 8 neighbours or less, 
                    //if index of neighbour is x, then we generate the neighbours for neighbourIndex x
                    //if it has a neighbour also in index x, then this is visualized as
                    //main cell neighbourX neighbourX consequently the first neighbour will be safe
                    //edge case would be if its on the edge, then the number of neighbours will be less
                    //that goes for the main cell or its neighbour
                    //so three cases, a neighbour is on the edge, so will fall off
                    // a neighbour has a saviour neighbour, so will not move
                    // a neighbour that will move
                    let cellUpdated = checkCellDetails(cell.id, currentSurrondingCell.id, j);
                    if (cellUpdated) {
                        updatedCells.push(currentSurrondingCell);
                    }
                }
            } else {

                cell.style.background = "#EF8354";

            }
        }
        cells[i].onmouseout = function () {
            if (selected && cell.id == selectedCell.id) {
                for (var j = 0; j < updatedCells.length; j++) {
                    updatedCells[j].style.background = "";
                }
            } else {
                cell.style.background = "";
                for (var j = 0; j < updatedCells.length; j++) {
                    if (selected && updatedCells[j].id == selectedCell.id) {
                        continue;
                    } else {
                        updatedCells[j].style.background = "";
                    }
                }
            }
            updatedCells = [];
        }
        cells[i].onclick = function () {
            //if select a cell when a cell is already selected, remove old selection and update new done in select cell method
            if (cellIsEmpty(cell.id)) {
                if (player1Turn) {
                    selectCell(cell.id, 1);
                } else {
                    selectCell(cell.id, 2);
                }
            } else {
                showAlert("Cell is not empty");
            }
        }
    }
}

function endTurn() {
    //if a cell is selected, then deselect it
    if (selected) {
        shiftCats();//will update cat counters there as well
        selectedCell.style.background = "";
        selectedCell.style.border = "1px solid black";
        selected = false;
        selectedCell = 0;
    } else {
        showAlert("No cell selected");
        return;
    }
    //check if any points to gain, and remove cats
    //check if any triplets
    //loop over all cats on board, if any have 2 opposite neighbours then point, and delete cats
    checkTriplets();
    //decrease counter for cat placed will do it after all the other work so that incase there is an increase due to a fall off or triplet
    decreaseCounter(player1Turn);

    //check if any player reached winning points
    if (player1Turn) {
        //first player's turn ending
        //set background of name to green to indicate its the second players turn and restore the first players
        var catBackground1 = document.getElementById("Cat");
        var catBackground2 = document.getElementById("Cat2");
        catBackground2.style.backgroundColor = "#AAFF00";
        catBackground1.style.backgroundColor = "";
        TurnDisplay.innerHTML = name2 + "'s Turn";
        setTimers(2);//start timer 2
        disableImageDrag(1);
        player1Turn = false;
        turnCount2++;


    }
    else {
        //second player's turn ending
        //set background of name to green to indicate its the first players turn and restore the second players
        var catBackground1 = document.getElementById("Cat");
        var catBackground2 = document.getElementById("Cat2");
        catBackground1.style.backgroundColor = "#AAFF00";
        catBackground2.style.backgroundColor = "";
        TurnDisplay.innerHTML = name1 + "'s Turn";
        setTimers(1);
        disableImageDrag(2);
        player1Turn = true;
        turnCount1++;
    }
}

function checkTriplets() {
    //loop over all cats on board, if any have 2 opposite neighbours then point, and delete cats
    //loop over all cells on the board, if a cell is not empty, so it has a cat
    //get type of cat, if it has 2 opposite neighbours, then point, and delete cats
    for (var i = 0; i < playField; i++) {
        for (var j = 0; j < playField; j++) {
            //generate cell id
            var checkCell = document.getElementById("cell" + i + "_" + j);

            if (cellIsEmpty(checkCell.id)) {
                continue;
            } else {
                //there is a cat present

                //check the opposite neighbours of the current cell
                //so if cell is 1,1 then check cells 0,0 2,2, and also 0,2 and 2,0
                //but also horizontal and vertical neighbours
                //so 1,0 1,2 and 0,1 2,1
                //this as a calculation is
                //cellX,Y = cellX-1,Y-1 cellX+1,Y+1 cellX-1,Y+1 cellX+1,Y-1 cellX,Y-1 cellX,Y+1 cellX-1,Y cellX+1,Y
                //from getsurrondingcells, these would be according to the following format:
                //1 2 3
                //4 X 5
                //6 7 8
                //1,8 and 2,7 and 3,6 and 4,5
                //so we need to check 1,8 and 2,7 and 3,6 and 4,5
                var checkCells = getSurroundingCells(checkCell.id);
                var catType = checkCell.innerHTML.includes("cat1") ? 1 : 2;
                var neighbour1 = checkCells[0];
                var neighbour2 = checkCells[1];
                var neighbour3 = checkCells[2];
                var neighbour4 = checkCells[3];
                var neighbour5 = checkCells[4];
                var neighbour6 = checkCells[5];
                var neighbour7 = checkCells[6];
                var neighbour8 = checkCells[7];

                //check if each null or not
                if (neighbour1 != null && neighbour8 != null && neighbour1.innerHTML != "" && neighbour8.innerHTML != "") {
                    var neighbour1Type = cellIsEmpty(neighbour1.id) ? 0 : neighbour1.innerHTML.includes("cat1") ? 1 : 2;
                    var neighbour8Type = cellIsEmpty(neighbour8.id) ? 0 : neighbour8.innerHTML.includes("cat1") ? 1 : 2;
                    if (catType == neighbour1Type && catType == neighbour8Type) {
                        //point
                        if (catType == 1) {
                            //player 1 points
                            increasePoints(1);
                            increaseCounter(1);
                            increaseCounter(1);
                            increaseCounter(1);
                            //for the cats removed
                        } else {
                            //player 2 points
                            increasePoints(2);
                            increaseCounter(2);
                            increaseCounter(2);
                            increaseCounter(2);
                            //for the cats removed
                        }
                        //delete cats
                        checkCell.innerHTML = "";
                        neighbour1.innerHTML = "";
                        neighbour8.innerHTML = "";
                    }
                } else
                    if (neighbour2 != null && neighbour7 != null && neighbour2.innerHTML != "" && neighbour7.innerHTML != "") {
                        var neighbour2Type = cellIsEmpty(neighbour2.id) ? 0 : neighbour2.innerHTML.includes("cat1") ? 1 : 2;
                        var neighbour7Type = cellIsEmpty(neighbour7.id) ? 0 : neighbour7.innerHTML.includes("cat1") ? 1 : 2;
                        if (catType == neighbour2Type && catType == neighbour7Type) {
                            //point
                            if (catType == 1) {
                                //player 1 points
                                increasePoints(1);
                                increaseCounter(1);
                                increaseCounter(1);
                                increaseCounter(1);
                            } else {
                                //player 2 points
                                increasePoints(2);
                                increaseCounter(2);
                                increaseCounter(2);
                                increaseCounter(2);
                            }
                            //delete cats
                            checkCell.innerHTML = "";
                            neighbour2.innerHTML = "";
                            neighbour7.innerHTML = "";
                        }
                    } else
                        if (neighbour3 != null && neighbour6 != null && neighbour3.innerHTML != "" && neighbour6.innerHTML != "") {
                            var neighbour3Type = cellIsEmpty(neighbour3.id) ? 0 : neighbour3.innerHTML.includes("cat1") ? 1 : 2;
                            var neighbour6Type = cellIsEmpty(neighbour6.id) ? 0 : neighbour6.innerHTML.includes("cat1") ? 1 : 2;
                            if (catType == neighbour3Type && catType == neighbour6Type) {
                                //point
                                if (catType == 1) {
                                    //player 1 points
                                    increasePoints(1);
                                    increaseCounter(1);
                                    increaseCounter(1);
                                    increaseCounter(1);
                                } else {
                                    //player 2 points
                                    increasePoints(2);
                                    increaseCounter(2);
                                    increaseCounter(2);
                                    increaseCounter(2);
                                }
                                //delete cats
                                checkCell.innerHTML = "";
                                neighbour3.innerHTML = "";
                                neighbour6.innerHTML = "";
                            }
                        } else
                            if (neighbour4 != null && neighbour5 != null && neighbour4.innerHTML != "" && neighbour5.innerHTML != "") {
                                var neighbour4Type = cellIsEmpty(neighbour4.id) ? 0 : neighbour4.innerHTML.includes("cat1") ? 1 : 2;
                                var neighbour5Type = cellIsEmpty(neighbour5.id) ? 0 : neighbour5.innerHTML.includes("cat1") ? 1 : 2;
                                if (catType == neighbour4Type && catType == neighbour5Type) {
                                    //point
                                    if (catType == 1) {
                                        //player 1 points
                                        increasePoints(1);
                                        increaseCounter(1);
                                        increaseCounter(1);
                                        increaseCounter(1);
                                    } else {
                                        //player 2 points
                                        increasePoints(2);
                                        increaseCounter(2);
                                        increaseCounter(2);
                                        increaseCounter(2);
                                    }
                                    //delete cats
                                    checkCell.innerHTML = "";
                                    neighbour4.innerHTML = "";
                                    neighbour5.innerHTML = "";
                                }
                            }

            }
        }
    }
}

function increasePoints(player) {
    if (player == 1) {
        player1Score++;
        player1ScoreDisplay.innerHTML = player1Score;
        //if reach pointsToWin then end game
        if (player1Score == pointsToWin) {
            endGame(1);
        }
    } else {
        player2Score++;
        player2ScoreDisplay.innerHTML = player2Score;
        //if reach pointsToWin then end game
        if (player2Score == pointsToWin) {
            endGame(2);
        }
    }
}

function endGame(winner) {

    //display winner
    if (winner == 1) {
        showAlert("Player 1 Wins!", true);
    } else {
        showAlert("Player 2 Wins!", true);
    }
    disableImageDrag(1);
    disableImageDrag(2);
}

function setTimers(player) {
    //set timer
    if (player == 1) {
        pause1(2);
        pause2(2);
    } else {
        pause1(2);
        if (turnCount2 == 0) {
            counter2();
        } else {
            pause2(2);
        }
    }
}

var terminTimers = false;


function terminateTimers() {
    terminTimers = true;
    paused1 = true;
    paused2 = true;
    clearTimeout(timer1);
    clearTimeout(timer2);
    //player1TimerDisplay.innerHTML = "Time: 0";
    //player2TimerDisplay.innerHTML = "Time: 0";
}

var seconds1 = 1,
    minutes1 = 2,
    timer1,
    paused1 = false,
    counter1 = function () {
        if (terminTimers) {
            return;
        }
        seconds1--;
        if (seconds1 == 0) {
            if (minutes1 == 0) {
                clearTimeout(timer1);
                minutes1 = 0;
                seconds1 = 0;
                document.getElementById("Timer").innerHTML = minutes1 + ":" + seconds1;
                paused1 = true;
                //end game
                endGame(2);
                return;
            } else {
                seconds1 = 59; minutes1--;
            }
        }
        //set to html
        document.getElementById("Timer").innerHTML = minutes1 + ":" + seconds1;
        timer1 = setTimeout(function () {
            counter1();
        }, 1000);
    };

function pause1(option) {
    clearTimeout(timer1);
    if (option == 1) {
        //reset timer
        minutes1 = 2;
        seconds1 = 1;
        //paused1 = false;
        //counter1();
    } else {
        paused1 = !paused1;
        if (!paused1) {
            counter1();
        }
    }
}

var seconds2 = 1,
    minutes2 = 2,
    timer2,
    paused2 = false,
    counter2 = function () {
        if (terminTimers) {
            return;
        }
        seconds2--;
        if (seconds2 == 0) {
            if (minutes2 == 0) {
                clearTimeout(timer2);
                minutes2 = 0;
                seconds2 = 0;
                document.getElementById("Timer2").innerHTML = minutes2 + ":" + seconds2;
                paused2 = true;
                //end game
                endGame(1);
                return;
            } else {
                seconds2 = 59; minutes2--;
            }
        }
        //set to html
        document.getElementById("Timer2").innerHTML = minutes2 + ":" + seconds2;
        timer2 = setTimeout(function () {
            counter2();
        }, 1000);
    };

function pause2(option) {
    clearTimeout(timer2);
    if (option == 1) {
        //reset timer
        minutes2 = 2;
        seconds2 = 1;
        //paused2 = false;
        //counter2();
    } else {
        paused2 = !paused2;
        if (!paused2) {
            counter2();
        }
    }
}
// function wait(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Done waiting");
//             resolve(ms)
//         }, ms)
//     })
// }

// (async function Main() {
//     console.log("Starting...")
//     await wait(5000);
//     console.log("Ended!")
// })();

function shiftCats() {
    //calculate cat shifts
    //decrease cat counter for current player
    //if cat counter reaches 0 and the the player has not reached points required to win then alert player has lost

    //get location selection
    var possibleShifts = [];
    possibleShifts = getSurroundingCells(selectedCell.id);

    for (var i = 0; i < possibleShifts.length; i++) {
        //check details of each neighbour
        //if null then outofbounds and continue
        if (possibleShifts[i] == null) {
            continue;
        }
        var neighbour = possibleShifts[i];
        var outcome = whatHappensToCat(selectedCell.id, neighbour.id, i);
        if (outcome == 0 || outcome == 2) {
            //nothing to do
            //just set colour and border back to normal
            neighbour.style.background = "";
            neighbour.style.border = "1px solid black";
        }
        else if (outcome == 1) {
            //cat falls off
            //so clear cell and maybe do an animation if have time
            var catOwner = neighbour.innerHTML;

            //clear cell
            neighbour.style.background = "";
            neighbour.style.border = "1px solid black";
            //neighbour.firstChild.style.animation = "fadeout 0.5s linear forwards";
            //setTimeout(function () {
            neighbour.innerHTML = "";
            //add temporary image to cell to "animate" for half a second
            //timer for half a second
            //then remove image and increase counter for cat that fell off3
            //neighbour.innerHTML = "<img class=\"copyCat\" src='./minimalist/fight.gif' style='width: 100%; height: 100%;'>";
            //attempt at animation
            //neighbour.innerHTML = "<img class=\"copyCat\" src='./minimalist/fight.gif' style='width: 100%; height: 100%;'>";
            //wait(1000);            
            //neighbour.innerHTML = "";
            //increase counter for cat that fell off
            catOwner.includes("cat1") ? increaseCounter(1) : increaseCounter(2);
            //}, 500);
        }
        else {
            //cat moves to new cell
            //so clear old cell and add cat image to new cell
            //outcome gives new location
            //cat in old cell
            var oldCat = neighbour.innerHTML;
            //clear old cell
            neighbour.style.background = "";
            neighbour.style.border = "1px solid black";
            //neighbour.firstChild.style.animation = "fadeout 0.5s linear forwards";
            //setTimeout(function () {
            //neighbour.firstChild.style.animation = "";
            //oldCat = neighbour.innerHTML;
            neighbour.innerHTML = "";
            //attempt at animation
            // neighbour.innerHTML = "<img class=\"copyCat\" src='./minimalist/fight.gif' style='width: 100%; height: 100%;'>";
            // wait(500);
            // neighbour.innerHTML = "";
            //get new location from outcome
            var newLocation = document.getElementById(outcome);
            //add cat image to new location
            //add by innerhtml
            //cat depends on what it was not current player
            newLocation.innerHTML = oldCat;
            //fade in animation
            //newLocation.firstChild.style.animation = "fadein 0.5s linear forwards";

            //}, 500);
        }
    }



}

function decreaseCounter(player) {
    if (player == 1) {
        player1numCats--;
        //if counter reach zero then player has lost
        player1numCatsDisplay.innerHTML = "Cats: " + player1numCats;
        if (player1numCats == 0) {
            //player 1 has lost
            player1TimerDisplay.style.backgroundColor = "#EF8354";
            player2TimerDisplay.style.backgroundColor = "#478E43";
            disableImageDrag(1, 2);
            showAlert(name1 + " has lost!", true);
            return;
        }
    } else {
        player2numCats--;
        //if counter reach zero then player has lost
        player2numCatsDisplay.innerHTML = "Cats: " + player2numCats;
        if (player2numCats == 0) {
            //player 2 has lost
            player2TimerDisplay.style.backgroundColor = "#EF8354";
            player1TimerDisplay.style.backgroundColor = "#478E43";
            disableImageDrag(1, 2);
            showAlert(name2 + " has lost!", true);
            return;
        }
    }
}

function increaseCounter(player) {
    if (player == 1) {
        player1numCats++;
        player1numCatsDisplay.innerHTML = "Cats: " + player1numCats;
    } else {
        player2numCats++;
        player2numCatsDisplay.innerHTML = "Cats: " + player2numCats;
    }
}

function disableImageDrag(player, player2) {
    var player1CatLogo = document.getElementById("catLogo");
    var player2CatLogo = document.getElementById("catLogo2");
    if (player == 1) {
        player1CatLogo.draggable = false;
        player2CatLogo.draggable = true;
    } else {
        player2CatLogo.draggable = false;
        player1CatLogo.draggable = true;
    }
    if (player2 == 2) {
        //means end of game so disable both
        player1CatLogo.draggable = false;
        player2CatLogo.draggable = false;
    };
}

function selectCell(cellID, catImage) {
    let cell = document.getElementById(cellID);

    selected = true;
    if (selectedCell == 0) {
        //no cell is selected
        //set background color to #478E43
        cell.style.background = "#478E43";
        //set border to #2C9200
        cell.style.border = "7px solid #2C9200";
        //add cat image to cell,
        if (catImage < 3) {
            //then inputted is a number for the player
            //so add as inner html and set class as copyCat
            if (catImage == 1) {
                //first player
                cell.innerHTML = "<img src='./minimalist/cat1.png' class='copyCat' >";
            } else {
                //player 2
                cell.innerHTML = "<img src='./minimalist/cat2.png' class='copyCat' >";
            }
        } else {
            //actual cat object called so place as child
            cell.appendChild(catImage);
        }
    } else {
        //there exists a cell that is already selected
        //remove old selection
        selectedCell.style.background = "";
        selectedCell.style.border = "1px solid #503D3F";
        //remove all children i.e. the catImage
        selectedCell.innerHTML = "";
        //set background color of new cell to #478E43
        cell.style.background = "#478E43";
        //set border of new cell to #2C9200
        cell.style.border = "7px solid #2C9200";
        if (catImage < 3) {
            //then inputted is a number for the player
            //so add as inner html and set class as copyCat
            if (catImage == 1) {
                //first player
                cell.innerHTML = "<img src='./minimalist/cat1.png' class='copyCat' >";
            } else {
                //player 2
                cell.innerHTML = "<img src='./minimalist/cat2.png' class='copyCat' >";
            }
        } else {
            //actual cat object called so place as child
            cell.appendChild(catImage);
        }
    }

    selectedCell = cell;
}

var dragUpdatedCells = [];

function checkCell(cellID) {

    //set all previous updated cells to default
    for (var j = 0; j < dragUpdatedCells.length; j++) {
        //if cell is a selected cell then leave as is
        if (dragUpdatedCells[j].id === selectedCell.id) {
            continue;
        }
        dragUpdatedCells[j].style.background = "";
    }
    dragUpdatedCells = [];

    var cell = document.getElementById(cellID);

    if (!cellIsEmpty(cell.id)) {
        console.log("cell is not empty");
        //if a cell is not empty then it cannot be selected
        return;
    }

    if (selected && cell.id === selectedCell.id) {
        //works, nothing happens when over a cell that is already selected
        console.log("cell is already selected");
        return;
        //ALERT
        //will disable this, so that the player can see what his current choice would still cause
        //but this shouldn't be here, so will keep it
    } else {
        console.log("cell is not selected, and is empty so highlight it");
        cell.style.background = "#9AD1D4";
        dragUpdatedCells.push(cell);
    }
    //array of surronding cells
    var surrondingCells = getSurroundingCells(cell.id);
    //will loop over the surronding cells to update their backgrounds
    //either the cell will fall off
    //or the cell will be shifted if it has a cat
    //or nothing will happen to the cell, if it is empty
    for (var j = 0; j < surrondingCells.length; j++) {
        var currentSurrondingCell = surrondingCells[j];
        if (currentSurrondingCell == null) {
            //if our hoverOverCell is in the corner, then its neighbour is empty/null so move onto next neighbour
            continue;
        }
        let updateCell = checkCellDetails(cell.id, currentSurrondingCell.id, j);
        if (updateCell) {
            dragUpdatedCells.push(currentSurrondingCell);
        }
    }
}

function checkCellDetails(cellID, neighbourID, neighbourIndex) {
    var currentSurrondingCell = document.getElementById(neighbourID);
    //if cell is empty then return because nothing to update about it
    if (cellIsEmpty(currentSurrondingCell.id)) {
        return false;
        //ALERT
        //turned it off temporarily to test and see which light up
    }
    if (currentSurrondingCell.id == selectedCell.id) {
        return false;
    }
    if (neighbourWillFall(cellID, neighbourID)) {
        //will fall off
        currentSurrondingCell.style.background = "#F4452D";
        return true;
    }
    else if (neighbourHasSaviourNeighbour(cellID, neighbourID, neighbourIndex)) {
        //will not move
        currentSurrondingCell.style.background = "#91F576";
        return true;
    } else {
        //will move
        currentSurrondingCell.style.background = "#EF8354";
        return true;
    }
}

function whatHappensToCat(cellID, neighbourID, neighbourIndex) {
    var currentSurrondingCell = document.getElementById(neighbourID);
    //if cell is empty then return because nothing to update about it
    if (cellIsEmpty(currentSurrondingCell.id)) {
        return 0;
        //ALERT
        //turned it off temporarily to test and see which light up
    }
    if (currentSurrondingCell.id == selectedCell.id) {
        return 0;
    }
    if (neighbourWillFall(cellID, neighbourID)) {
        //will fall off
        currentSurrondingCell.style.background = "#F4452D";
        return 1;
    }
    else if (neighbourHasSaviourNeighbour(cellID, neighbourID, neighbourIndex)) {
        //will not move
        currentSurrondingCell.style.background = "#91F576";
        return 2;
    } else {
        //will move
        currentSurrondingCell.style.background = "#EF8354";
        return calculateNewLocation(cellID, neighbourID);
    }
}

function cellIsEmpty(cellID) {
    //check if the cell is empty
    var cell = document.getElementById(cellID);
    if (cell.innerHTML == "") {
        return true;
    } else {
        return false;
    }
}
function neighbourWillFall(cellID, neighbourID) {
    //check if the neighbour is on the edge
    var cellIndex = neighbourID.slice(4);
    var neighbourIndex = neighbourID.slice(4);
    //check if the neighbour is on the edge
    //if its a neighbour and on the edge, then it will fall off, so just check that its on the edge
    var tempX = cellIndex.split("_")[0];
    var tempY = cellIndex.split("_")[1];
    if (tempX == 0 || tempY == 0 || tempX == playField - 1 || tempY == playField - 1) {
        var newLocation = calculateNewLocation(cellID, neighbourID);

        //if new location is off playfield then it will fall off
        if (document.getElementById(newLocation) == null) {
            return true;
        }
    }
    return false;
}

function calculateNewLocation(cellID, neighbourID) {
    //returns id of new location
    var differenceX = 0;
    var differenceY = 0;
    var cellIndex = cellID.slice(4);
    var neighbourIndex = neighbourID.slice(4);
    //get tempx and tempy for each and parse to int
    var tempX = parseInt(cellIndex.split("_")[0]);
    var tempY = parseInt(cellIndex.split("_")[1]);
    var tempNeighbourX = parseInt(neighbourIndex.split("_")[0]);
    var tempNeighbourY = parseInt(neighbourIndex.split("_")[1]);
    //calculate the difference between the two

    differenceX = tempX - tempNeighbourX;
    differenceY = tempY - tempNeighbourY;
    //add the difference to the neighbour
    //if the difference is negative, then add the positive difference to the neighbour
    //if the difference is positive, then add the negative difference to the neighbour
    var newX = tempNeighbourX + (differenceX * -1);
    var newY = tempNeighbourY + (differenceY * -1);

    var newLocation = "cell" + newX + "_" + newY;
    return newLocation;
}

function neighbourHasSaviourNeighbour(cellID, neighbourID, index) {
    //check if the neighbour has a saviour neighbour
    //get the neighbours of the neighbour
    var neighbourNeighbours = getSurroundingCells(neighbourID);
    //check if the neighbour neighbours of index index exists, and if not empty then return true
    if (neighbourNeighbours[index] != null) {
        if (!cellIsEmpty(neighbourNeighbours[index].id) && (!selected || (neighbourNeighbours[index].id != selectedCell.id))) {
            return true;
        }
    }
    return false;
}

function getSurroundingCells(cellID) {
    //returns objects not just ids
    var neighbours = [];
    //get the cell index
    //remove the word cell from the id
    var cellIndex = cellID.slice(4);

    //split into x and y on -
    cellIndex = cellIndex.split("_");
    //get the x and y axis of the cell
    var x = cellIndex[0];
    var y = cellIndex[1];
    //get the neighbours of the cell
    //neighbours are the cells with -1 and +1 on x and y axis
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            //check if its our main cell
            if (i == 1 && j == 1) {
                //skip its our main cell
                continue;
            }
            //check if the cell exists
            var tempX = x - 1 + i;
            var tempY = y - 1 + j;

            if (document.getElementById("cell" + tempX + "_" + tempY) != null) {
                //add the cell to the neighbours array
                neighbours.push(document.getElementById("cell" + tempX + "_" + tempY));
            } else {
                //add null to the neighbours array
                neighbours.push(null);
            }
        }
    }
    //console.clear();

    return neighbours;
}

//drag and drop
//while hovering the dragged item over a cell
function allowDrop(ev) {
    //this is what happens when dragging across a cell
    ev.preventDefault();
    var tempCell = ev.target;
    //if target is not a cell then get parent
    if (tempCell.className == "copyCat") {
        tempCell = tempCell.parentNode;
    }
    console.log("hovering over " + tempCell.id);
    checkCell(tempCell.id);
    //ev.target.style.background = "red";
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropcopy(ev) {
    //this is what happens when dropping on a cell
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    var copyimg = document.createElement("img");
    var original = document.getElementById(data);
    copyimg.src = original.src;
    copyimg.className = "copyCat";
    var targetElement = ev.target;
    //if already selected then remove old selection and set new one
    //if target is not a cell then get parent
    if (targetElement.className == "copyCat") {
        targetElement = targetElement.parentNode;
    }

    if (!cellIsEmpty(targetElement.id)) {
        //if not empty then alert its not empty
        showAlert("Cell is not empty");
    } else {
        //if empty then add cat
        selectCell(targetElement.id, copyimg);
    }
    //set all previous updated cells to default for when was checking locations
    for (var j = 0; j < dragUpdatedCells.length; j++) {
        //if cell is a selected cell then leave as is
        if (dragUpdatedCells[j].id === selectedCell.id) {
            continue;
        }
        dragUpdatedCells[j].style.background = "";
    }
    dragUpdatedCells = [];

    //update canNum counter

    //if catNum is 0 then set cat to grayScale and announce game over


}






