$(document).ready(function(){
	var form = new basicForm();
	var question = form.getFirstQuestion();
	var awaitingAnswer = false;
	var runQuestion = function() {
		var text = question.questionText;
		$('#chatarea').append('<div class="well chatbox robot-chat">Robot: '+ text +'</div>');
		awaitingAnswer = true;
	}

	$('#input-submit').click(function(e){
		if(awaitingAnswer) {
		var text = $('#user-input').val();
			awaitingAnswer = false;
			$('#chatarea').append('<div class="well chatbox user-chat">You: '+ text +'</div>');
			question = question.acceptInput(text);
			runQuestion();
		}
	});

	runQuestion();
});
