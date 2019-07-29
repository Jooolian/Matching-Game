/* create the html using js - clientside */
let idCounter = 0;
let list = $("ul");

for (let i = 0; i < 4; i++) {
  let rows = document.createElement("div");
  console.log(rows);
  rows.className = "row";
  for (let j = 0; j < 4; j++) {
  idCounter++;
  let listItems = document.createElement("li");
  listItems.className = "col cardClosed";
  listItems.id = idCounter;
  rows.append(listItems);
  list.append(rows);
  }
}


/* array with all cards/icons */
const deckOfCards = ["fa-motorcycle", "fa-motorcycle", "fa-truck", "fa-truck", "fa-cube", "fa-cube", "fa-star", "fa-star", "fa-suitcase", "fa-suitcase", "fa-snowflake", "fa-snowflake", "fa-space-shuttle", "fa-space-shuttle", "fa-flask", "fa-flask"];

/* shuffle deck function from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* shuffle the deck */ 
shuffle(deckOfCards);

/* variables for startGame */
let cardComparisonArray = [];
let targetsArray = [];
let moveCounter = 0;
let starCounter = 3;
let seconds = 0, minutes = 0;
// let timeCounter = 0;

/* show icons on click */
function startGame() {
    $("ul").one("click", timer);

    $("li").click(function(event) {
      if (cardComparisonArray.length < 2) {
      if ($(event.target).hasClass("cardClosed")) {
        incrementMoves();
        starRater();
        showCards();
}}})};

/* show card when clicked on */
function showCards() {
  targetsArray.push($(event.target));
  $(event.target).addClass("cardOpen");
  $(event.target).removeClass("cardClosed");
  const idOfTargetCard = event.target.id - 1;
  $(event.target).append(`<i class="fa ${deckOfCards[idOfTargetCard]} fa-2x" aria-hidden="true"></i>`);
  compareCards(event.target.firstElementChild.classList[1]);
}
  
/* compare cards */
function compareCards(targetClass) { 
  cardComparisonArray.push(targetClass);
  if (cardComparisonArray.length === 2) {
    if (cardComparisonArray[0] != cardComparisonArray[1]) {
      closeCards();
    }
    else {
      if($(".cardOpen").length == 16) {
        youWin();
      }
      targetsArray = [];
      cardComparisonArray = [];
    }
  }
}

/* hide cards */
function closeCards() {
  setTimeout(function() {
    targetsArray[0].removeClass("cardOpen");
    targetsArray[0].addClass("cardClosed");
    targetsArray[0][0].firstElementChild.remove();
    targetsArray[1].removeClass("cardOpen");
    targetsArray[1].addClass("cardClosed");
    targetsArray[1][0].firstElementChild.remove();
    targetsArray = [];
    cardComparisonArray = [];
    }, 1000);  
}

/* stars rating */
function starRater() {
  if (moveCounter === 20) {
    $("#star3").css("color", "#b8ba70");
    starCounter--;
  } 
  if (moveCounter === 26) {
    $("#star2").css("color", "#b8ba70");
    starCounter--;
  } 
  if (moveCounter === 32) {
    $("#star1").css("color", "#b8ba70");
    starCounter--;
  } 
}

/* move counter */
function incrementMoves() {
  moveCounter++;
  $("#movesMade").text(`moves made: ${moveCounter}`);
}

/* timer */
function timer() {
  window.setInterval(function() {
    seconds++;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (seconds === 60) { 
      seconds = 0;
      minutes++;
    }
    if (minutes === 9 && seconds === 59) {
      newGame()
    }
    $("#timePassed").text(`time passed: 0${minutes}:${seconds}`);
  }, 1000);
}

/* reload button - abort current game - start new game */
$("#newRound").click(function() {
  location.reload();
});

/* win message */
function youWin() {
 if (window.confirm(`Congratulations, you win!
 It took you ${moveCounter} moves and 0${minutes}:${seconds} minutes! You received ${starCounter} out of 3 stars!
 Want to play another game?`)) {
   newGame();
  }
}

/* reset without using server */
function newGame() {
location.reload();
};

startGame();