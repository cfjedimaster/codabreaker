Vue.config.productionTip = false;
Vue.config.devtools = false;

const API = '//codabreaker.rocks/static.json';

Vue.filter('dateFm', d => {
	return d.split('T')[0];
});

let app = new Vue({
	el:'#app',
	data:{
		issues:[]
	},
	created:function() {
		fetch(API)
		.then(res => res.json())
		.then(res => {
			this.issues = res.campaigns;
		});
	}
});