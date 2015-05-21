var React = require('react');

var { RouteHandler, Navigation } = require('react-router');
var { Grid } = require('react-bootstrap');

var auth = require('../../utils/auth');

var Layout = React.createClass({
	mixins : [Navigation],
	logOut : function(e){
		e.preventDefault();
		var router = this.context.router;
		auth.logout(() => router.replaceWith('login'));
	},
	render: function() {
		return <Grid>
			<a href="javascript:void(0)" onClick={this.logOut}>logout</a>
			<RouteHandler/>
		</Grid>
	}

});

module.exports = Layout;