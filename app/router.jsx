var React = require('react');
var Router = require('react-router');

var { Route, Link, State, 
	Navigation, RouteHandler, 
	DefaultRoute } = Router;


var App = require('./components/App/app');
var Layout = require('./components/Layout/Layout');
var Login = require('./components/Login/login');
var Users = require('./components/Users/users');
var UserDetails = require('./components/UserDetails/userDetails');


var routes = (<Route handler={App} path="/">
	    <DefaultRoute handler={Login} />	
		<Route name="login" handler={Login} />     
		<Route handler={Layout} path="admin">
		    <DefaultRoute handler={Users} />		    
			<Route name="users" handler={Users} />  
			<Route path="users/:id" name="userDetails" handler={UserDetails} />  
  
		</Route>
	</Route>)

module.exports = {
	run : function(){
		Router.run(routes, function (Handler) { React.render(<Handler/>, document.body);});
	}
}
