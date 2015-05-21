
var http = require('./http')

module.exports = (function(){
	var _user = null;
	return {
  login : function(email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (_user) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }

    http.post('/api/session', { email : email , password : pass })
    	.done(function(user){
    		_user = user;
    		if (cb) cb(true);
    		this.onChange(true);
    	}.bind(this))
    	.fail(function() {
    		if (cb) cb(false);
    		this.onChange(false);
    	}.bind(this))
  },


  logout: function (cb) {
  	http.del('/api/session')
  		.then(function(){
  			_user = null;
		    if (cb) cb();
		    this.onChange(false);  			
  		}.bind(this))
  },

  loggedIn: function () {
  		return !!_user;
  },

  getSession : function(cb){
  	if (_user) return cb(_user);

	http.get('/api/session')
		.done(function(user) {
			_user = user;
			cb(user)
		})
		.fail(function() {
			cb(null)
		})
  },

  onChange: function () {}
};
})()
