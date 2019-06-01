let correctAnswer;


function onLoad() {
	loadQuestions();
}

function loadQuestions() {
	const url = 'https://opentdb.com/api.php?amount=1';
	fetch(url)
		.then( data => data.json())
		.then( result => displayQuestion(result.results))
		.then( err => console.log(err))
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
                    <p class="category">Category:  ${question.category}</p>
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
	})
}

function subscribe() {
	document.addEventListener('DOMContentLoaded', onLoad);
}




export function init() {
	subscribe();
}