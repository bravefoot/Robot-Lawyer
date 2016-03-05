$(document).ready(function(){

	var awaitingAnswer = false;

    var botHandle = {
		say: function(text) {
			$('#chatarea').append('<div class="row"><div id="typed-strings" class="well chatbox robot-chat col-sm-5 col-lg-5"><p>Robot: '+ text +'</p></div></div>');
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
			this.say('Please upload your picture here: ' + "<form role='form' enctype='multipart/form-data' method='POST'><div class='form-group'><input type='file' name='myfile'></input><button id='fileSubmit' class='btn btn-primary'>Submit</button></div></form>");
			$('#fileSubmit').click(function(e){
				e.preventDefault();
				callback();
			});

		}
	}
	var form = new basicForm(botHandle);

	var handleInput = function() {
		if(awaitingAnswer) {
			var text = $('#user-input').val();
			document.getElementById("user-input").value = "";
			$('#chatarea').append('<div class="row"><div class="well chatbox user-chat col-sm-offset-7 col-sm-5 col-lg-offset-8 col-lg-5">You: '+ text +'</div></div>');
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
