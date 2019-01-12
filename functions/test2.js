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