let userResponses = []; // Store user selections

document.addEventListener("DOMContentLoaded", function () {
    const levelSelect = document.getElementById("level");
    const startQuizButton = document.getElementById("startQuiz");

    // Enable the Start Quiz button when a level is selected
    levelSelect.addEventListener("change", function () {
        if (levelSelect.value) {
            startQuizButton.classList.add("active");
            startQuizButton.disabled = false;
        } else {
            startQuizButton.classList.remove("active");
            startQuizButton.disabled = true;
        }
    });

    startQuizButton.addEventListener("click", fetchQuiz);
});

async function fetchQuiz() {
    const level = document.getElementById("level").value;
    if (!level) {
        alert("Please select a jurisdiction level to start the quiz.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:4200/quiz?level=${encodeURIComponent(level)}&level_id=1`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const quizData = await response.json();

        if (!quizData || quizData.length === 0) {
            document.getElementById("quizContainer").innerHTML = "<p>No quiz available for this level.</p>";
            return;
        }

        renderQuiz(quizData);
    } catch (error) {
        console.error("Error fetching quiz:", error);
        document.getElementById("quizContainer").innerHTML = "<p>Failed to load quiz. Please try again later.</p>";
    }
}

let currentQuestionIndex = 0;
let questionsData = [];

function renderQuiz(questions) {
    questionsData = questions;
    currentQuestionIndex = 0;
    userResponses = new Array(questions.length).fill(null); // Initialize responses


    const quizContainer = document.getElementById("quizContainer");
    quizContainer.style.display = "flex";
    quizContainer.style.flexDirection = "column";
    quizContainer.style.alignItems = "center";
    quizContainer.style.justifyContent = "center";
    quizContainer.style.height = "60vh";
    quizContainer.style.margin = "auto";
    quizContainer.style.maxHeight = "250px";

    document.getElementById("levelSelection").style.display = "none";

    displayQuestion();
}

function displayQuestion() {
    const questionWrapper = document.getElementById("questionWrapper");
    const question = questionsData[currentQuestionIndex];

    questionWrapper.innerHTML = `
        <div class="question">
            <p>${currentQuestionIndex + 1}. ${question.description}</p>
        </div>
        <div class="slider-container">
            <input type="range" min="1" max="7" step="1" value="${userResponses[currentQuestionIndex] || 4}" class="slider" id="questionSlider">
            <div class="slider-labels">
                <span>Strongly Disagree</span>
                <span>Disagree</span>
                <span>Somewhat Disagree</span>
                <span>Neutral</span>
                <span>Somewhat Agree</span>
                <span>Agree</span>
                <span>Strongly Agree</span>
            </div>
        </div>
    `;

    const nextButton = document.getElementById("nextButton");
    const submitButton = document.getElementById("submitButton");

    nextButton.disabled = true;
    nextButton.style.opacity = 0.5;
    nextButton.style.pointerEvents = "none";

    submitButton.disabled = true;
    submitButton.style.opacity = 0.5;
    submitButton.style.pointerEvents = "none";

    document.getElementById("questionSlider").addEventListener("input", () => {
        if (currentQuestionIndex === questionsData.length - 1) {
            submitButton.disabled = false;
            submitButton.style.opacity = 1;
            submitButton.style.pointerEvents = "auto";
        } else {
            nextButton.disabled = false;
            nextButton.style.opacity = 1;
            nextButton.style.pointerEvents = "auto";
        }
        userResponses[currentQuestionIndex] = event.target.value;
        updateButtons();
    });

    updateButtons();
}

function navigateQuestion(direction) {
    if (userResponses[currentQuestionIndex] === null) {
        alert("Please select a response before continuing.");
        return;
    }
    currentQuestionIndex += direction;
    displayQuestion();
}

function updateButtons() {
    document.getElementById("nextButton").style.display = (currentQuestionIndex === questionsData.length - 1) ? "none" : "block";
    document.getElementById("submitButton").style.display = (currentQuestionIndex === questionsData.length - 1) ? "block" : "none";
}

async function submitQuiz() {
    if (userResponses.includes(null)) {
        alert("Please complete all questions before submitting.");
        return;
    }

    const responses = questionsData.map((question, index) => ({
        actor_type: "user",
        actor_id: 123,  
        issue_id: question.id,  
        position: getPositionLabel(userResponses[index]),  
        affinity: parseInt(userResponses[index]) - 4  
    }));

    try {
        const API_BASE_URL = "http://localhost:4200"; // Change if needed
        const response = await fetch("http://localhost:4200/quiz", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ responses }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error (${response.status}): ${errorText}`);
        }

        let result;
        try {
            result = await response.json();
        } catch (error) {
            console.error("Failed to parse JSON. Server response:", await response.text());
            alert("Unexpected response from server. Check console for details.");
            return;
        }

        displayResults(result.name, result.score);
    } catch (error) {
        console.error("Error submitting quiz:", error.message);
        alert("Failed to calculate results. Please check your connection and try again.");
    }
}


function getPositionLabel(value) {
    const labels = [
        "Strongly Disagree",
        "Disagree",
        "Somewhat Disagree",
        "Neutral",
        "Somewhat Agree",
        "Agree",
        "Strongly Agree"
    ];
    return labels[value - 1];
}
function displayResults(candidateName, matchScore) {
    const scaledScore = Math.round(matchScore / 3);
    const matchMessage =
        scaledScore >= 0
            ? `Out of all the people in this race, ${candidateName} best represents you and your views!`
            : `Out of all the options in this race, you disagree with ${candidateName} the least!`;

    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = `
        <div class="result-card">
            <h2>Your top match is ${candidateName}! You have a ${scaledScore}% match!</h2>
            <p>${matchMessage}</p>
            <p>See what they say about their key issues:</p>
            <ul id="candidateIssues"></ul>

            <div class="button-container">
                <button onclick="window.location.href='https://www.supportcivic.org'">Support Civic Engagement</button>
                <button onclick="window.location.href='https://www.nass.org/can-I-vote'">Register to Vote</button>
                <button onclick="window.location.href='https://candidate-website.com'">Visit ${candidateName}'s Website</button>
                <button onclick="restartQuiz()">See How You Matched Up With Other Candidates</button>
            </div>
        </div>
    `;
}


function restartQuiz() {
    location.reload();
}
