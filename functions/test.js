exports.handler = function(event, context, callback) {
	
	let data = {
		name:'ray',
		foo:[1,2,4]
	};

	callback(null, {
		body:data
	});

}