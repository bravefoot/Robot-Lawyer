var questions = {};

var baseQuestion = function(id, getNextQuestion) {
	this.id=id;
	this.validate = function(input){
		return false;
	};
	this.getNextQuestion = getNextQuestion;
	this.acceptInput = function(input){
		if(this.validate(input)) {
			return this.getNextQuestion(input);
		} else {
			return this;
		};
		
	}
}

questions.fullName = function(id, getNextQuestion) {
	baseQuestion.call(this, id, getNextQuestion);
	this.questionText="What is your full name (including your middle name if you have one)?"
	this.validate = function() {
		return true;
	}
}

questions.address = function(id,getNextQuestion) {
	baseQuestion.call(this,id,getNextQuestion);
	this.questionText="What is your residential address?"
	this.validate = function() {
		return true;
	}
}

questions.done = function() {
	baseQuestion.call(this, "done", function(){});
	this.questionText = "Thank you, that is all";
}