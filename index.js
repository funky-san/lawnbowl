const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

//variables
let nextAvaliableID = 1; //integer as it needs to be able to count the amount of posts
let storedPosts = {};

let nextEventID = 1;
let storedEvents = {};
let chosenEvent = 0;
let selectedEvent = ""

let nextUpdateID = 1;
let storedUpdates = {};

let nextPlayerID = 1;
let storedPlayers = {};

let ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));

//--display pages--

function displayPosts(req, res) {
  let postsArray = Object.values(storedPosts).slice().reverse(); //this line is chatgpt

  res.render('posts', { //shows posts and passes what page is being displayed
    currentPage: 'posts',
    posts: postsArray //displays post array
  });
}

function displayEvents(req, res) {
  let eventsArray = Object.values(storedEvents);
  let selectedIndex = chosenEvent;

  let rounds = [];
  if (eventsArray[selectedIndex]) {
    rounds = eventsArray[selectedIndex].rounds || [];
  }

  res.render('events', {
    currentPage: 'events',
    events: eventsArray,
    selectedIndex: selectedIndex,
    rounds: rounds
  });
}

function displayPlayers(req, res, player, playerOne, playerTwo) {
  res.render('players', {
    player: player,
    playerOne: playerOne,
    playerTwo: playerTwo,
    currentPage: "players"
  });
}

function displayUpdates(req, res) {
  let updatesArray = Object.values(storedUpdates).slice().reverse(); //this line is chatgpt

  res.render('updates', { //shows posts and passes what page is being displayed
    currentPage: 'updates',
    updates: updatesArray //displays post array
  });
}

function displayWrong(req, res) {
  res.render('wrong', { currentPage: 'events' });
}

function displayConfig(req, res) {
  res.render('config', {
    currentPage: 'events',
    selectedEvent,
    rounds: selectedEvent.rounds || []
  });
}

