
exports.handler = (event, context, callback) => {
	console.log('submission created called um ray here');
	//console.log('context, right? '+JSON.stringify(context));

	//console.log('event, right? '+JSON.stringify(event.payload));
	console.log('EVENT KEYS');
	
	let test = event.body;
	let test2 = JSON.parse(test);
	
	console.log('ok i have test2');
	for(let key in test2) {
		console.log('keys in test2 '+key);
	}

	//console.log(JSON.stringify(event.body));
	console.log('END OF TEST');

	callback(null, {
		body:'um'
	});
};