var onUserPost = [];

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
        postMessage(question.questionText);
		if(question.id == "done") {
			finishChat()
		} else {
			awaitingAnswer = true;
		}
	}
    
    var postMessage = function(text) {
        $('#chatarea').append('<div class="well chatbox robot-chat">Robot: '+ text +'</div>');
    }


	$('#input-submit').click(function(e){
		var text = $('#user-input').val();
		if(awaitingAnswer) {
			awaitingAnswer = false;
			$('#chatarea').append('<div class="well chatbox user-chat">You: '+ text +'</div>');
			lastQuestion = question;
			question = question.acceptInput(text);
			if(question != lastQuestion) {
				responses[lastQuestion.id] = text;
			}
			
			runQuestion();
		}
        for(var i = 0; i < onUserPost.length; ++i)
        {
            onUserPost[i](text);
            onUserPost[i] = function(val){};
        }
	});
	
	runQuestion();
});
