let correctAnswer;
let checkAnswer;
let questionsDiv;
let clearBtn;
let correctNumber = (localStorage.getItem('quiz_game_correct') ? localStorage.getItem('quiz_game_correct') : 0);
let incorrectNumber = (localStorage.getItem('quiz_game_incorrect') ? localStorage.getItem('quiz_game_incorrect') : 0);

function findElements() {
	checkAnswer = document.querySelector('#check-answer');
	questionsDiv = document.querySelector('.row');
	clearBtn = document.querySelector('#clear-storage');
}

function onLoad() {
	loadQuestions();
}

function loadQuestions() {
	const url = 'https://opentdb.com/api.php?amount=1';
	fetch(url)
		.then( data => data.json())
		.then( result => displayQuestion(result.results))
		.catch( err => console.log(err))
}

	function selectAnswer(event) {
	const { target } = event;
 	if(questionsDiv.querySelector('.active')) {
			const activeAnswer = questionsDiv.querySelector('.active');
	 	activeAnswer.classList.remove('.active');
	}
	target.classList.add('active');
}

function displayQuestion(data) {
	const questionHtml = document.createElement('div');
	questionHtml.classList.add('col-12');

	data.forEach( question => {
		correctAnswer = question.correct_answer;
		let possibleAnswers = question.incorrect_answers;
		possibleAnswers.splice(Math.floor(Math.random() * 3), 0, correctAnswer);
		questionHtml.innerHTML = `
               <div class="row justify-content-between heading">
                    <p class="category">Category: ${question.category}</p>
                    <div class="totals">
                         <span class="badge badge-success">${correctNumber}</span>
                         <span class="badge badge-danger">${incorrectNumber}</span>
                    </div>
               </div>
               <h2 class="text-center">${question.question}
          `;
				const answerDiv = document.createElement('div');
				answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');

				possibleAnswers.forEach( answer => {
						const answerHtml = document.createElement('li');
						answerHtml.classList.add('col-12', 'col-md-5');
						answerHtml.textContent = answer;
						answerDiv.appendChild(answerHtml);
				});
				questionHtml.appendChild(answerDiv);
				document.querySelector('#app').appendChild(questionHtml);
	});
}

function deleteErrorMessage() {
	setTimeout( () => {
		document.querySelector('.alert-danger').remove();
	}, 3000);
}

function removePreviousQuestion() {
	const app = document.querySelector('#app');
	while(app.firstChild) {
		app.removeChild(app.firstChild);
	}
}

function saveIntoStorage() {
	localStorage.setItem('quiz_game_correct', correctNumber);
	localStorage.setItem('quiz_game_incorrect', incorrectNumber);
}

function checkAnswers() {
	const userAnswer = document.querySelector('.questions .active');

	if(userAnswer.textContent === correctAnswer) {
		correctNumber++;
	}
	else {
		incorrectNumber++;
	}
	removePreviousQuestion();
	saveIntoStorage();
	loadQuestions();
}

function validateAnswer() {
	if(document.querySelector('.questions .active')) {
		checkAnswers();
	}
	else {
		const errorDiv = document.createElement('div');
		errorDiv.classList.add('alert', 'alert-danger', 'col-md-6', 'justify-content-between');
		errorDiv.textContent = 'Please, select 1 answer';
		const questions = document.querySelector('.questions');
		questions.appendChild(errorDiv);
		deleteErrorMessage();
	}
}

function reloadPage() {
	setTimeout( () => {
			window.location.reload();
		}, 0);
}

function clearResults(event) {
	localStorage.setItem('quiz_game_correct', 0);
	localStorage.setItem('quiz_game_incorrect', 0);
	reloadPage();
	event.preventDefault();
}

function subscribe() {
	document.addEventListener('DOMContentLoaded', onLoad);
	checkAnswer.addEventListener('click', validateAnswer);
	questionsDiv.addEventListener('click', selectAnswer);
	clearBtn.addEventListener('click', clearResults);
}




export function init() {
	findElements();
	subscribe();
}