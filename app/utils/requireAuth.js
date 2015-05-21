var auth = require('./auth');

module.exports = {
	statics : {
		willTransitionTo : function(transition, params, query, callback){
			auth.getSession(function(loggedIn) {
				if (loggedIn) callback();
				else transition.redirect('/login', {}, {'nextPath' : transition.path});	
			})
		}
	}
}