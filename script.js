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
        question: `Consider the input_linked_list:
input_linked_list: 1->4->9->16
What will be the value of the elements in the input_linked_list after the function fun() 
is invoked by passing the head of the input_linked_list as an argument?`,
        code:`def fun(head):
        next_node = head.get_next()
        while(head!=None and next_node != None):
            head.set_data(head.get_data()+next_node.get_data())
            head = head.get_next()
            next_node = head.get_next()
            if(next_node != None):
                head.set_data(head.get_data()+next_node.get_data())
     
    Note: Order of displaying the elements is from head to tail.`,
        imgSrc : "q1.png",
        correctAnswer: "C) "+"5 22 41 16",
        answer: [
            "A) "+"5 13 25 16",
            "B) "+"27 22 41 57",
            "C) "+"5 22 41 16",
            "D) "+"5 22 41 57"
        ]
    },
    {
        numberQuestion: 2,
        question: `What is the output of following function when head node of following linked list is passed as input?
        1->2->3->4->5`,
        code:`def fun(head):
        if(head==None):
            return
        if head.get_next().get_next()!= None:
            print(head.get_data()," ", end='')
            fun(head.get_next())
        print(head.get_data()," ",end='')`,
        imgSrc : "q2.png",
        correctAnswer: "B) "+"1 2 3 4 3 2 1",
        answer: [
            "A) "+"1 2 3 4 3 2",
            "B) "+"1 2 3 4 3 2 1",
            "C) "+"1 2 3 4",
            "D) "+"1 2 3 4 4 3 2"
        ]
    },
    {
        numberQuestion: 3,
        question: `What will be the order of elements in the linked list after line 19?`,
        code:`def fun(prv,nxt,data):
        if(nxt==None):
            return
        if(nxt.get_data()==data):
            global sample
            sample.add(data)
            prv.set_next(nxt.get_next())
            return
        else:
            fun(nxt,nxt.get_next(),data)
     
sample=LinkedList()
sample.add(10)
sample.add(20)
sample.add(5)
sample.add(55)
sample.add(38)
sample_head=sample.get_head()
fun(sample_head, sample_head,5)`,
        imgSrc : "q3.png",
        correctAnswer: "A) "+"10 20 55 38 5",
        answer: [
            "A) "+"10 20 55 38 5",
            "B) "+"10 20 55 5 38",
            "C) "+"10 20 55 38 38",
            "D) "+"10 20 5 55 38"
        ]
    },
    {
        numberQuestion: 4,
        question: `What does the below function using the Stack datastructure do?`,
        code:`def fun(n):
        stack = Stack(100)
        while (n > 0):
            stack.push(n%10)
            n =int (n/10)
        result=0
        while (not stack.is_empty()):
            result+=stack.pop()
        return result`,
        imgSrc : "q4.png",
        correctAnswer: "A) "+"Takes a number 'n' as input and returns the sum of its digits",
        answer: [
            "A) "+"Takes a number 'n' as input and returns the sum of its digits",
            "B) "+"Takes a number 'n' as input and returns 0 if it is divisible by 10",
            "C) "+"Takes a number 'n' as input and returns the sum of all its digits divisible by 10",
            "D) "+"Takes a number 'n' as input and divides each digit of the number by 10 and returns the sum of result of each division operation"
        ]
    },
    {
        numberQuestion: 5,
        question: `Consider Python code shown left:
What will be the status of output_stack after execution of above code?
Assumption: All the references to the necessary files are available
Note: Consider that the elements of stack in the options are shown from top to bottom`,
        code:`def process(input_stack);
        output_stack=Stack(5)
        count = 0
        while(not input_stack.is_empty()):
            temp=input_stack.pop()
            for i in temp:
                count += 1
            output_stack.push(str(count)+temp)
        return output_stack
    
input_stack=Stack(5)
input_stack.push("India")
input_stack.push("Australia")
input_stack.push("England")
input_stack.push("SouthAfrica")  
process(input_stack).display()`,
        imgSrc : "na.png",
        correctAnswer: "D) "+"32India-->27Australia-->18England-->11SouthAfrica",
        answer: [
            "A) "+"11SouthAfrica-->18England-->27Australia-->32India",
            "B) "+"5India-->9Australia-->7England-->11SouthAfrica",
            "C) "+"11SouthAfrica-->7England-->9Australia-->5India",
            "D) "+"32India-->27Australia-->18England-->11SouthAfrica"
        ]
    },
    {
        numberQuestion: 6,
        question: `Number 14 needs to be searched using BINARY SEARCH in the following sorted list of numbers:

1, 3, 7, 9, 14, 19, 45
        
How many comparisons will be required to conclude that the number 14 is found at 5th position?
        
Note: We have used integer division for finding the middle element and the index starts with 0 (zero)`,
        code:``,
        imgSrc : "na.png",
        correctAnswer: "B) "+"3",
        answer: [
            "A) "+"2",
            "B) "+"3",
            "C) "+"4",
            "D) "+"1"
        ]
    },
    {
        numberQuestion: 7,
        question: `Consider the following inputs:
input_linked_list (Head to Tail): 1 -> 2 -> 5 -> 3
input_stack (Top to Bottom): 4, 2, 5, 10
What will be the content of Input_linked_list from head to tail and input_stack from top to bottom 
after the execution of the function generate?
Assumption: Stack and LinkedList classes, with the necessary methods, are available`,
        code:`def generate (input_linked_list , input_stack):
            temp= input_linked_list.get_head ( )
            element=0
            while(temp.get_next ( ) is not None):
                temp.set_data (temp.get_data ( )+temp.get_next ( ). get_data ( )+element)
                if temp.get_data ( ) %2 !=0:
                    temp.set_data(temp.get_data ( ) +input_stack.pop ( ) )
                    element=temp.get_data ( )
                else:
                    input_stack.push (element )
                    element=temp.get_next ( ).get_data ( )
                temp=temp.get_next ( )
            temp.set_data(temp.get_data ( )+input_stack.pop ( ) `,
        imgSrc : "na.png",
        correctAnswer: "B) "+"input_linked_list (Head to Tail): 7 -> 14 -> 20 -> 5 and input_stack (Top of Bottom): 5, 10",
        answer: [
            "A) "+"input_linked_list (Head to Tail): 7 -> 14 -> 20 -> 5 and input_stack (Top of Bottom): 5, 10",
            "B) "+"input_linked_list (Head to Tail): 5 -> 7 -> 10 -> 5 and input_stack (Top of Bottom): 2, 5, 10",
            "C) "+"input_linked_list (Head to Tail): 7 -> 14 -> 20 -> 3 and input_stack (Top of Bottom): 5, 10",
            "D) "+"input_linked_list (Head to Tail): 7 -> 14 -> 20 -> 5 and input_stack (Top of Bottom): 10"
        ]
    },
    {
        numberQuestion: 8,
        question: `Which of the following statements can replace Line1 and Line2 in the below Python code to get output as ‘kcjh’?`,
        code:`def func1(st1):
        stack1=Stack(len(st1))
        result=""
        for ch in st1:
            if(ch!="a" and ch!="e" and ch!="i" and ch!="o" and ch!="u"):
                #Line1
            if(ch == "#"):
                    #line2
        while(not stack1.is_empty()): 
              result+=stack1.pop( )
         print ( result )
str="hi##jack"
func1 ( str )`,
        imgSrc : "q8.png",
        correctAnswer: "C) "+"Line 1: stack1.push(ch) Line2: stack1.pop()",
        answer: [
            "A) "+"Line 1: stack1.pop() Line2: stack1.push(ch)",
            "B) "+"Line 1: stack1.push(ch) Line2: stack1.push(ch)",
            "C) "+"Line 1: stack1.push(ch) Line2: stack1.pop()",
            "D) "+"Line 1: stack1.pop() Line2: stack1.pop()"
        ]
    },
    {
        numberQuestion: 9,
        question: `Consider the Hashing methods given in left:`,
        code:`i)  h(key) = key%10

ii) h(key) = key%25
        
iii) h(key) = key%50
        
Which of the hashing methods would NOT lead to collision when the following values are to be stored in the hash table?
        
80, 20, 35, 45, 25, 90`,
        imgSrc : "na.png",
        correctAnswer: "A) "+"Only iii)",
        answer: [
            "A) "+"Only iii)",
            "B) "+"Both ii) and iii)",
            "C) "+"Both i) and iii)",
            "D) "+"All i), ii) and iii)"
        ]
    },
    {
        numberQuestion: 10,
        question: `Given the following linked list
what  is the output of following python function when the head node of the given linked_list are passed as input.
linked_list: 1->2->3->4->5
Assumption: Linked List class , with the necessary methods, is available.`,
        code:`def function(head):
        if head is None:
            return
        if head.get_next().get_next() is not None:
            print(head.get_data(),end=" ")
            function(head.get_next())
        print(head.get_data(),end=" ")`,
        imgSrc : "na.png",
        correctAnswer: "B) "+"1 2 3 4 3 2 1",
        answer: [
            "A) "+"1 2 3 4 3 2",
            "B) "+"1 2 3 4 3 2 1",
            "C) "+"1 2 3 4",
            "D) "+"1 2 3 4 4 3 2"
        ]
    }
]