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

/* show icons on click */
function startGame() {
    $("li").click(function(event) {
      if (cardComparisonArray.length < 2) {
      if ($(event.target).hasClass("cardClosed")) {
        incrementMoves();
        starRater();
        showCards();
}}})};

/* show card when clicked on */
function showCards() {
  console.log(targetsArray);
  targetsArray.push($(event.target));
  $(event.target).addClass("cardOpen");
  $(event.target).removeClass("cardClosed");
  // console.log(event.target.id);
  // console.log(event.target);
  // console.log($(event.target));
  const idOfTargetCard = event.target.id - 1;
  $(event.target).append(`<i class="fa ${deckOfCards[idOfTargetCard]} fa-2x" aria-hidden="true"></i>`);
  console.log(event.target.firstElementChild.classList[1]);
  compareCards(event.target.firstElementChild.classList[1]);
}
  
/* compare cards */
function compareCards(targetClass) { 
  cardComparisonArray.push(targetClass);
  console.log(cardComparisonArray);
  if (cardComparisonArray.length === 2) {
    if (cardComparisonArray[0] != cardComparisonArray[1]) {
      closeCards();
    }
    else {
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

startGame();


/* same functionality as above but without jQuery */

// document.querySelector("body").addEventListener("click", function(event) {
//   if (event.target.nodeName === 'LI') {
//   event.target.classList.add("cardOpen");
//   event.target.classList.remove("cardClosed");
//   const addIcon = document.createElement("i");
//   addIcon.classList = `fa ${deckOfCards[1]} fa-2x`
//   event.target.appendChild(addIcon);
// }});


/* create the html using js */

/* timer */

/* reset without using server */

/* stars rating */

function starRater() {
  if (moveCounter > 20) {
    $("#star3").css("color", "#b8ba70");
  } 
  if (moveCounter > 24) {
    $("#star2").css("color", "#b8ba70");
  } 
  if (moveCounter > 28) {
    $("#star1").css("color", "#b8ba70");
  } 
}

/* move counter */

function incrementMoves() {
  moveCounter++;
  $("#movesMade").text(`moves made: ${moveCounter}`);
}