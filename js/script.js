/**
 * All the variables and constants we need are declared right at the start of the script.
 */

// The ProgressBar var and progress const are defined here to keep track of the progress bar in the quiz dynamically.
var progressBar = 100 / subjects.length;
const progress = progressBar;

// Here we declare how many seats a party should have before they're considered a "big" party.
const largePartyNumberOfSeats = 10;

// Standard variables that are required for the script to work.
var selectedParties = [];
var question = 0;
var partyPosition = ["pro", "contra", "none"];
var data = [];


// Gets the ids from the HTML page for standTitle and standStatement
var standTitle = document.getElementById("standTitle");
var standStatement = document.getElementById("standStatement");

// Gets the id for the progress bar, using the toString() command it changes the width of the bar according to how far along you are in the quiz.
document.getElementById("progressBar").style.width =
    progressBar.toString() + "%";

// Displays the title of the question and clarification.
standTitle.innerHTML = question + 1 + ". " + subjects[question].title;
standStatement.innerHTML = subjects[question].statement;

subjects.forEach((userInput) => {
    userInput.myOpinion = "";
    userInput.important = false;
});

parties.forEach((party) => {
    party.points = 0;
})

/*  Starts the Statement questionaire */
function start() {
    document.getElementById("startPage").style.display = "none";
    document.getElementById("standPage").style.display = "block";
}
/* Goes back to previous statement, if you go all the way back it resets to the starting page. */
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
/* Goes to the next statement, if it isn't finished yet it will loop until it is finished. */
function nextStatement() {
    if (question < subjects.length - 1) {
        progressBar = progressBar + progress;
        document.getElementById('importantCheckBox').checked = false;
        question++;
        checkOpinion(subjects[question].myOpinion);
        continueStemWijzer();
    } else {
        progressBar = 100;
        matchOpinionsToParties();
    }
}

/* Gets the opinion that the user entered. */
function getOpinion(opinion) {
    subjects[question].myOpinion = opinion;
    subjects[question].important = document.getElementById('importantCheckBox').checked;
    nextStatement();
}

/* Stores the opinion that the user has entered in memory, so if you go back to the previous question it will remember what you had entered before.*/
function checkOpinion(opinion) {
    document.getElementById('importantCheckBox').checked = false;
    for (var opinions = 0; opinions < partyPosition.length; opinions++) {
        document.getElementById(partyPosition[opinions]).style.setProperty("background-color", "black", "important");
    }
    if (opinion == '') {
        return;
    } else {
        document.getElementById(opinion).style.setProperty("background-color", "#018aa9", "important");
    }
}

/* Shows the next question on the page. */
function continueStemWijzer() {
    standTitle.innerHTML = question + 1 + ". " + subjects[question].title;
    standStatement.innerHTML = subjects[question].statement;

    document.getElementById("progressBar").style.width =
        progressBar.toString() + "%";
}

/* Matches the opinions that the user entered to the opinions of the parties, if they are the same it adds either one or two point.*/
function matchOpinionsToParties() {
    //Gets all the question answers from the subject and the opinion from the party
    subjects.forEach((subject => {
        parties.forEach((function (party, partyIndex) {
            //Checks if the opinion that the subject entered is the same as a party, if so adds a point, if the important checkbox was checked, it adds 2 points.
            if (subject.myOpinion == subject.parties[partyIndex].position) {
                var partyScore = parties.find(party => party.name == subject.parties[partyIndex].name)
                if (subject.important == true) {
                    partyScore.points += 2;
                }
                else {
                    partyScore.points += 1;
                }
            }
        }))
    }))
    showPartySelection();
}


/* Shows the party selection page where you can select what parties you want to take into consideration */
function showPartySelection() {
    document.getElementById("standPage").style.display = "none";
    document.getElementById("partySelectionPage").style.display = "block";
};


/* Picks all parties available and stores them in a array.*/

function getAllParties() {
    changeButtonColor("allParties");
    selectedParties = [];
    selectedParties = parties;
};

/* Picks all parties with a size above the const largePartyNumbersOfSeats and stores them in a array.*/

function getBigParties() {
    changeButtonColor("bigParties");
    selectedParties = [];
    selectedParties = parties.filter(party => party.size >= largePartyNumberOfSeats);
};


/* Picks all parties that are secular and stores them in a array.*/

function getSecularParties() {
    changeButtonColor("secularParties");
    selectedParties = [];
    selectedParties = parties.filter(party => party.secular == true);
};


/* Highlights the choice you made on the Party Selection screen. */

function changeButtonColor(partyType) {
    for (var buttons = 0; buttons < document.getElementsByClassName('filterBtn').length; buttons++) {
        document.getElementsByClassName('filterBtn')[buttons].style.setProperty("background-color", "black", "important");
        document.getElementsByClassName('filterBtn')[buttons].style.setProperty("color", "white", "important");
    }
    document.getElementById(partyType).style.setProperty("background-color", "#018aa9", "important");
}

/* Shows the results. */
function showResults() {
    document.getElementById("partySelectionPage").style.display = "none";
    document.getElementById("resultsPage").style.display = "block";

    //Puts the results from parties into a variable
    if (selectedParties.length == 0) {
        selectedParties = parties;
    }
    console.log(selectedParties);
    //Puts the top 3 results from selectedParties into the HTML page and logs it in the console as well.
    document.getElementById('party1stPlace').innerHTML += selectedParties[0].name;
    document.getElementById('party2ndPlace').innerHTML += selectedParties[1].name;
    document.getElementById('party3rdPlace').innerHTML += selectedParties[2].name;
}
