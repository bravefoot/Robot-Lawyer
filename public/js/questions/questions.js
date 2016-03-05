var questions = {};

questions.BaseQuestion = function(id, formHandler, botHandler) {
	this.onTransition = function() {};
	this.onInput = function(input) {};
}