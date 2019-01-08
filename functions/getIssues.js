const axios = require('axios');

const apiRoot = 'https://us6.api.mailchimp.com/3.0/campaigns?list_id=d00ad8719a&fields=campaigns.long_archive_url,campaigns.send_time&status=sent';

exports.handler = (event, context, callback) => {
	axios({
		method:'get', 
		url:apiRoot,
		auth:{
			'username':'anythingreally',
			'password':process.env.MC_API
		}
	}).then(res => {
		callback(null, {
			statusCode: 200,
			body: JSON.stringify(res.data)
		});
	})
	.catch(err => {
		callback(err);
	});

};