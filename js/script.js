var progressBar = 100 / subjects.length;
const progress = progressBar;

const largePartyNumberOfSeats = 10;


var selectedParties = [];
var question = 0;
var partyPosition = ["pro", "contra", "none"];
var data = [];

var standTitle = document.getElementById("standTitle");
var standStatement = document.getElementById("standStatement");

document.getElementById("progressBar").style.width =
    progressBar.toString() + "%";

standTitle.innerHTML = question + 1 + ". " + subjects[question].title;
standStatement.innerHTML = subjects[question].statement;

subjects.forEach((userInput) => {
    userInput.myOpinion = "";
    userInput.important = false;
});

parties.forEach((party) => {
    party.points = 0;
})

// Starts the Statement questionaire
function start() {
    document.getElementById("startPage").style.display = "none";
    document.getElementById("standPage").style.display = "block";
}
// Goes back to previous statement, if you go all the way back it resets to the starting page.
function backButton() {
    if (question == 0) {
        document.getElementById("startPage").style.display = "block";
        document.getElementById("standPage").style.display = "none";
    } else {
        question = question - 1;
        progressBar = progressBar - progress;
        checkOpinion(subjects[question].myOpinion);
        continueStemWijzer();
    }
}
//Goes to the next statement, if it isn't finished yet it will loop until it is finished.
function nextStatement() {
    if (question < subjects.length - 1) {
        progressBar = progressBar + progress;
        question++;
        checkOpinion(subjects[question].myOpinion);
        continueStemWijzer();
    } else {
        progressBar = 100;
        matchOpinionsToParties();
    }
}

// Gets the opinion that the user entered.
function getOpinion(opinion) {
    subjects[question].myOpinion = opinion;
    nextStatement();
}

function checkOpinion(opinion) {
    for (var opinions = 0; opinions < partyPosition.length; opinions++) {
        document.getElementById(partyPosition[opinions]).style.setProperty("background-color", "black", "important");
    }
    if (opinion == '') {
        return;
    } else {
        document.getElementById(opinion).style.setProperty("background-color", "#018aa9", "important");
    }
}

// Shows the next question on the page.
function continueStemWijzer() {
    standTitle.innerHTML = question + 1 + ". " + subjects[question].title;
    standStatement.innerHTML = subjects[question].statement;

    document.getElementById("progressBar").style.width =
        progressBar.toString() + "%";
}


function matchOpinionsToParties() {
    //Gets all the question answers from the subject and the opinion from the party
    subjects.forEach((subject => {
        parties.forEach((function (party, partyIndex) {
            //Checks if the opinion that the subject entered is the same as a party, if so adds a point.
            if (subject.myOpinion == subject.parties[partyIndex].position) {
                var partyScore = parties.find(party => party.name == subject.parties[partyIndex].name)
                partyScore.points += 1;
            }
        }))
    }))
    showPartySelection();
}

function showPartySelection() {
    document.getElementById("standPage").style.display = "none";
    document.getElementById("partySelectionPage").style.display = "block";
};


function getAllParties() {
    selectedParties = [];
    selectedParties = parties;
};

function getBigParties() {
    selectedParties = [];
    selectedParties = parties.filter(party => party.size >= largePartyNumberOfSeats);
};

function getSecularParties() {
    selectedParties = [];
    selectedParties = parties.filter(party => party.secular == true);
};


// Shows the results.
function showResults() {
    document.getElementById("partySelectionPage").style.display = "none";
    document.getElementById("resultsPage").style.display = "block";

    //Puts the results from parties into a variable
    if (selectedParties.length == 0) {
        selectedParties = parties;
    }
    console.log(selectedParties);
    //Puts the results from selectedParties into the HTML page and logs it in the console as well.
    document.getElementById('party1stPlace').innerHTML += selectedParties[0].name;
    document.getElementById('party2ndPlace').innerHTML += selectedParties[1].name;
    document.getElementById('party3rdPlace').innerHTML += selectedParties[2].name;
}
