console.log('Running build script');

const axios = require('axios');
const fs = require('fs');

const apiRoot = 'https://us6.api.mailchimp.com/3.0/campaigns?list_id=d00ad8719a&fields=campaigns.long_archive_url,campaigns.send_time,campaigns.settings.title&status=sent';

axios({
	method:'get', 
	url:apiRoot,
	auth:{
		'username':'anythingreally',
		'password':process.env.MC_API
	}
}).then(res => {
	/*
	callback(null, {
		statusCode: 200,
		body: JSON.stringify(res.data)
	});
	*/
	console.log(JSON.stringify(res.data));
	fs.writeFileSync('./static.json', JSON.stringify(res.data), 'UTF-8');

})
.catch(err => {
	console.log('Error getting stuff', err);
});

