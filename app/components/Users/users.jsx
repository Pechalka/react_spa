var React = require('react');

var { Navigation }  = require('react-router');

var { Button, Well, Input } = require('react-bootstrap');


var actions = require('actions');
var users = require('stores/UserStore');

var Reflux = require('reflux');

var requireAuth = require('utils/requireAuth');


var Users = React.createClass({
	mixins : [
		Navigation,
		Reflux.connect(users, 'users'),
		React.addons.LinkedStateMixin,
		requireAuth
	],
	getInitialState: function() {
		return {
			name : '' 
		};
	},
	componentDidMount: function() {
		actions.getUsers();
	},
	add : function(){
		if (!this.state.name) return;//TODO: add validation

		actions.addUser(this.state.name)

		this.setState({ name : '' })
	},
	renderForm : function(){
		var addBtn = <Button onClick={this.add}>add</Button>
		return <Well>
			<Input type="text" valueLink={this.linkState('name')} buttonAfter={addBtn}/>
		</Well>
	},
	renderRow : function(u){
		return <div key={u.id} className="clearfix">
			<a href={this.makeHref('userDetails', { id : u.id })}>{u.name}</a>
			<Button className="pull-right" onClick={actions.removeUser.bind(null, u)}>remove</Button>
		</div>
	},
	render: function() {
		var users = this.state.users.map(this.renderRow);
		var form = this.renderForm();

		return <div>
			<div>{users}</div>
			{form}
		</div>
	}

});

module.exports = Users;