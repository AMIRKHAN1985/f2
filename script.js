// Selecting Elements
var startButton = document.querySelector(".startButton");
var displayBox = document.querySelector(".displayBox");
var quitButton = displayBox.querySelector(".quit");
var resultButton = document.querySelector(".result");
var continueButton = displayBox.querySelector(".continue");
var quizBox = document.querySelector(".quizBox");
var answerList = document.querySelector(".answerList");
var currentQuestionCounter = quizBox.querySelector(".questionNumberOn");
var timerCount = quizBox.querySelector(".timerSeconds");
var result = document.querySelector(".scoreResults");
var userScore = document.querySelector(".answersCorrect");
var userInitialsInput = document.getElementById("inputInitials");
var submitButton = document.querySelector(".submitButton");
var highscore = document.querySelector(".highscore");
var viewHighscore = document.querySelector(".viewHighscore");
var usersList = document.querySelector(".users");
var deleteScores = document.querySelector(".deleteScores");
var backButton = document.querySelector(".backButton");
var inputContent = document.querySelector(".inputContent");
var finishText = document.querySelector(".finishText");
const qImg = document.getElementById("qImg");
var questionCounter = 0;
var counter;
const useranswer = [];
var gameSetting = {
    score: 0,
    timeTotal: 10
}

// Start Quiz Button Click Functionality
// displays "Display Box"
// starts timer
startButton.onclick = function () {
    displayBox.classList.add("activeDisplayBox");
}

// Exit Quiz Button Click Functionality
// hides "Display Box"
quitButton.onclick = function () {
    displayBox.classList.remove("activeDisplayBox");
}

answerList.addEventListener('click', (event) => {
    if (event.target.matches('.answer')) {
        if (questionCounter < questions.length - 1) {
            questionCounter++;
            currentQuestionCounter.innerHTML = questionCounter + 1;
            displayQuestions(questionCounter);
        } else {
            showScoreResults();
        }
    }
})

resultButton .addEventListener('click', (event) => {

    displayresult()
  
    
    
        } 
)

// Continue Button Click Functionality
//displays "Quiz Box"
continueButton.addEventListener('click', (event) => {
    event.preventDefault();
    displayBox.classList.remove("activeDisplayBox");
    quizBox.classList.add("activeQuizBox");
    startTimer();
    displayQuestions(0);
    finishText.innerHTML = 'You finished the quiz!'
})

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (userInitialsInput.value && userInitialsInput.value !== '') {
        const users = JSON.parse(localStorage.getItem('users'))
        localStorage.setItem('users', JSON.stringify([{
            name: userInitialsInput.value,
            num: userScore.innerHTML
        }, ...(users || [])]));
        viewHighscore.classList.remove('hide');
        submitButton.classList.add('hide');
        userInitialsInput.remove();
        inputContent.innerHTML = 'Registered User Successfully!'
    }
})

viewHighscore.addEventListener('click', (event) => {
    event.preventDefault();
    result.classList.remove('activeResults');
    highscore.classList.add('activeHighScore');
    const users = JSON.parse(localStorage.getItem('users'))
    if (users) {
        const getAllUsers = users.sort((a, b) => b.num - a.num).map((element, index) => {
            return (
                `<li class="user">
                    <span>${index + 1}. ${element.name}</span>
                    <span>${element.num}</span>
                </li>`
            )
        })
        usersList.innerHTML = getAllUsers.join(' ')
    } else {
        usersList.innerHTML = `<li>No HighScore</li>`
    }
})



backButton.addEventListener('click', (event) => {
    event.preventDefault();
    result.classList.add("activeResults")
    highscore.classList.remove("activeHighScore")
})

// grabbing questions and answers from 'questions' array
function displayQuestions(index) {
    var questionText = document.querySelector(".question");
    var questionElement = '<span>' + questions[index].numberQuestion + ". " + questions[index].question + '</span>';
    var questioncode = `<div class="answer"><pre><code>${questions[index].code}</code></pre></div>`;
    var answerElement = `<div class="answer">${questions[index].answer[0]}<span></span></div>
    <div class="answer">${questions[index].answer[1]}<span></span></div>
    <div class="answer">${questions[index].answer[2]}<span></span></div>
    <div class="answer">${questions[index].answer[3]}<span></span></div>`;
   
    qImg.innerHTML = questioncode;
    questionText.innerHTML = questionElement;
    answerList.innerHTML = answerElement;

    var allAnswers = answerList.querySelectorAll(".answer");
    for (var i = 0; i < allAnswers.length; i++) {
        allAnswers[i].setAttribute('onclick', 'answerSelected(this)');
    }
}

