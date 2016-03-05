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
		},
		requestFile: function(callback) {
			
		}
	}
	var form = new basicForm(botHandle);
	
	var handleInput = function() {
		if(awaitingAnswer) {
			var text = $('#user-input').val();
			document.getElementById("user-input").value = "";
			$('#chatarea').append('<div class="well chatbox user-chat">You: '+ text +'</div>');
			form.handleInput(text);
		}
		$('#input-submit').focus();
	}

	$('#input-submit').click(function(e){
		handleImput();
	});
	
	$('#input-submit').click(function(e) {
		if (((event.keyCode || event.which) == 13) && !event.shiftKey) {
			handleInput();
		}
	});
});
