
exports.handler = (event, context, callback) => {
	console.log('submission created called um ray here');
	//console.log('context, right? '+JSON.stringify(context));

	//console.log('event, right? '+JSON.stringify(event.payload));
	console.log('EVENT');
	for(let foo in event) {
		console.log('foo is '+foo);
	}

	callback(null, {
		body:'um'
	});
};