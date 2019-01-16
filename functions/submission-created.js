const SG_KEY = process.env.SENDGRID;

const helper = require('sendgrid').mail;

exports.handler = (event, context, callback) => {
	console.log('submission created error testing');
	
	let payload = JSON.parse(event.body).payload;

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