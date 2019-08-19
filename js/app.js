/* create the html using js - clientside rendering */
let idCounter = 0;
let allCards = $("#cards");

for (let i = 0; i < 16; i++) {
  idCounter++;
  let aCard = document.createElement("div");
  aCard.className = "card cardClosed";
  aCard.setAttribute("tabindex", "0");
  aCard.id = idCounter;
  allCards.append(aCard);
  }

/* array with all cards/icons */
const deckOfCards = ["fa-motorcycle", "fa-motorcycle", "fa-truck", "fa-truck", "fa-cube", "fa-cube", "fa-star", "fa-star", "fa-suitcase", "fa-suitcase", "fa-snowflake", "fa-snowflake", "fa-space-shuttle", "fa-space-shuttle", "fa-flask", "fa-flask"];

/* shuffle deck function - swapping cards inspired by https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976 */
function shuffle(array) {
  let currentIndex = -1;
  array.forEach(function() {
    currentIndex++;
    let randomIndex = Math.floor(Math.random() * array.length);
    let randomItem = array[randomIndex];
    let currentItem = array[currentIndex];
    array[randomIndex] = currentItem;
    array[currentIndex] = randomItem;
  })
}

/* shuffle the deck */ 
shuffle(deckOfCards);

/* enable navigating through cards using arrow keys */
$(".card").keydown(function(event) {
  let eventsId = event.target.id;
  switch (event.which) {
    case 37:
      if (eventsId > 1 && eventsId != 5 && eventsId != 9 && eventsId != 13) {
        $("#" + (Number(eventsId) - 1)).focus();
        }
      break;
    case 38:
      if (eventsId > 4) {
        $("#" + (Number(eventsId) - 4)).focus();
        }
      break;
    case 39:
      if (eventsId < 16 && eventsId != 4 && eventsId != 8 && eventsId != 12) {
      $("#" + (Number(eventsId) + 1)).focus();
      }
      break;
    case 40:
      if (eventsId < 13) {
        $("#" + (Number(eventsId) + 4)).focus();
        }
      break;
  }
});

/* variables for startGame */
let cardComparisonArray = [];
let targetsArray = [];
let moveCounter = 0;
let starCounter = 3;
let seconds = 0, minutes = 0;
let leaderboard;

/* check if a card is clickable */
function isCardClickable(event) {
  isTimerRunning();
  if (cardComparisonArray.length < 2) {
  if ($(event.target).hasClass("cardClosed")) {
    incrementMoves();
    starRater();
    showCards();
}}};

/* is timer already running? */
function isTimerRunning() {
  if (moveCounter == 0) {
    timer();
  }
};

