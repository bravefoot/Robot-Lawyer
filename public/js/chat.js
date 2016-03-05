var onUserPost = [];

$(document).ready(function(){
	var form = new basicForm();
	var question = form.getFirstQuestion();
	var awaitingAnswer = false;
	var runQuestion = function() {
		var text = question.questionText;
		$('#chatarea').append('<div id="typed-strings" class="well chatbox robot-chat"><p>Robot: '+ text +'</p></div>');
		//$('#chatarea').append('<span id="typed" class="well chatbox robot-chat" style="display:block;"></span>');

        $("#typed").typed({
            stringsElement: $('#typed-strings'),
            typeSpeed: -25
        });

		awaitingAnswer = true;
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
			question = question.acceptInput(text);
			runQuestion();
		}
        onUserPost.forEach(eventHandler =>
        {
           eventHandler(text); 
        });
	});
	runQuestion();
});
