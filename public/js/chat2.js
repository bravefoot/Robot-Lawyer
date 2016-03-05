$(document).ready(function(){

	var awaitingAnswer = false;

    var botHandle = {
		say: function(text) {
			//$('#chatarea').append('<div class="row"><div id="typed-strings" class="well chatbox robot-chat col-sm-5 col-lg-5"><p>Robot: '+ text +'</p></div></div>');
			setTimeout(function(){
				$('<div class="row"><div class="well chatbox robot-chat col-sm-5 col-lg-6">Robot: '+ text +'</div></div>').hide().appendTo("#chatarea").fadeIn(2000);

			 }, 750);

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
			window.scrollTo(0,document.body.scrollHeight);
		}
	}
	var form = new basicForm(botHandle);

	var handleInput = function() {
		if(awaitingAnswer) {
			var text = $('#user-input').val();
			document.getElementById("user-input").value = "";

			$('<div class="row"><div class="well chatbox user-chat col-sm-offset-7 col-sm-5 col-lg-offset-7 col-lg-6"> '+ text +'</div></div>').hide().appendTo("#chatarea").fadeIn(1000);

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
