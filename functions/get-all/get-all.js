/* eslint-disable */
const fetch = require("node-fetch");
const base64 = require("base-64");

const apiRoot = 'https://us6.api.mailchimp.com/3.0/campaigns?list_id=d00ad8719a&fields=campaigns.id,campaigns.long_archive_url,campaigns.send_time,campaigns.settings.title,campaigns.settings.template_id&status=sent&sort_field=send_time&sort_dir=desc&count=1000';

const contentRoot = 'https://us6.api.mailchimp.com/3.0/campaigns/';

async function getVideoInfo(links) {

}

exports.handler = async function(event, context) {
  let username = 'myAPIBringsAllTheNerdsToTheYard';
  let password = process.env.MC_API;

  try {
	// First get all the issues
	const response = await fetch(apiRoot, {
	  headers: {
		Authorization: 'Basic ' + base64.encode(username + ":" + password)
	  }
	});

	const data = await response.json();

	let contentData = [];
	// now for each, get the plain text content
	for(let i=0;i<data.campaigns.length;i++) {
	  let contentUrl = contentRoot + data.campaigns[i].id + '/content';
	  let cRes = await fetch(contentRoot + data.campaigns[i].id + '/content', {
		headers: {
		  Authorization: 'Basic ' + base64.encode(username + ":" + password)
		}
	  });

	  let content = await cRes.json();
	  contentData.push({
		title:data.campaigns[i].settings.title,
		content:content.plain_text
	  });
	}

	/*
	// ok now lets get YT links (note im dropping title)

	let ytLinks = [];
	for(let i=0;i<contentData.length;i++) {
		let matches = contentData[i].content.match(/https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9\_\-\&\=]+/g);
		ytLinks = ytLinks.concat(matches);
	}
	// regex above also matches list=, so nuke em
	ytLinks = ytLinks.filter(l => {
		return l.indexOf('&list=') === -1;
	});
	console.log(ytLinks);
	*/
	// temp hack
	let s = '';
	contentData.forEach(c => {
		s += '<h2>' + c.title +'</h2>';
		s += '<pre>' + c.content + '</pre>'
	});

	return { statusCode: 200, body: s };
  } catch(err) {
	console.log('error', err);
	return {
	  statusCode: 500,
	  body: JSON.stringify({ msg: err.message }) 
	};   
  }

};
