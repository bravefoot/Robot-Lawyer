$(document).ready(function(){

	var awaitingAnswer = false;
	
    var botHandle = {
		say: function(text) {
			$('#chatarea').append('<div id="typed-strings" class="well chatbox robot-chat"><p>Robot: '+ text +'</p></div>');
			// $('#chatarea').append('<span id="typed" class="well chatbox robot-chat" style="display:block;"></span>');
			// $("#typed").typed({
	  //           stringsElement: $('#typed-strings'),
	  //           typeSpeed: -25
   //      	});
   // Code above is for the typed.js. Only works for the first element, library probably requires the ID of the element.
			window.scrollTo(0,document.body.scrollHeight);
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
		handleInput();
	});
	
	$('#user-input').keydown(function(e) {
		if (((event.keyCode || event.which) == 13) && !event.shiftKey) {
			e.preventDefault();
			handleInput();
		}
	});
});
