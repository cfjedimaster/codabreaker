
Vue.config.productionTip = false;
Vue.config.devtools = false;

const ISSUES = './static.json';
const SUBSCRIBE_API = '/.netlify/functions/newsletter-signup?email=';

Vue.filter('dateFm', d => {
	return d.split('T')[0];
});

let app = new Vue({
	el:'#app',
	data:{
		issues:[],
		email:'',
		status:''
	},
	created:function() {
		fetch(ISSUES)
		.then(res => res.json())
		.then(res => {
			this.issues = res.campaigns;
		})
		.catch(e => {
			// for now do nothing
		});
	},
	methods:{
		subscribe() {
			if(this.email === '') return;
			this.status = 'Attempting to subscribe...';

			fetch(SUBSCRIBE_API + this.email)
			.then(res => {
				return res.json()
			})
			.then(res => {
				
				if(res.status === 'subscribed') {
					this.status = 'Subscribed!';
				} else if(res.status === 400) {
					this.status = `There was an error: ${res.detail}`;
				}
				console.log('res', res);
			})
			.catch(e => {
				console.log('error result', e);
			});
		}
	}
});