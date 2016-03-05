$(document).ready(function(){
	
	var myFirebase = new Firebase("https://luminous-heat-5923.firebaseio.com/")
	
	var user = $.ajax({
		url: '/user'
	})
	var responses = {};
	var form = new basicForm();
	var lastQuestion;
	var question = form.getFirstQuestion();
	var awaitingAnswer = false;
	
	var finishChat = function() {
		console.log("finishing chat")
		var responseId = Math.random().toString();
		user.done(function(userData) {
			myFirebase.child('responses/' + userData._id + '/' + responseId.split('.')[1]).set({
				formId: form.id,
				responses: responses
			});
		})
	}
	
	var runQuestion = function() {
		var text = question.questionText;
		$('#chatarea').append('<div>Robot: '+ text +'</div>');
		if(question.id == "done") {
			finishChat()
		} else {
			awaitingAnswer = true;
		}
	}
	
	$('#input-submit').click(function(e){
		if(awaitingAnswer) {
		var text = $('#user-input').val();
			awaitingAnswer = false;
			$('#chatarea').append('<div>You: '+ text +'</div>');
			lastQuestion = question;
			question = question.acceptInput(text);
			if(question != lastQuestion) {
				responses[lastQuestion.id] = text;
			}
			
			runQuestion();
		}
	});
	
	runQuestion();
});