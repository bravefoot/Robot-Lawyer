$(document).ready(function(){
	// Populate user name and gravatar
	$.ajax({
		url: '/user'
	}).done(function(data) {
		$("#username-field").html(data.email + "&nbsp;<i class='caret'></i>");
		$("#gravatar-field").attr("src", data.gravatar);
		console.log(data);
	});


	var awaitingAnswer = false;

    var botHandle = {
		say: function(text) {
			//$('#chatarea').append('<div class="row"><div id="typed-strings" class="well chatbox robot-chat col-sm-5 col-lg-5"><p>Robot: '+ text +'</p></div></div>');
			setTimeout(function(){
				$('<div class="row"><div class="well chatbox robot-chat col-sm-5 col-lg-6">'+ text +'<br><span class="author-text">Robot</span></div></div>').hide().appendTo("#chatarea").fadeIn(2000);
				window.scrollTo(0,document.body.scrollHeight);
			 }, 750);
		},

		startInput: function() {
			awaitingAnswer = true;
		},
		stopInput: function() {
			awaitingAnswer = false;
		},
		requestFile: function(callback) {
            this.say('Please upload your evidence <a href="../api/upload">here:</a>');
			// this.say('Please upload your picture here: '
            // + "<form role='form' enctype='multipart/form-data' method='POST' action='/api/upload/'>"
            //     + "<div class='form-group'>"
            //         + "<input type='file' id='file-name' name='myfile'></input>"
            //         + "<button id='fileSubmit' class='btn btn-primary'>Submit</button>"
            //     + "</div>"
            // + "</form>");
            // var outputVal = this.say;
			// setTimeout(function() {
			// 	$('#fileSubmit').click(function(e){
			// 		e.preventDefault();
            //         var fnInput = document.getElementById('file-name');
            //         var fileName = fnInput.value.replace(/^.*[\\\/]/, '/uploads/');
            //         console.log(fileName);
            //         outputVal("<img src=" + fileName + "><\img>");
			// 		callback();
			// 	});
			// }, 900);
			window.scrollTo(0,document.body.scrollHeight);
		},
		done: function() {

		}
	}
	var form = new basicForm(botHandle);

	var handleInput = function() {
		if(awaitingAnswer) {
			var text = $('#user-input').val();
			document.getElementById("user-input").value = "";

			$('<div class="row"><div class="well chatbox user-chat col-sm-offset-7 col-sm-5 col-lg-offset-7 col-lg-6"> '+ text +'<br><span class="author-text">You</span></div></div>').hide().appendTo("#chatarea").fadeIn(1000);

			form.handleInput(text);
		}
		setTimeout(function(){
			window.scrollTo(0,document.body.scrollHeight);
		}, 1000);
		
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
