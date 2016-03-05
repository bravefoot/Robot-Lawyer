var phone;
var date;
var statement;
var caseNumber;
var bankStatement;

var conversation = 
[
	{
		text:"Hello Nameless Tenant! What's the problem?"
	},
	{
		text:"I'm so sorry to hear that! I'll do everything I can to help you, I promise, but first I need to collect some information."
	},
	{
		text:"On your profile, it says you live at XXXX Street Name Lane, in Salt Lake City, and the zip code is 84111. Is this correct?"
	},
	{
		keywords:
		[
			"yes"
		]
	},
	{
		text:"Perfect. We'll try our best to keep it that way."
	},
	{
		text:"It says here that you never entered a phone number. Can you tell me what that is?"
	},
	{
		keywords:
		[
			"why"
		]
	},
	{
		text:"We just need to send that over to the courts in case they need to contact you. Don't worry, we won't send you any spam."
	},
	{
		retrieveData:
		{
			type:"regex",
			regex: /([0-9]{3}(-){,1}){2}[0-9]{4}/,
			setter: function(phoneNum)
			{
				phone = phoneNum;
			}
		}
	},
	{
		text:"Thank you! Sorry, just a few more questions before we can dig into the actual problem."
	},
	{
		text:"Do you still receive your email at test@test.com?"
	},
	{
		keywords:
		[
			"yes"
		]
	},
	{
		text:"Okay thanks!"
	},
	{
		text:"Okay, now I just need the case number you should have received in your eviction notice. Should look like this:"
	},
	{
		img:"PICTURE_OF_STANDARD_EVICTION"
	},
	{
		retrieveData:
		{
			type:"regex",
			regex:/[0-9]+/,
			setter:function(caseNo)
			{
				caseNumber = caseNo;
			}
		}
	},
	{
		text:"Okay! Sorry for the wait, government stuff, you know how it is. The case is pulling up now."
	},
	{
		text:"Cool...looks like he is claiming you haven't paid your rent in 3 months. Is that true?"
	},
	{
		keywords:
		[
			"no"
		]
	},
	{
		text:"I'm so sorry, that must be really stressful. Give me a second to see how I can help."
	},
	{
		text:"Do you have any evidence of payment? Maybe a picture/pdf of a bank statement?"
	},
	{
		retrieveData:
		{
			type:"file",
			setter:function(bankStmnt)
			{
				bankStatement = bankStmnt;
			}
		}
	},
	{
		text:"Thank you. We are putting together a case for you, but a statement of some sort would go a long way."
	},
	{
		text:"In 2-6 sentences, can you explain what happened? I'll be quoting you word for word, so just tell me the story (as you know it) from the beginning."
	},
	{
		text:"Whenever you're ready! :)"
	},
	{
		retrieveData:
		{
			type:"text/plain",
			setter:function(statementVal)
			{
				statement = statementVal;
			}
		}
	},
	{
		text:"Thank you, I know this must be difficult."
	},
	{
		text:"We are just about done. There's no way of knowing just yet, but if this needs to go to a physical court (we might be able to do it through video chat, it just depends), could you select a date or time that works for you?"
	},
	{
		retrieveData:
		{
			type:"date",
			callbackFunc:function(selectedDate)
			{
				date = selectedDate;
			}
		}
	}
];