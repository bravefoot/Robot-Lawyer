var positiveInputs = ["yes","yep", "of course",'yeah', "yes, that\'s my address", "yeah, give me a second", "yeah, that looks right", "yeah, give second.", "yeah, that looks right.","yeah, give me a second.", "Yeah, give me a sec", "yeah, give me a sec.", "Yeah, just a sec", "Yeah, just a sec.", "Sure", "Okay", "Yes, that's my address", "yes!"];
var negativeInputs = ['no','nope', 'that\'s absurd','nah', 'thats absurd', 'never', 'that\'s absurd!'];
var FormQuestion = {};

var basicForm = function(botHandle) {
	
	this.handleInput = function(input) {
		this.currentQuestion.onInput(input);
	}
	
	this.changeQuestion = function(newQuestion, questions) {
		this.currentQuestion = handleQuestion(botHandle, this, newQuestion, questions);
	}
	
	$.ajax({
		 url: '/js/forms/basicform.json',
		 cache: false,
		 success: function(data){
			var questions = data.form.questions;
			var firstQuestion = 'one';
			this.currentQuestion = handleQuestion(botHandle, this, firstQuestion, questions);
		}.bind(this),
		error: function(a,b,c) {
			console.log(a);
		}
	});
}

function handleQuestion(botHandle, formHandle, questionName, questions) {
	if(questionName == 'unimplemented') {
		return new Unimplemented()
	}
	var question = questions[questionName];
	botHandle.say(question.questionText);
	switch(question.type) {
		case 'binary':
			return new BinaryQuestion(botHandle, formHandle, question, questions);
			break;
		case 'numeric':
			return new NumericQuestion(botHandle, formHandle, question, questions);
			break;
		case 'upload':
			return new UploadQuestion(botHandle, formHandle, question, questions);
			break;
		case 'statement':
			return new StatementQuestion(botHandle, formHandle, question, questions);
			break;
	}
}

var BinaryQuestion = function(botHandle, formHandle, question, questions) {
	botHandle.startInput();
	this.onInput = function(input) {
		botHandle.stopInput();
		var response;
		if(input == 'yes') {
			response = question.responses.yes;
		} else if(input == 'no') {
			response = question.responses.no;
		} else {
			botHandle.say('I didn\'t quite get that');
			botHandle.startInput();
			return;
		}
		botHandle.say(response.response);
		formHandle.changeQuestion(response.next, questions);
		return;
	}
}

var NumericQuestion = function(botHandle, formHandle, question, questions) {
	botHandle.startInput();
	this.onInput = function(input) {
		botHandle.stopInput();
		var response;
		if(/[0-9]+/.test(input)) {
			response = question.responses.valid;
		} else {
			response = question.responses.invalid
			botHandle.say(response.response);
			botHandle.startInput()
			return;
		}
		botHandle.say(response.response);
		formHandle.changeQuestion(response.next, questions);
		return;
	}
}

var UploadQuestion = function(botHandle, formHandle, question, questions) {
	botHandle.requestFile(function() {
		var response = question.responses.upload;
		botHandle.say(response.response);
		formHandle.changeQuestion(response.next, questions);
	});
}

var StatementQuestion = function(botHandle, formHandle, question, questions) {
	botHandle.startInput();
	var response = question.responses.complete;
	botHandle.say(response.response);
	formHandle.changeQuestion(response.next, questions);
	return;
}

var Unimplemented = function(botHandle) {
	botHandle.say('We haven\'t gotten to this flow yet.');
}

FormQuestion.NotImplemented = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'not-implemented', botHandle, formHandle);
	this.onTransition = function() {
		botHandle.say("We haven't gotten to this flow yet. Would you like to go back to the last question?")
		botHandle.startInput();
	}
	this.onInput = function(input) {
		if(positiveInputs.indexOf(input.toLowerCase()) > -1) {
			formHandle.pop();
		} else {
			formHandle.pop();
			formHandle.push(FormQuestion.NotImplemented);
		}
	}
}

FormQuestion.Confused = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'confused', botHandle, formHandle);
	this.onTransition = function() {
		botHandle.say("I don't quite understand your response")
		botHandle.startInput();
	}
	this.onInput = function(input) {
		formHandle.popAndForwardInput(input);
	}
}

FormQuestion.HandleQuestion = function(botHandle, formHandle, key, questions) {
	
}