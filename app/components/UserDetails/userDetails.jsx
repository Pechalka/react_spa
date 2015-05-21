var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;

var { Grid } = require('react-bootstrap');

var http = require('../../utils/http');

var UserDetails = React.createClass({
	mixins : [Navigation],
	getInitialState: function() {
		return {
			user : {
				name : '#'
			} 
		};
	},
	componentDidMount: function() {
		http.get('/api/users/' + this.props.params.id)
			.then((u)=>this.setState({ user : u }))
	},
	render: function() {
		return (
			<div>
				<h1>{this.state.user.name}</h1>
				<p>back to <a href={this.makeHref('users')}>users</a>
				</p>
			</div>
		);
	}

});

module.exports = UserDetails;