$(document).ready(function(){
	var form = new basicForm();
	var question = form.getFirstQuestion();
	var awaitingAnswer = false;
	var runQuestion = function() {
		var text = question.questionText;
		$('#chatarea').append('<div>Robot: '+ text +'</div>');
		awaitingAnswer = true;
	}
	
	$('#input-submit').click(function(e){
		if(awaitingAnswer) {
		var text = $('#user-input').val();
			awaitingAnswer = false;
			$('#chatarea').append('<div>You: '+ text +'</div>');
			question = question.acceptInput(text);
			runQuestion();
		}
	});
	
	runQuestion();
});