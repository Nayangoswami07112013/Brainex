/** 
 * Brainex Quiz JS
 * Features:
 * - Bookmark / Save Progress
 * - Wrong answer shows crying face
 * - Question fade-in animation
 */

let savedData = JSON.parse(localStorage.getItem("brainexProgress"));
let currentQuestion = 0;
let score = 0;

if(savedData){
    if(confirm("You have saved progress. Do you want to continue from where you left off?")){
        currentQuestion = savedData.currentQuestion;
        score = savedData.score;
    } else {
        localStorage.removeItem("brainexProgress");
    }
}

function showQuestion() {
    if(currentQuestion >= questions.length){
        // Quiz completed
        localStorage.removeItem("brainexProgress");
        window.location.href = `/result/${score}`;
        return;
    }

    let q = questions[currentQuestion];
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    // Fade-in animation
    questionText.style.animation = "none";
    void questionText.offsetWidth; // trigger reflow
    questionText.style.animation = "fadeIn 0.5s ease";

    questionText.innerText = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.classList.add("start-btn");
        btn.innerText = option;

        btn.addEventListener("click", () => {
            if(option === q.answer){
                score++;
                currentQuestion++;
                showQuestion();
            } else {
                // WRONG ANSWER: show crying face
                localStorage.removeItem("brainexProgress");

                const container = document.querySelector(".container");
                container.innerHTML = `
                    <h2>Oops! Wrong Answer 😢</h2>
                    <h3>Your Score: ${score}</h3>
                `;
                // Add shake animation class
                container.querySelector("h2").style.animation = "shake 0.5s";

                setTimeout(() => {
                    window.location.href = `/result/${score}`;
                }, 2000);
            }
        });

        optionsContainer.appendChild(btn);
    });
}

// Bookmark button
document.getElementById("bookmark-btn").addEventListener("click", () => {
    localStorage.setItem("brainexProgress", JSON.stringify({
        currentQuestion: currentQuestion,
        score: score
    }));
    alert("Progress saved! You can continue later.");
});

document.addEventListener("DOMContentLoaded", showQuestion);
   