function displayresult() {
    result.innerHTML =`<br>
    <div class = "result1"> <div style="color: blue" class="answer"><pre><code>${questions[0].numberQuestion + ". " + questions[0].question}</code></pre><span></span></div>
    <div class="answer"><pre><code>${questions[0].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[0]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[0].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[1].numberQuestion + ". " + questions[1].question}<span></span></div>
    <div class="answer"><pre><code>${questions[1].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[1]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[1].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[2].numberQuestion + ". " + questions[2].question}<span></span></div>
    <div class="answer"><pre><code>${questions[2].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[2]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[2].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[3].numberQuestion + ". " + questions[3].question}<span></span></div>
    <div class="answer"><pre><code>${questions[3].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer: ${useranswer[3]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer: ${questions[3].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[4].numberQuestion + ". " + questions[4].question}<span></span></div>
    <div class="answer"><pre><code>${questions[4].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[4]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[4].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[5].numberQuestion + ". " + questions[5].question}<span></span></div>
    <div class="answer"><pre><code>${questions[5].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[5]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[5].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[6].numberQuestion + ". " + questions[6].question}<span></span></div>
    <div class="answer"><pre><code>${questions[6].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[6]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[6].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[7].numberQuestion + ". " + questions[7].question}<span></span></div>
    <div class="answer"><pre><code>${questions[7].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[7]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[7].correctAnswer}<span></span></div>

    <br>
    <div style="color: blue" class="answer">${questions[8].numberQuestion + ". " + questions[8].question}<span></span></div>
    <div class="answer"><pre><code>${questions[8].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[8]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[8].correctAnswer}<span></span></div>

    <br>
    <div style="color: blue" class="answer">${questions[9].numberQuestion + ". " + questions[9].question}<span></span></div>
    <div class="answer"><pre><code>${questions[9].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[9]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[9].correctAnswer}<span></span></div></div>




    `;
    
}

// comparing user selected answer to correct answer
function answerSelected(answer) {
    var userResponse = answer.textContent;
    useranswer.push(userResponse)
    var correctResponse = questions[questionCounter].correctAnswer;
    if (userResponse == correctResponse) {
        gameSetting.score++;
    } else {
        // gameSetting.timeTotal -= 5;
        //pass
        gameSetting.score=gameSetting.score-0.25;
    }
}
// hides display box, quizbox, and shows results
function showScoreResults() {
    displayBox.classList.remove("activeDisplayBox")
    quizBox.classList.remove("activeQuizBox")
    result.classList.add("activeResults")
    userScore.innerHTML = gameSetting.score;
}

// create functionality to timer
function startTimer(resetTimer) {
    counter = setInterval(timer, 10000*6)
    function timer() {
        if (resetTimer) {
            clearInterval(counter);
        }
        timerCount.textContent = gameSetting.timeTotal;
        gameSetting.timeTotal--;
        if (gameSetting.timeTotal < 9) {
            var singleNumber = timerCount.textContent;
            timerCount.textContent = "0" + singleNumber;
        }
        if (gameSetting.timeTotal < 0) {
            clearInterval(counter);
            timerCount.textContent = "00";
        }
    }
}


