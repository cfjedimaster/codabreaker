exports.handler = function(event, context, callback) {
	
	
	let data = {
		name:'ray',
		foo:[1,2,4]
	};
	
	console.log('data is '+JSON.stringify(data));

	callback(null, {
		body:"foo"
	});

}