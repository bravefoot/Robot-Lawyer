$(document).ready(function(){

	var awaitingAnswer = false;
	
    var botHandle = {
		say: function(text) {
			$('#chatarea').append('<div class="well chatbox robot-chat">Robot: '+ text +'</div>');
		},		
		startInput: function() {
			awaitingAnswer = true;
		},
		stopInput: function() {
			awaitingAnswer = false;
		}
		requestFile: function(callback) {
			
		}
	}
	var form = new basicForm(botHandle);

	$('#input-submit').click(function(e){
		if(awaitingAnswer) {
			var text = $('#user-input').val();
			$('#chatarea').append('<div class="well chatbox user-chat">You: '+ text +'</div>');
			form.handleInput(text);
		}
	});
});
