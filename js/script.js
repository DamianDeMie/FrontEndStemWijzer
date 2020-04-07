var progressBar = 100 / subjects.length;
const progress = progressBar;
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
        continueStemWijzer();
    }
}

function nextStatement() {
    if (question < subjects.length - 1) {
        progressBar = progressBar + progress;
        question++;
        continueStemWijzer();
    } else {
        progressBar = 100;
        showResults();
    }
}

function getOpinion(opinion) {
    subjects[question].myOpinion = opinion;
    nextStatement();
}

function continueStemWijzer() {
    standTitle.innerHTML = question + 1 + ". " + subjects[question].title;
    standStatement.innerHTML = subjects[question].statement;

    document.getElementById("progressBar").style.width =
        progressBar.toString() + "%";
}

function showResults() {
    document.getElementById("standPage").style.display = "none";
    document.getElementById("resultsPage").style.display = "block";
    console.log(subjects);
}