//--logic--
//posts
function posting(req, res) {
  if (req.body.username === " " || req.body.username === "") { //if there is no username, fill in default answer
    req.body.username = "Unidentified Lawn Bowls User"
  }
  if (req.body.description === " " || req.body.description === "") { //if there is no description, fill in default descriptions
    req.body.description = "No description provided."
  }
  let formData = req.body;

  formData["id"] = nextAvaliableID;
  storedPosts[nextAvaliableID] = formData;
  nextAvaliableID++;
  res.redirect('/posts');

  console.log(storedPosts);
}
//rounds
function generateRounds(numTeams) {
  if (numTeams == 4) {
    rounds =
      [
        [
          { team1: 'TEAM 1', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 3', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 2', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 4', score1: '', score2: '' }
        ]
      ]
    return rounds;
  } else if (numTeams == 6) {
    rounds =
      [
        [
          { team1: 'TEAM 1', team2: 'TEAM 6', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 5', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 4', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 5', score1: '', score2: '' },
          { team1: 'TEAM 6', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 3', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 5', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 6', team2: 'TEAM 2', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 5', team2: 'TEAM 6', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 6', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 5', score1: '', score2: '' }
        ]
      ]
    return rounds;
  } else if (numTeams == 8) {
    rounds =
      [
        [
          { team1: 'TEAM 1', team2: 'TEAM 8', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 7', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 6', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 5', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 7', score1: '', score2: '' },
          { team1: 'TEAM 8', team2: 'TEAM 6', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 5', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 4', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 6', score1: '', score2: '' },
          { team1: 'TEAM 7', team2: 'TEAM 5', score1: '', score2: '' },
          { team1: 'TEAM 8', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 3', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 5', score1: '', score2: '' },
          { team1: 'TEAM 6', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 7', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 8', team2: 'TEAM 2', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 5', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 6', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 7', team2: 'TEAM 8', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 5', team2: 'TEAM 8', score1: '', score2: '' },
          { team1: 'TEAM 6', team2: 'TEAM 7', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 8', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 7', score1: '', score2: '' },
          { team1: 'TEAM 5', team2: 'TEAM 6', score1: '', score2: '' }
        ]
      ]

    return rounds;
  } else {
    rounds =
      [
        [
          { team1: 'TEAM 1', team2: 'TEAM 10', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 9', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 8', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 7', score1: '', score2: '' },
          { team1: 'TEAM 5', team2: 'TEAM 6', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 9', score1: '', score2: '' },
          { team1: 'TEAM 10', team2: 'TEAM 8', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 7', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 6', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 5', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 8', score1: '', score2: '' },
          { team1: 'TEAM 9', team2: 'TEAM 7', score1: '', score2: '' },
          { team1: 'TEAM 10', team2: 'TEAM 6', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 5', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 4', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 7', score1: '', score2: '' },
          { team1: 'TEAM 8', team2: 'TEAM 6', score1: '', score2: '' },
          { team1: 'TEAM 9', team2: 'TEAM 5', score1: '', score2: '' },
          { team1: 'TEAM 10', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 2', team2: 'TEAM 3', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 6', score1: '', score2: '' },
          { team1: 'TEAM 7', team2: 'TEAM 5', score1: '', score2: '' },
          { team1: 'TEAM 8', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 9', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 10', team2: 'TEAM 2', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 5', score1: '', score2: '' },
          { team1: 'TEAM 6', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 7', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 8', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 9', team2: 'TEAM 10', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 4', score1: '', score2: '' },
          { team1: 'TEAM 5', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 6', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 7', team2: 'TEAM 10', score1: '', score2: '' },
          { team1: 'TEAM 8', team2: 'TEAM 9', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 3', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 5', team2: 'TEAM 10', score1: '', score2: '' },
          { team1: 'TEAM 6', team2: 'TEAM 9', score1: '', score2: '' },
          { team1: 'TEAM 7', team2: 'TEAM 8', score1: '', score2: '' }
        ],
        [
          { team1: 'TEAM 1', team2: 'TEAM 2', score1: '', score2: '' },
          { team1: 'TEAM 3', team2: 'TEAM 10', score1: '', score2: '' },
          { team1: 'TEAM 4', team2: 'TEAM 9', score1: '', score2: '' },
          { team1: 'TEAM 5', team2: 'TEAM 8', score1: '', score2: '' },
          { team1: 'TEAM 6', team2: 'TEAM 7', score1: '', score2: '' }
        ]
      ]
    return rounds;
  }
}
function eventRounds(eventNum, data) {
  let num = Number(eventNum);
}
//events
function postingEvent(req, res) {
  if (req.body.tournament === " " || req.body.tournament === "") {
    req.body.tournament = "Unnamed Tournament";
  }
  if (req.body.location === " " || req.body.location === "") {
    req.body.location = "No location provided.";
  }

  let eventData = req.body;
  let numTeams = parseInt(eventData.teams);
  eventData["rounds"] = generateRounds(numTeams); // Add rounds here
  eventData["id"] = nextEventID;
  eventData["password"] = req.body.password;

  storedEvents[nextEventID] = eventData;
  nextEventID++;

  eventRounds(chosenEvent, storedEvents);
  res.redirect('/events');
  console.log(eventData);
}
function chooseEvent(req, res) {
  chosenEvent = Number(req.body.dropdownOption);
  console.log(chosenEvent);
  eventRounds(chosenEvent, storedEvents);
  res.redirect('/events');
}
function configEvent(req, res) {
  let enteredPassword = req.body.password;
  selectedEvent = storedEvents[chosenEvent + 1];

  console.log(chosenEvent);

  if (!selectedEvent) {
    console.log("No event selected.");
    return res.redirect('/wrong');
  }

  if (enteredPassword === selectedEvent.password) {
    console.log("Password correct for event:", selectedEvent.tournament);
    res.redirect('/config');
  } else {
    console.log("Incorrect password for event:", selectedEvent.tournament);
    res.redirect('/wrong');
  }
}
//scores
function updateScores(req, res) {
  let scoreData = req.body.scores;

  if (!scoreData) {
    return res.redirect('/events');
  }

  for (let roundIndex in scoreData) { //chatgpt loop
    for (let matchIndex in scoreData[roundIndex]) {
      let match = selectedEvent.rounds[roundIndex][matchIndex];
      match.score1 = scoreData[roundIndex][matchIndex].score1;
      match.score2 = scoreData[roundIndex][matchIndex].score2;
    }
  }

  res.redirect('/events');
}
//updates
function newUpdate(req, res) {
  if (req.body.title === " " || req.body.title === "") {
    req.body.title = "No title provided";
  }
  if (req.body.update === " " || req.body.update === "") {
    req.body.update = "No update.";
  }

  let formData = req.body;
  formData["id"] = nextUpdateID;
  storedUpdates[nextUpdateID] = formData;
  nextUpdateID++;

  res.redirect('/updates');
  console.log(storedUpdates);
}
//players
function newPlayer(req, res) {
  let formData = req.body;

  let wins = Number(formData.wins) || 0;
  let losses = Number(formData.losses) || 0;
  let draws = Number(formData.draws) || 0;

  let totalGames = wins + losses + draws;

  if (wins > 0 && losses != null && draws != null) {
    formData.winRate = ((wins / totalGames) * 100);
  } else {
    formData.winRate = 'N/A';
  }

  formData["id"] = nextPlayerID;
  storedPlayers[nextPlayerID] = formData;
  nextPlayerID++;
  res.redirect('/players');

  console.log(storedPlayers);
}
function findPlayer(req, res) {
  let targetName = req.body.player && req.body.player.trim().toLowerCase();
  let matchedPlayer = null;

  for (let id in storedPlayers) {
    let player = storedPlayers[id];
    if (player.name && player.name.trim().toLowerCase() === targetName) {
      matchedPlayer = player;
      console.log("FOUND");
      break;  // stop once found
    }
  }

  displayPlayers(req, res, matchedPlayer, null, null);
}
function comparePlayers(req, res) {
  let targetNameOne = req.body.playerOne && req.body.playerOne.trim().toLowerCase();
  let targetNameTwo = req.body.playerTwo && req.body.playerTwo.trim().toLowerCase();

  let matchedPlayerOne = null;
  let matchedPlayerTwo = null;

  for (let id in storedPlayers) {
    let player = storedPlayers[id];
    let name = player.name && player.name.trim().toLowerCase();

    if (name === targetNameOne) {
      matchedPlayerOne = player;
    }
    if (name === targetNameTwo) {
      matchedPlayerTwo = player;
    }

    // Stop early if both are found
    if (matchedPlayerOne && matchedPlayerTwo) break;
  }

  displayPlayers(req, res, null, matchedPlayerOne, matchedPlayerTwo);
}

app.post('/post', posting);
app.post('/create', postingEvent);
app.post('/config', configEvent)
app.post('/choose', chooseEvent);
app.post('/update-scores', updateScores);
app.post('/new-update', newUpdate);
app.post('/new-player', newPlayer);
app.post('/search', findPlayer);
app.post('/compare', comparePlayers)

app.get('/posts', displayPosts);
app.get('/events', displayEvents);
app.get('/players', (req, res) => { displayPlayers(req, res, null, null, null); }); //chatgpt line
app.get('/updates', displayUpdates);
app.get('/wrong', displayWrong);
app.get('/config', displayConfig);

app.get('/post', (req, res) => { res.redirect('/events'); }); //chatgpt line

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/posts');
});