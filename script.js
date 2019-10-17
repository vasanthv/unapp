const Unapp = new Vue({
	el: '#unapp',
	data: {
		query: '',
		allPosts: [],
		showLoadMore: false,
		isloading: false,
		showing: 10
	},
	computed: {
		posts: function() {
			let posts = this.allPosts;
			if (this.query) {
				const tag = this.query.charAt(0) == '#' ? this.query.substr(1) : '';
				posts = tag ?
					posts.filter(p => p.tags.includes(tag)) :
					posts.filter(p => (p.name.search(new RegExp(this.query, 'gi')) >= 0 || p.description.search(new RegExp(this.query, 'gi')) >= 0));
			}
			return posts.slice(0, this.showing);
		}
	},
	methods: {
		getPosts: function() {
			this.isloading = true;
			window.fetch('/posts.json').then(response => {
				if (response.status >= 200 && response.status < 300) return response.json();
			}).then(posts => {
				this.allPosts = posts;
				this.isloading = false;
			}).catch(console.error);
		},
		tagClick: function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.query = '#' + e.target.getAttribute("data-tag");
		}
	}
});
(function() {
	Unapp.getPosts();
})();
