$(document).ready(function(){

	var awaitingAnswer = false;
	
    var botHandle = {
		say: function(text) {
			//$('#chatarea').append('<div id="typed-strings" class="well chatbox robot-chat"><p>Robot: '+ text +'</p></div>');
			setTimeout(function(){ 
				$('<div class="well chatbox robot-chat">Robot: '+ text +'</div>').hide().appendTo("#chatarea").fadeIn(2000);
				window.scrollTo(0,document.body.scrollHeight);
			 }, 750);
			// $('#chatarea').append('<span id="typed" class="well chatbox robot-chat" style="display:block;"></span>');
			// $("#typed").typed({
	  //           stringsElement: $('#typed-strings'),
	  //           typeSpeed: -25
   //      	});
   // Code above is for the typed.js. Only works for the first element, library probably requires the ID of the element.
		},		
		startInput: function() {
			awaitingAnswer = true;
		},
		stopInput: function() {
			awaitingAnswer = false;
		},
		requestFile: function(callback) {
			this.say('Please upload your picture here: ' + "<form role='form' enctype='multipart/form-data' method='POST'><div class='form-group'><input type='file' name='myfile'></input><button id='fileSubmit' class='btn btn-primary'>Submit</button></div></form>");
			setTimeout(function() {
				$('#fileSubmit').click(function(e){
					e.preventDefault();
					callback();
				});
			}, 900);
			window.scrollTo(0,document.body.scrollHeight);
		}
	}
	var form = new basicForm(botHandle);
	
	var handleInput = function() {
		if(awaitingAnswer) {
			var text = $('#user-input').val();
			document.getElementById("user-input").value = "";
			//$('#chatarea').append('<div class="well chatbox user-chat">You: '+ text +'</div>');
			$('<div class="well chatbox user-chat"> '+ text +'</div>').hide().appendTo("#chatarea").fadeIn(1000);

			form.handleInput(text);
		}
		window.scrollTo(0,document.body.scrollHeight);
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
