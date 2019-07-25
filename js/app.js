const deckOfCards = [fa-motorcycle, "fa-motorcycle", "fa-truck", "fa-truck", "fa-cube", "fa-cube", "fa-star", "fa-star", "fa-suitcase", "fa-suitcase", "fa-snowflake", "fa-snowflake", "fa-space-shuttle", "fa-space-shuttle", "fa-flask", "fa-flask"];

/* shuffle deck from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976 */

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

shuffle(deckOfCards);

/* show icons on click */

$("li").click(function(event) {
  $(event.target).toggleClass("cardOpen cardClosed");
  console.log(event.target.id);
  const idOfTargetCard = event.target.id - 1;
  $(event.target).append(`<i class="fa ${deckOfCards[idOfTargetCard]} fa-2x" aria-hidden="true"></i>`);
});

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


/* shuffle deck */


/* every li-element needs to have it's own index from which it gathers it's icon */



/* timer */

/* reset without using server */

/* stars */

/* move counter */
