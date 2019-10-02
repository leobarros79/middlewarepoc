var request = require('request');
var express = require('express');
const axios = require('axios')

var app = express();

const accountSid = "ACa7310ffc26e3e8be8ecfa00ef61886ce";
const authToken = "a44f5b298066aaf38e432838102f7c26";
const client = require('twilio')(accountSid,authToken);


const VoiceResponse = require('twilio').twiml.VoiceResponse;
const server = require('./server.js');

	
		var te = '';
		var control = 0;
		var twiml;
		app.listen(process.env.PORT || 8080);
		console.log('APP ligado');
		
		
	app.post("/", async function(req, res) {
		twiml = new VoiceResponse();
		initGather(res);
	});	
	
	function initGather(res){
		const gatherNode = twiml.gather({ 
			action: '/gather',
			input: 'dtmf',
			timeout: 15,
			numDigits: 1,
			method: 'POST'
		});
		gatherNode.say('For sales, press 1. For support, press 2.');
		
		// If the user doesn't enter input, loop
		twiml.redirect('/');
			

		res.type('text/xml');
		res.send(twiml.toString());
	}
	
	app.post("/gather", async function(req, res) {
		if (req.body.Digits) {
			switch (req.body.Digits) {
			  case '1':
				twiml.say('You selected sales. Good for you!');
				break;
			  case '2':
				twiml.say('You need support. We will help!');
				break;
			  default:
				twiml.say("Sorry, I don't understand that choice.").pause();
				twiml.redirect('/');
				break;
			}
		} 
		else {
			// If no input was sent, use the <Gather> verb to collect user input
			twiml.redirect('/');
		}
	
	  app.post("/", async function(req, res) {	
		  res.type('text/xml');
		  res.send(twiml.toString());
	  });	  
	});
	
	app.post("/gather", function(req,res){
				
		twiml = new VoiceResponse();		
		
		
	});
		
	app.get("/api/call/:message", async function(req, res) {
		te = req.params.message;
		

		
		if(te){
			console.log("entrou");
			client.calls
				  .create({
					url: 'https://testemiddle.herokuapp.com',//'https://demo.twilio.com/docs/voice.xml',
					to:  '+5519982412618',
					from: '+13343397409'
				}).then(call => console.log(call.sid));
			console.log("terminou");	
			//process.exit(0);
		}
	});
	