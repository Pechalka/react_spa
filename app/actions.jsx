var Reflux = require('reflux');


var actions = Reflux.createActions([
	'getUsers',
	'addUser',
	'removeUser'
])

module.exports = actions;