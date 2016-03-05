var basicForm = function() {
	this.getFirstQuestion = function(){
		return question1;
	}
	
	var afterQuestion2 = function(input) {
		return new questions.done();
	}
	
	var question2 = new questions.address("address", afterQuestion2);
	
	var afterQuestion1 = function(input) {
		return question2;
	}
	
	var question1 = new questions.fullName("full-name", afterQuestion1);
	
	
}