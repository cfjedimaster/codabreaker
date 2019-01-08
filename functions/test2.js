// credit: https://github.com/netlify/functions/blob/master/src/lambda/hello_fetch.js#L1
//import fetch from "node-fetch";

//const fetch = require('node-fetch');

/*
exports.handler = async (event, context, callback) => {
	console.log('here goes nothing');
	return fetch('https://cat-fact.herokuapp.com/facts/random')
	.then(res => res.json())
	.then(res => ({
		statusCode:200,
		body:res
	}));
}


*/

const axios = require('axios');

exports.handler = (event, context, callback) => {
  axios.get('https://cat-fact.herokuapp.com/facts/random')
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res.data),
      });
    })
    .catch((err) => {
      callback(err);
    });
};