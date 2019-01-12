
exports.handler = (event, context, callback) => {
	console.log('submission created called');
	console.log('context, right? '+JSON.stringify(context));
	
	callback(null, {
		body:'um'
	});
};