/* show icons on click */
function startGame() {
  /* eventlistener to start timer */
    // $("#cards").one("click", timer);
  /* eventlistener to turn cards on click */
    $(".card").click(isCardClickable);
  /* eventlistener to turn cards on pressing the space bar */
    $(".card").keydown(function(event) {
      if (event.which == 32) {
        isCardClickable(event);
      }
    })
  };

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
  if (moveCounter === 28) {
    $("#star3").css("color", "#b8ba70");
    starCounter--;
  } 
  if (moveCounter === 34) {
    $("#star2").css("color", "#b8ba70");
    starCounter--;
  } 
  if (moveCounter === 40) {
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
      seconds = `0${seconds}`;
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
  // location.reload();         uncomment!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  youWin();                       // delete!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});

/* win modal correct display of time needed */
function displayMinutes() {
  if (minutes == 0) {
    return ""
  }
  if (minutes == 1) {
    return " " + minutes + " minute";
  } 
  if (minutes > 1) {
    return " " + minutes + " minutes"
  }
}

function displaySeconds() {
  if (seconds == 00) {
    return ""
  }
  if (seconds == 1) {
    let withoutZero1 = seconds.toString()[1];
    return " " + withoutZero1 + " second";
  } 
  if (seconds > 1 && seconds < 10) {
    let withoutZero2 = seconds.toString()[1];
    return " " + withoutZero2 + " seconds";
  }
  else {
    return " " + seconds + " seconds";
  }
}

/* win modal */
function youWin() {
  $('#winModal').modal("show");

  $(".modal-title").text("Congratulations!");

  $(".modal-body").text(`  You needed ${moveCounter} moves and it took you${displayMinutes()}${displaySeconds()} to find all the matches! 
  You received ${starCounter} out of 3 stars!`);

  /* win modal - input field */
  let playerNameText = document.createElement("label");
  playerNameText.setAttribute("id", "playerNameText");
  playerNameText.textContent = "To see whether you made the top 10, enter your name here: ";
  $(".modal-body").append(playerNameText);

  let playerName = document.createElement("input");
  playerName.setAttribute("type", "text");
  playerName.setAttribute("placeholder", "Player Name");
  playerName.setAttribute("id", "playerName");
  $(".modal-body").append(playerName);

  let playerNameButton = document.createElement("button");
  playerNameButton.setAttribute("id", "playerNameButton");
  playerNameButton.setAttribute("type", "submit");
  playerNameButton.setAttribute("class", "btn btn-secondary");
  playerNameButton.textContent = "OK";
  $(".modal-body").append(playerNameButton);

  /* when clicked, save modal input and player data in local storage */
  $("#playerNameButton").one("click", function(event) {    //////////////////////////////// make keydown event for ENTER key

    let newEntry = {
      name: playerName.value,
      moves: moveCounter,
      timeMinutes: minutes,
      timeSeconds: seconds
    }

    //get leaderboard from local storage
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    
    // add result to leaderboard if necessary
      if (leaderboard === null) {
        leaderboard = [];
        leaderboard.push(newEntry);
      }

    // the following works with chrome, maybe there is a problem with firefox because of security settings? !!!!!!!!!!!!!!!!!!
      else if (leaderboard != null) {
        if (leaderboard[leaderboard.length - 1].moves >= newEntry.moves) { //put >=  here for ranking without times !!!!!!!!!!!!!!!!!!!!!!!!!!!!
          for (i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i].moves >= newEntry.moves) { //put >=  here for ranking without times !!!!!!!!!!!!!!!!!!!!!!!!!!!!
              leaderboard.splice(i, 0, newEntry);
              console.log("leaderboard entry minutes: " + leaderboard[i].timeMinutes);
              console.log("new entry minutes: " + newEntry.timeMinutes);
              console.log("leaderboard entry seconds: " + parseInt(leaderboard[i].timeSeconds, 10));
              console.log("new entry seconds: " + parseInt(newEntry.timeSeconds, 10));
              break;
              }

            // else if (leaderboard[i].moves === newEntry.moves) {
            //   if (leaderboard[i].timeMinutes > newEntry.timeMinutes) {
            //     leaderboard.splice(i, 0, newEntry);
            //     break;
            //   }
            //   else if (leaderboard[i].timeMinutes === newEntry.timeMinutes) {
            //     if (parseInt(leaderboard[i].timeSeconds, 10) > parseInt(newEntry.timeSeconds, 10)) {
            //       leaderboard.splice(i, 0, newEntry);
            //       break;
            //     } 
            //   }
            // }   
            }
        }
        else if (leaderboard[leaderboard.length - 1].moves < newEntry.moves) { 
          leaderboard.push(newEntry);
        }  
      }

      // cut off excess leaderboard entries 
      if (leaderboard.length > 5) {
        leaderboard.pop();
      }
    
      // save updated top 5 to localstorage 
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
      console.log("Updated leaderboard after saving it: ");
      console.log(leaderboard);
      
      // build leaderboard structure
      $("#playerName").val("");
      $(".modal-title").text("Leaderboard");
      console.log(leaderboard.name);
      $(".modal-body").html("<table><tr><td>Rank</td><td>Name</td><td>Moves</td><td>Time</td></tr></table>");

      // fill leaderboard with entries
      for (i = 0; i < leaderboard.length; i++) {
        let newRow = $("<tr><td>" + (i + 1) + "</td><td>" + leaderboard[i].name + "</td><td>" + leaderboard[i].moves + "</td><td>" + leaderboard[i].timeMinutes + " : " + leaderboard[i].timeSeconds + "</td></tr>");
        $(".modal-body table").append(newRow);
      }

      $("#newGame").click(newGame);
  });
}

/* reset without using server */
function newGame() {
location.reload();
};

/* call start game function */
startGame();