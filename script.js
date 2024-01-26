const questions = [
    {
        question: "Who is Matt's sweet angel sent from above?",
        answers: [
            { text: "Tyler, the Creator", correct: false },
            { text: "Kylie Witkus", correct: true },
            { text: "Joe Rogan", correct: false },
            { text: "Kyle Simms", correct: false }

        ]
    },
    {
        question: "What year did Matt start snowboarding?",
        answers: [
            { text: "2009", correct: false },
            { text: "2011", correct: false },
            { text: "2014", correct: true },
            { text: "2018", correct: false }

        ]
    },
    {
        question: "Who is Matt's favorite set of twins?",
        answers: [
            { text: "Shane and Colin Tice", correct: false },
            { text: "Nick and Liam Hildebrand", correct: false },
            { text: "Mary Kate and Ashley Olsen", correct: false },
            { text: "Josh and Jesse Fentress", correct: true }

        ]
    },
    {
        question: "What was Matt's rabbits name?",
        answers: [
            { text: "Bunny", correct: true },
            { text: "Whisky", correct: false },
            { text: "Twizzies", correct: false },
            { text: "Malcolm", correct: false }

        ]
    },
    {
        question: "What hospital was Matt born in?",
        answers: [
            { text: "Temple University Hospital", correct: false },
            { text: "Abington Memorial Hospital", correct: true },
            { text: "Franklin Mills Mall Hospital", correct: false },
            { text: "Gwynedd Mercy Hospital", correct: false }

        ]
    },
    {
        question: "What was the name of Matt's first dog?",
        answers: [
            { text: "Poppy", correct: true },
            { text: "Mickey", correct: false },
            { text: "Marley", correct: false },
            { text: "Joe", correct: false }

        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex =0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    };
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?!"
    nextButton.style.display = "block";
}

function handleNextButton() {
   currentQuestionIndex++;
   if(currentQuestionIndex < questions.length){
    showQuestion();
   }else {
    showScore();
   } 
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();