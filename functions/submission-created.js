
exports.handler = (event, context, callback) => {
	console.log('submission created called um ray here');
	//console.log('context, right? '+JSON.stringify(context));

	//console.log('event, right? '+JSON.stringify(event.payload));
	console.log('EVENT KEYS');
	
	let payload = JSON.parse(event.body).payload;
	
	console.log('ok i have payload');

	console.log('testing payload '+JSON.stringify(payload));
	
	// so yes i have payload

	//console.log(JSON.stringify(event.body));
	console.log('END OF TEST');

	callback(null, {
		body:'um'
	});
};