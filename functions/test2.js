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

exports.handler = async (event, context) => {
	return setTimeout(function() {  
		return {
			statusCode: 200,
			body: "Hello, World"
	  };
	}, 3000);
	
};