let defaultInterval = () => setInterval(() => {
    const activeResultsPage = document.querySelector('.activeResults')
    const activeHighScorePage = document.querySelector('.activeHighScore')
    if (activeResultsPage || activeHighScorePage) {
        clearInterval(defaultInterval);
    } else if (timerCount.innerHTML === "00") {
        result.classList.add('activeResults');
        quizBox.classList.remove('activeQuizBox');
        userScore.innerHTML = gameSetting.score;
        finishText.innerHTML = 'You ran out of time!'
        clearInterval(defaultInterval);
    }
}, 1000);
defaultInterval()
// Questions and Answers
var questions = [
    {
        numberQuestion: 1,
        question: `What will be the output of the following Python code?`,
        code:`import collections
a=collections.namedtuple('a',['i','j'])
obj=a(i=4,j=7)
print(obj)`,
        imgSrc : "q1.png",
        correctAnswer: "A) "+"a(i=4, j=7)",
        answer: [
            "A) "+"a(i=4, j=7)",
            "B) "+"obj(i=4, j=7)",
            "C) "+"(4,7)",
            "D) "+"An exception is thrown"
        ]
    },
    {
        numberQuestion: 2,
        question: `What will be the output of the following code snippet?`,
        code:`init_tuple_a = '1', '2'
init_tuple_b = ('3', '4')

print (init_tuple_a + init_tuple_b)`,
        imgSrc : "q2.png",
        correctAnswer: "B) "+"(‘1’, ‘2’, ‘3’, ‘4’)",
        answer: [
            "A) "+"(1, 2, 3, 4)",
            "B) "+"(‘1’, ‘2’, ‘3’, ‘4’)",
            "C) "+"[‘1’, ‘2’, ‘3’, ‘4’]",
            "D) "+"None"
        ]
    },
    {
        numberQuestion: 3,
        question: `What will be the output of the following code snippet?`,
        code:`init_tuple_a = 1, 2
init_tuple_b = (3, 4)

[print(sum(x)) for x in [init_tuple_a + init_tuple_b]]`,
        imgSrc : "q3.png",
        correctAnswer: "C) "+"10",
        answer: [
            "A) "+"Nothing gets printed.",
            "B) "+"4",
            "C) "+"10",
            "D) "+"TypeError: unsupported operand type"
        ]
    },
    {
        numberQuestion: 4,
        question: `What will be the output of the following code snippet?`,
        code:`init_tuple = (1,) * 3

init_tuple[0] = 2

print(init_tuple)`,
        imgSrc : "q4.png",
        correctAnswer: "D) "+"TypeError: ‘tuple’ object does not support item assignment",
        answer: [
            "A) "+"(1, 1, 1)",
            "B) "+"(2, 2, 2)",
            "C) "+"(2, 1, 1)",
            "D) "+"TypeError: ‘tuple’ object does not support item assignment"
        ]
    },
    {
        numberQuestion: 5,
        question: `If a=(1,2,3,4), a[1:-1] is _________`,
        code:``,
        imgSrc : "na.png",
        correctAnswer: "D) "+"(2,3)",
        answer: [
            "A) "+"Error, tuple slicing doesn’t exist",
            "B) "+"[2,3]",
            "C) "+"(2,3,4)",
            "D) "+"(2,3)"
        ]
    },
    {
        numberQuestion: 6,
        question: `What will be the output of the following Python code?`,
        code:`a=(1,2,(4,5))
b=(1,2,(3,4))
a<b`,
        imgSrc : "na.png",
        correctAnswer: "A) "+"False",
        answer: [
            "A) "+"False",
            "B) "+"True",
            "C) "+"Error, < operator is not valid for tuples",
            "D) "+"Error, < operator is valid for tuples but not if there are sub-tuples"
        ]
    },
    {
        numberQuestion: 7,
        question: `What will be the output of the following Python code?`,
        code:`t = (1, 2, 4, 3, 8, 9)
[t[i] for i in range(0, len(t), 2)]`,
        imgSrc : "na.png",
        correctAnswer: "C) "+"[1, 4, 8]",
        answer: [
            "A) "+"[2, 3, 9]",
            "B) "+"[1, 2, 4, 3, 8, 9]",
            "C) "+"[1, 4, 8]",
            "D) "+"(1, 4, 8)"
        ]
    },
    {
        numberQuestion: 8,
        question: `What will be the output of below Python code?`,
        code:`tupl=("annie","hena","sid")

print(tupl[-3:0])`,
        imgSrc : "q8.png",
        correctAnswer: "B) "+"()",
        answer: [
            "A) "+"("annie")",
            "B) "+"()",
            "C) "+"None",
            "D) "+"Error as slicing is not possible in tuple."
        ]
    },
    {
        numberQuestion: 9,
        question: `What will be the output of below Python code?`,
        code:`tupl=([2,3],"abc",0,9)

tupl[0][1]=1

print(tupl)`,
        imgSrc : "na.png",
        correctAnswer: "C) "+"([2,1],"abc",0,9)",
        answer: [
            "A) "+"([2,3],"abc",0,9)",
            "B) "+"([1,3],"abc",0,9)",
            "C) "+"([2,1],"abc",0,9)",
            "D) "+"Error"
        ]
    },
    {
        numberQuestion: 10,
        question: `Which of the following options will not result in an error when performed on tuples in Python where tupl=(5,2,7,0,3)?`,
        code:``,
        imgSrc : "na.png",
        correctAnswer: "C) "+"tupl1=tupl+tupl",
        answer: [
            "A) "+"tupl[1]=2",
            "B) "+"tupl.append(2)",
            "C) "+"tupl1=tupl+tupl",
            "D) "+"tupl.sort()"
        ]
    }
]
