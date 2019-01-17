const helper = require('sendgrid').mail;
const SG_KEY = process.env.SENDGRID;

const axios = require('axios');
const apiRoot = 'https://gateway.watsonplatform.net/tone-analyzer/api';
const TA_KEY = process.env.TONEANALZYER;

exports.handler = async (event, context, callback) => {
	console.log('submission created error testing');
	
	let payload = JSON.parse(event.body).payload;
	let analysis = '';

	//lets analyze the text
	if(payload.data.comments && payload.data.comments.length) {
		analysis = await analyze(payload.data.comments);
	} 

	// note - no validation - booooo
	let from_email = new helper.Email(payload.data.email);
	let to_email = new helper.Email('raymondcamden@gmail.com');
	let subject = 'Contact Form Submission';

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
		}
	});

};

async function analyze(str) {
	console.log('going to tone analzye '+str);

	axios({
		method:'post', 
		url:apiRoot,
		body:str,
		auth:{
			'username':'apikey',
			'password':TA_KEY
		},
	}).then(res => {
		return res;
	})
	.catch(err => {
		console.log('error in TA', err);
	});

	/*
	curl -X POST -u "apikey:{apikey}" \
	--header "Content-Type: application/json" \
	--data-binary @{path_to_file}tone.json \
	"{url}/v3/tone?version=2017-09-21"
	*/
}