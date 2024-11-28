var quizData = [
    {
      question: "Which programming language is often used for web development and runs primarily in web browsers?",
      choices: [ "Python" ,  "C++ " , "JavaScript", "Java"],
      correct: 2
    },
    {
      question: "What programming language is known for its use in machine learning and data science?",
      choices: [" Ruby " , "PHP" , "Python" , "Swift"],
      correct: 2
    },
    {
      question: "Which language is primarily used for developing iOS applications?",
      choices: [  "Kotlin" , "Swift","Dart"  , "C#"],
      correct: 1
    },
    {
      question: "What does CSS stand for?",
      choices: ["Computer Style Sheets ","Creative Styling Syntax", "Colorful Style Sheets","Cascading Style Sheets"],
      correct: 3
    }
  ];
  
  var currentQuestionIndex = 0;
  var score = 0;
  
 
  var questionEl = document.getElementById("question");
  var choicesEl = document.getElementById("choices");
  var resultEl = document.getElementById("result");
  var nextBtn = document.getElementById("next");
  var restartBtn = document.getElementById("restart");
  var scoreEl = document.getElementById("score");
  

  function loadQuestion() {
    var currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    resultEl.textContent = "";
  
    currentQuestion.choices.forEach((choice, index) => {
      var listItem = document.createElement("li");
      listItem.innerHTML = `
        <input type="radio" name="choice" id="choice${index}" value="${index}">
        <label for="choice${index}">${choice}</label>
      `;
      choicesEl.appendChild(listItem);
    });
  
    nextBtn.classList.add("hidden");
  }
  
 
  function checkAnswer() {
    var selectedOption = document.querySelector('input[name="choice"]:checked');
    
    if (selectedOption) {
      var answer = parseInt(selectedOption.value);
      var currentQuestion = quizData[currentQuestionIndex];
      
      if (answer === currentQuestion.correct) {
        resultEl.textContent = "Correct! ";
        resultEl.style.color = "green";
        score++;
      } else {
        resultEl.textContent = "Wrong! ";
        resultEl.style.color = "red";
      }
  
      nextBtn.classList.remove("hidden");
  
      if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.textContent = "Finish";
      }
    } else {
      resultEl.textContent = "Please select an answer!";
      resultEl.style.color = "orange";
    }
  }
  
 
  function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showScore();
    }
  }
  
  
  function showScore() {
    questionEl.textContent = "Quiz Complete!";
    choicesEl.innerHTML = "";
    resultEl.textContent = "";
    scoreEl.textContent = `Your Score: ${score}/${quizData.length}`;
    scoreEl.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
  }
  
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    scoreEl.classList.add("hidden");
    restartBtn.classList.add("hidden");
    nextBtn.textContent = "Next";
  }
  
  
  nextBtn.addEventListener("click", nextQuestion);
  choicesEl.addEventListener("change", checkAnswer);
  restartBtn.addEventListener("click", restartQuiz);
  
  loadQuestion();