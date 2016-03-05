var positiveInputs = ["yes","yep", "of course"];
var negativeInputs = ['no','nope', 'that\'s absurd'];
var FormQuestion = {};


var FormHandle = function(form, botHandle) {
	this.pop = function() {
		form.stateStack.pop();
		if(form.stateStack.length > 0) {
			form.peek().onTransition();
		}
	}
	this.push = function(nextStateType) {
		var nextState = new nextStateType(botHandle, this);
		form.stateStack.push(nextState);
		nextState.onTransition();
	}
	
	this.popAndForwardInput = function(input) {
		form.stateStack.pop();
		if(form.stateStack.length > 0) {
			form.peek().onInput(input);
		}
	}
	
	this.handleInput = function(input) {
		form.peek().onInput(input);
	}
}

var basicForm = function(botHandle) {	
	var responses = {};
	
	this.stateStack = [];
	
	this.peek = function() {
		return this.stateStack[this.stateStack.length - 1]
	}.bind(this);
	
	var formHandle = new FormHandle(this, botHandle);
	
	formHandle.push(FormQuestion.Introduction);
	
	this.handleInput = function(input) {
		if(responsesToRemember.indexOf(this.peek().id) > -1){
			responses[this.peek().id] = input;
		}
		formHandle.handleInput(input);
	}.bind(this);
	
	var responsesToRemember = ['case-number', 'statement', 'court-date'];
}

FormQuestion.Introduction = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'introduction', botHandle, formHandle);
	this.onTransition = function() {
		$.ajax({
			url: '/user'
		}).done(function(userData){
			var name = '';
			if(userData.legalInfo.fullName && userData.legalInfo.fullName.split(' ').length > 1) {
				name = userData.legalInfo.fullName.split(' ')[0];
			} else if(userData.profile.name && userData.profile.name.split(' ').length > 1) {
				name = userData.profile.name.split(' ')[0];
			}
			if(name != '') {
				name = name + '. ';
			}
			botHandle.say('Hello! ' + name + 'What\'s the problem?');
			botHandle.startInput();
		})
	}
	this.onInput = function(input) {
		botHandle.stopInput();
		botHandle.say("I'm so sorry to hear that! I'll do everything I can to help you, I promise, but first I need to collect some information.");
		formHandle.pop();
		formHandle.push(FormQuestion.VerifyAddress)
	}
}

FormQuestion.VerifyAddress = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'verify-address', botHandle, formHandle);
	this.onTransition = function() {
		$.ajax({
			url: '/user'
		}).done(function(userData){
			if(userData.legalInfo.streetAddress && userData.legalInfo.streetAddressCity && userData.legalInfo.streetAddressZip) {
				botHandle.say("On your profile, it says you live at " + userData.legalInfo.streetAddress + ", in " + userData.legalInfo.streetAddressCity + ", and the zip code is "+ userData.legalInfo.streetAddressZip + ". Is this correct?")
				botHandle.startInput();
			} else {
				botHandle.say('We are missing address data');
				formHandle.push(FormQuestion.NotImplemented);
			}
		});
	}
	this.onInput = function(input) {
		if(positiveInputs.indexOf(input.toLowerCase()) > -1) {
			botHandle.stopInput();
			botHandle.say("Perfect. We'll try our best to keep it that way.");
			formHandle.pop();
			formHandle.push(FormQuestion.VerifyPhone)
		} else if (negativeInputs.indexOf(input.toLowerCase()) > -1) {
			botHandle.stopInput();
			//formHandle.clearTop();
			formHandle.push(FormQuestion.NotImplemented)
		} else {
			formHandle.push(FormQuestion.Confused);
		}
	}
}

FormQuestion.VerifyPhone = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'verify-phone', botHandle, formHandle);
	this.onTransition = function() {
		$.ajax({
			url: '/user'
		}).done(function(userData){
			if(userData.legalInfo.phoneNumber) {
				botHandle.say("On your profile, it says your phone number is " + userData.legalInfo.phoneNumber + '. Is that still correct?');
				botHandle.startInput();
			} else {
				botHandle.say('We are missing phone data');
				formHandle.push(FormQuestion.NotImplemented);
			}
		});
	}
	this.onInput = function(input) {
		if(positiveInputs.indexOf(input.toLowerCase()) > -1) {
			botHandle.stopInput();
			botHandle.say("Excellent.Thank you.");
			formHandle.pop();
			formHandle.push(FormQuestion.VerifyEmail)
		} else if (negativeInputs.indexOf(input.toLowerCase()) > -1) {
			botHandle.stopInput();
			//formHandle.clearTop();
			formHandle.push(FormQuestion.NotImplemented)
		} else {
			formHandle.push(FormQuestion.Confused);
		}
	}
}

