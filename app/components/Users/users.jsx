var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;

var http = require('../../utils/http');

var Users = React.createClass({
	mixins : [Navigation],
	getInitialState: function() {
		return {
			users : [] 
		};
	},
	componentDidMount: function() {
		http.get('/api/users')
			.then((json)=> this.setState({ users : json }))
	},
	renderRow : function(u){
		return <div key={u.id}>
			<a href={this.makeHref('userDetails', { id : u.id })}>{u.name}</a>
		</div>
	},
	render: function() {
		var users = this.state.users.map(this.renderRow);
		return <div>{users}</div>
	}

});

module.exports = Users;