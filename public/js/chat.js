var onUserPost = [];

var convoIter = 0;

$(document).ready(function(){
//	var form = new basicForm();
//	var question = form.getFirstQuestion();
	var awaitingAnswer = false;
	var runQuestion = function() {
//		var text = question.questionText;
		// $('#chatarea').append('<div id="typed-strings" class="well chatbox robot-chat"><p>Robot: '+ text +'</p></div>');
		// //$('#chatarea').append('<span id="typed" class="well chatbox robot-chat" style="display:block;"></span>');

  //       $("#typed").typed({
  //           stringsElement: $('#typed-strings'),
  //           typeSpeed: -25
  //       });

		awaitingAnswer = true;
        converse(convoIter++);
  		// if(question.id == "done") {
		// 	finishChat()
		// } else {
		// 	awaitingAnswer = true;
		// }
	}

	$('#input-submit').click(function(e){
		var text = $('#user-input').val();
		if(awaitingAnswer) {
			awaitingAnswer = false;
			//$('#chatarea').append('<div class="well chatbox user-chat">You: '+ text +'</div>');
//			question = question.acceptInput(text);
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

var postBotMessage = function(text) {
    $('#chatarea').append('<div id="typed-strings" class="well chatbox robot-chat"><p>Robot: '+ text +'</p></div>');
    $("#typed").typed({
        stringsElement: $('#typed-strings'),
        typeSpeed: -25
    });
}