FormQuestion.VerifyEmail = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'verify-email', botHandle, formHandle);
	this.onTransition = function() {
		$.ajax({
			url: '/user'
		}).done(function(userData){
			if(userData.email) {
				botHandle.say('Do you still receive emails at ' + userData.email + '?');
				botHandle.startInput();
			} else {
				botHandle.say('We are missing email data');
				formHandle.push(FormQuestion.NotImplemented);
			}
		});
	}
	this.onInput = function(input) {
		if(positiveInputs.indexOf(input.toLowerCase()) > -1) {
			botHandle.stopInput();
			botHandle.say("Okay. Thank you.");
			formHandle.pop();
			formHandle.push(FormQuestion.CaseNumber)
		} else if (negativeInputs.indexOf(input.toLowerCase()) > -1) {
			botHandle.stopInput();
			//formHandle.clearTop();
			formHandle.push(FormQuestion.NotImplemented)
		} else {
			formHandle.push(FormQuestion.Confused);
		}
	}
}

FormQuestion.CaseNumber = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'case-number', botHandle, formHandle);
	this.onTransition = function() {
		botHandle.say('Okay, now I just need the case number you should have received in your eviction notice. Should look like this: <img src="http://www.maine-coon-cat-nation.com/image-files/cute-kitten-names.jpg"></img>')
		botHandle.startInput();
	}
	this.onInput = function(input) {
		if(/[0-9]+/.test(input)) {
			botHandle.stopInput();
			botHandle.say("Alright, we're pulling up your case information now.");
			formHandle.pop();
			formHandle.push(FormQuestion.HaventPaid);
		} else {
			botHandle.say('That doesn\'t quite look like a  case number');
		}
	}
}

FormQuestion.HaventPaid = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'havent-paid', botHandle, formHandle);
	this.onTransition = function() {
		botHandle.say('It looks like your landlord is claiming you haven\'t paid your rent in 3 months. Is that true?')
		botHandle.startInput();
	}
	this.onInput = function(input) {
		botHandle.stopInput();
		if (negativeInputs.indexOf(input.toLowerCase()) > -1) {
			botHandle.say('I\'m so sorry, that must be really stressful. Give me a second to see how I can help.');
			formHandle.pop();
			formHandle.push(FormQuestion.RequestReceipt);
		} else if (positiveInputs.indexOf(input.toLowerCase()) > -1) {
			botHandle.say('That might make things a bit trickier. I\'ll need some more time to think about it');
			formHandle.push(FormQuestion.NotImplemented);
		} else {
			formHandle.push(FormQuestion.Confused);
		}
	}
}

FormQuestion.RequestReceipt= function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'request-receipt', botHandle, formHandle);
	this.onTransition = function(){
		botHandle.say("Do you have any evidence of payment? Maybe a picture/pdf of a bank statement?");
		botHandle.startInput();
		}
	this.onInput = function(input) {
		if (positiveInputs.indexOf(input.toLowerCase()) > -1) {
			botHandle.requestFile(function() {
				botHandle.say("Thank you. We are putting together a case for you, but a statement of some sort would go a long way.")
				formHandle.pop();
				formHandle.push(FormQuestion.RequestStatement);
			});
		}
	}
}

FormQuestion.RequestStatement = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'statement', botHandle, formHandle);
	this.onTransition = function() {
		botHandle.say("In 2-6 sentences, can you explain what happened? I'll be quoting you word for word, so just tell me the story (as you know it) from the beginning.");
		botHandle.startInput();
	}
	this.onInput = function(input) {
		botHandle.stopInput();
		botHandle.say("Thank you, I know this must be difficult.");
		formHandle.pop();
		formhandle.push(FormQuestion.ScheduleTime);
	}
}

FormQuestion.ScheduleTime = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'statement', botHandle, formHandle);
	this.onTransition = function() {
		botHandle.say('That\'s everything we need to respond to this eviction. You\'ll get a confirmation from the court soon. In case we need to schedule a court date, when will generally work for you?');
		botHandle.startInput();
	}
	this.onInput = function(input) {
		
	}
}

FormQuestion.NotImplemented = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'not-implemented', botHandle, formHandle);
	this.onTransition = function() {
		botHandle.say("We haven't gotten to this flow yet. Would you like to go back to the last question?")
		botHandle.startInput();
	}
	this.onInput = function(input) {
		if(positiveInputs.indexOf(input.toLowerCase()) > -1) {
			formHandle.pop();
		} else {
			formHandle.pop();
			formHandle.push(FormQuestion.NotImplemented);
		}
	}
}

FormQuestion.Confused = function(botHandle, formHandle) {
	questions.BaseQuestion.call(this, 'confused', botHandle, formHandle);
	this.onTransition = function() {
		botHandle.say("I don't quite understand your response")
		botHandle.startInput();
	}
	this.onInput = function(input) {
		formHandle.popAndForwardInput(input);
	}
}