let currentQuestionIndex = 0; // Current question index
const selectedQuestions = [
  { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: "4" },
  { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
  { question: "Who wrote '1984'?", answers: ["George Orwell", "Aldous Huxley", "J.K. Rowling", "Ernest Hemingway"], correct: "George Orwell" },
  { question: "What is the smallest planet in our solar system?", answers: ["Earth", "Mars", "Mercury", "Venus"], correct: "Mercury" },
  { question: "What is the hardest natural substance?", answers: ["Gold", "Iron", "Diamond", "Platinum"], correct: "Diamond" },
];
let score = 0; // User's score
let userAnswers = []; // Array to store the user's answers for each question

let resultsVisible = false; // Track whether the results are visible

// Function to update the progress bar
function updateProgressBar() {
  const progress = (currentQuestionIndex / selectedQuestions.length) * 100; // Calculate percentage
  document.getElementById('progress-bar').style.width = progress + '%'; // Apply to progress bar
}

// Function to load the current question and answers
function loadQuestion() {
  const currentQuestion = selectedQuestions[currentQuestionIndex]; // Get the current question
  document.getElementById('question').textContent = currentQuestion.question; // Display question

  const answerList = document.getElementById('answer-list');
  answerList.innerHTML = ''; // Clear previous answers
  currentQuestion.answers.forEach(answer => {
    const li = document.createElement('li');
    li.textContent = answer;
    li.onclick = () => checkAnswer(answer); // Attach click handler to each answer
    answerList.appendChild(li);
  });
}

// Function to check the selected answer and move to the next question
function checkAnswer(selectedAnswer) {
  const currentQuestion = selectedQuestions[currentQuestionIndex]; // Get current question

  // Store user's answer
  userAnswers.push({ question: currentQuestion.question, answer: selectedAnswer, correct: selectedAnswer === currentQuestion.correct });

  if (selectedAnswer === currentQuestion.correct) {
    score++; // Increase score if correct
    document.getElementById('score').textContent = score; // Update score display
  }

  nextQuestion(); // Go to the next question
}

// Function to move to the next question
function nextQuestion() {
  if (currentQuestionIndex < selectedQuestions.length - 1) {
    currentQuestionIndex++; // Move to the next question
    loadQuestion(); // Load next question
    updateProgressBar(); // Update progress bar
  } else {
    showResults(); // End the quiz if there are no more questions
  }
}

// Function to show the results at the end of the quiz
function showResults() {
  // Hide the question and answers section
  document.getElementById('question-container').style.display = 'none';

  // Make the progress bar fully green
  document.getElementById('progress-bar').style.width = '100%';

  // Show the final score
  const resultDiv = document.createElement('div');
  resultDiv.id = 'result-div'; // Add id for easy manipulation later
  resultDiv.innerHTML = `<h2>Quiz Complete!</h2><p>Your final score is: ${score} out of ${selectedQuestions.length}</p>`;
  document.body.appendChild(resultDiv);

  // Add a "View Results" button
  const viewResultsButton = document.createElement('button');
  viewResultsButton.textContent = 'View Results';
  viewResultsButton.onclick = toggleResults; // Toggle results when clicked
  document.body.appendChild(viewResultsButton);

  // Hide the "Next Question" button
  document.getElementById('next-btn').style.display = 'none';
}

// Function to toggle the visibility of the detailed results
function toggleResults() {
  const detailedResultsDiv = document.getElementById('detailed-results');
  const questionContainer = document.getElementById('question-container'); // Get question container
  const resultDiv = document.getElementById('result-div'); // Get results div

  if (resultsVisible) {
    // Hide results
    detailedResultsDiv.style.display = 'none';
    resultDiv.style.display = 'none';
    questionContainer.style.display = 'block'; // Show questions again
    document.querySelector('button').textContent = 'View Results'; // Change button text back
    document.getElementById('next-btn').style.display = 'inline'; // Show "Next Question" button again
  } else {
    // Show results
    if (!detailedResultsDiv) {
      const newDetailedResultsDiv = document.createElement('div');
      newDetailedResultsDiv.id = 'detailed-results';
      newDetailedResultsDiv.innerHTML = `<h2>Detailed Results</h2>`;

      userAnswers.forEach((result, index) => {
        const resultText = `<p>Question: ${result.question}</p>
                           <p>Your Answer: ${result.answer}</p>
                           <p>${result.correct ? 'Correct' : 'Incorrect'}</p><hr>`;
        newDetailedResultsDiv.innerHTML += resultText;
      });

      document.body.appendChild(newDetailedResultsDiv);
    } else {
      detailedResultsDiv.style.display = 'block';
    }

    document.querySelector('button').textContent = 'Close Results'; // Change button text to "Close Results"
    questionContainer.style.display = 'none'; // Hide questions when results are shown
    resultDiv.style.display = 'block'; // Show the final score
    document.getElementById('next-btn').style.display = 'none'; // Hide "Next Question" button
  }

  // Toggle the state
  resultsVisible = !resultsVisible;
}

// Start the quiz by loading the first question
document.addEventListener('DOMContentLoaded', () => {
  loadQuestion(); // Initial question load when the page is ready
  updateProgressBar(); // Initialize progress bar
});
