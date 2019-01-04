exports.handler = async (event, context, callback) => {
	

	return new Promise((resolve, reject) => {

		setTimeout(() => {
			resolve({
				statusCode:200,
				body:"promises1111"
			});
		}, 2000);

	});

};