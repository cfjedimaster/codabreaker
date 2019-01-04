// credit: https://github.com/netlify/functions/blob/master/src/lambda/hello_fetch.js#L1
//import fetch from "node-fetch";

/*
const fetch = require('node-fetch');

exports.handler = async (event, context, callback) => {
	
	return fetch('https://cat-fact.herokuapp.com/facts/random')
	.then(res => res.json())
	.then(res => ({
		statusCode:200,
		body:res
	}));

}
*/

exports.handler = async (event, context, callback) => {
	/*
	return setTimeout(() => { 
		
		//return {
		//	statusCode: 200,
		//	body: "Hello, World"
		//};
		
		console.log('lets run that damn callback');
		callback(null, {
			statusCode:200,
			body:"Hello!"
		});

	}, 1200);
	*/
	return new Promise((resolve, reject) => {

		setTimeout(() => {
			resolve({
				statusCode:200,
				body:"fucking promises"
			});
		}, 2000);

	});
};