let correctAnswer;
let checkAnswer;
let questions;

function findElements() {
	checkAnswer = document.querySelector('#check-answer');
	questions = document.querySelector('.row');
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
		console.log(event.target, 'selectAnswer')
	// const { target } = event;
	event.target.classList.add('active');
 	if(event.target.classList.contains('.active')) {
					const activeAnswer = document.querySelector('.active');
	 	activeAnswer.classList.remove('.active');
	}
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
                         <span class="badge badge-success"></span>
                         <span class="badge badge-danger"></span>
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



function validateAnswer() {
	if(document.querySelector('.questions .active')) {
		console.log(1)
	}
	else {
		console.log(2)
	}
}

function subscribe() {
	document.addEventListener('DOMContentLoaded', onLoad);
	checkAnswer.addEventListener('click', validateAnswer);
	questions.addEventListener('click', selectAnswer);
}




export function init() {
	findElements();
	subscribe();
	// selectAnswer(event);
}