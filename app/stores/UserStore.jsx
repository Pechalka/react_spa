var React = require('react');

var Reflux = require('reflux');
var actions = require('./../actions');
var http = require('../utils/http');
var _ = require('lodash');

var _users = [];//state

module.exports = Reflux.createStore({
	init : function(){
		this.listenTo(actions.getUsers, this.getUsers);
		this.listenTo(actions.addUser, this.addUser)
		this.listenTo(actions.removeUser, this.removeUser)
	},
	removeUser : function(user){
		http.del('/api/users/' + user.id)
			.then(() => _.findIndex(_users, { id : user.id }))
			.then((index) => this.update({ $splice : [[index, 1]] }) )	
			.then((newState) => this.set(newState))
	},
	addUser : function(name){
		http.post('/api/users', { name : name })
			.then((newUser) => this.update({ $push : [newUser] }))
			.then((newState) => this.set(newState))
	},
	update : function($update){
		return React.addons.update(_users, $update)
	},
	set : function(data){
		_users = data;
		this.trigger(_users);
		return _users;
	},
	getUsers : function(){
		http.get('/api/users')
			.then((json)=> this.set(json))
	},
	getInitialState: function() {
		return _users;
	}
})