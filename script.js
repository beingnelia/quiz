const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let questions = [];

// Function to load questions from JSON file
function loadQuestions() {
  try {
    const data = fs.readFileSync('questions.json', 'utf8');
    questions = JSON.parse(data).questions;
  } catch (err) {
    console.error('Error reading questions file:', err);
  }
}

// Function to display a question
function displayQuestion(index) {
  const question = questions[index];
  console.log(question.question);
  question.options.forEach((option, idx) => {
    console.log(`${idx + 1}. ${option.text}`);
  });
}

// Function to start the quiz
function startQuiz() {
  let score = 0;
  let currentQuestionIndex = 0;

  loadQuestions();

  function askQuestion() {
    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex);
      rl.question('Enter your answer: ', (answer) => {
        const selectedOption = parseInt(answer);
        if (!isNaN(selectedOption) && selectedOption >= 1 && selectedOption <= questions[currentQuestionIndex].options.length) {
          if (questions[currentQuestionIndex].options[selectedOption - 1].correct) {
            score++;
            console.log('correct');
          }
          else{
            console.log('incorrect')
          }
          currentQuestionIndex++;
          askQuestion();
        } else {
          console.log('Invalid input. Please enter a valid option number.');
          askQuestion();
        }
      });
    } else {
      console.log(`Quiz ended. Your score: ${score}/${questions.length}`);
      rl.close();
    
    }
  }

  askQuestion();
}

// Start the quiz
startQuiz();