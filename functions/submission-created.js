const helper = require('sendgrid').mail;
const SG_KEY = process.env.SENDGRID;

const axios = require('axios');

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
const TA_KEY = process.env.TONEANALZYER;

exports.handler = async (event, context, callback) => {
	console.log('submission created error testing');
	
	let payload = JSON.parse(event.body).payload;
	let analysis = '';
	let toneString = '';

	//lets analyze the text
	
	if(payload.data.comments && payload.data.comments.length) {
		analysis = await analyze(payload.data.comments);

		/*
		if we get results, its an array of tones, ex:

		[ { score: 0.633327, tone_id: 'fear', tone_name: 'Fear' },
		{ score: 0.84639, tone_id: 'tentative', tone_name: 'Tentative' } ]

		So what we will do is create an analysis string based on tone_names where score > 0.5
		*/
		analysis = analysis.filter(t => t.score > 0.5);
		// and now we'll build an array of just tones
		let tones = analysis.map(t => t.tone_name);
		// and then a string
		toneString = tones.join(', ');
		console.log('it worked and i got '+toneString);
	} 

	// note - no validation - booooo
	let from_email = new helper.Email(payload.data.email);
	let to_email = new helper.Email('raymondcamden@gmail.com');
	let subject = 'Contact Form Submission';

	if(toneString.length > 0) subject += ` [Tone: ${toneString}]`;
	
	let date = new Date();
	let content = `
Form Submitted at ${date}
--------------------------------
`;

	for(let key in payload.data) {
		content += `
${key}:			${payload.data[key]}
`;
	}

	let mailContent = new helper.Content('text/plain', content);
	let mail = new helper.Mail(from_email, subject, to_email, mailContent);
	let sg = require('sendgrid')(SG_KEY);

	let request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON()
	});
		
	sg.API(request, function(error, response) {
		if(error) {
			console.log(error.response.body);
		} else console.log(response);
	});
	console.log('And done...');
};

async function analyze(str) {
	console.log('going to tone analzye '+str);
	
	let toneAnalyzer = new ToneAnalyzerV3({
		username: 'apikey',
		password: TA_KEY,
		version: '2017-09-21',
		url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
	});

	const result = await new Promise((resolve, reject) => {
		toneAnalyzer.tone(
			{
				tone_input: str,
				content_type: 'text/plain'
			},
			function(err, tone) {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(tone.document_tone.tones);
				}
			}
		);
	});
	return result;

}