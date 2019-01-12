
exports.handler = (event, context, callback) => {
	console.log('submission created called um ray here');
	//console.log('context, right? '+JSON.stringify(context));
	console.log('event, right? '+JSON.stringify(event.payload));
	
	callback(null, {
		body:'um'
	});
};