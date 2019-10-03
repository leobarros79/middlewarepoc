	var request = require('request');
	var express = require('express');
	const axios = require('axios')

	var app = express();

	const accountSid = "ACa7310ffc26e3e8be8ecfa00ef61886ce";
	const authToken = "a44f5b298066aaf38e432838102f7c26";
	const client = require('twilio')(accountSid,authToken);


	const VoiceResponse = require('twilio').twiml.VoiceResponse;
	const server = require('./server.js');

	
	var twiml;
	app.listen(process.env.PORT || 8080);
	console.log('APP ligado');
		
		
	app.post("/", (req, res) => {
		twiml = new VoiceResponse();
		const gatherNode = twiml.gather({ 
			action: '/gather',
			numDigits: 1,
		});
		gatherNode.say('For sales, press 1. For support, press 2.');
		
		// If the user doesn't enter input, loop
		twiml.redirect('/');
			

		res.type('text/xml');
		res.send(twiml.toString());
	});	
	
	
	app.post("/gather", (req, res) => {
		twiml = new VoiceResponse();

	  twiml.say("body: "+req.body);
	  res.type('text/xml');
	  res.send(twiml.toString());	  
	});
		
	app.get("/api/call/:message", async function(req, res) {

			console.log("entrou");
			client.calls
				  .create({
					url: 'https://testemiddle.herokuapp.com/',//'https://demo.twilio.com/docs/voice.xml',
					to:  '+5519982824212',
					from: '+13343397409'
				}).then(call => console.log(call.sid));
			console.log("terminou");	
			//process.exit(0);
		
	});
	