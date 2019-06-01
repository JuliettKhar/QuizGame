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
		console.log(question)
	})
}

function subscribe() {
	document.addEventListener('DOMContentLoaded', onLoad);
}




export function init() {
	subscribe();
}