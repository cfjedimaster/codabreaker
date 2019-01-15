
exports.handler = (event, context, callback) => {
	console.log('submission created error testing');
	
	let payload = JSON.parse(event.body).payload;
	
	console.log('testing payload '+JSON.stringify(payload));
	
};