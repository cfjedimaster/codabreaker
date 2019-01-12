
exports.handler = (event, context, callback) => {
	console.log('submission created called');
	console.log('context, right? '+JSON.stringify(context));
	console.log('event, right? '+JSON.stringify(event));
	
	callback(null, {
		body:'um'
	});
};