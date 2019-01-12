
exports.handler = (event, context, callback) => {
	console.log('submission created called um ray here');
	//console.log('context, right? '+JSON.stringify(context));

	//console.log('event, right? '+JSON.stringify(event.payload));
	console.log('EVENT');
	/*
	for(let foo in event) {
		console.log('foo is '+foo+ ' = ' +JSON.stringify(event[foo]));
	}
	*/
	console.log(JSON.stringify(event.body));
	console.log('\nBODY');

	callback(null, {
		body:'um'
	});
};