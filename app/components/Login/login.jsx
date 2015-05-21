var React = require('react');

var { Navigation } = require('react-router');
var { Grid, Row, Col, Well, Button, Input, Alert } = require('react-bootstrap');

var auth = require('../../utils/auth');

module.exports = React.createClass({
	mixins : [Navigation],
	getInitialState: function() {
		return {
			error : false 
		};
	},
	handleSubmit : function(event){
		event.preventDefault();
	    var router = this.context.router;
	    var nextPath = router.getCurrentQuery().nextPath;
	    var email = this.refs.email.getValue();
	    var pass = this.refs.pass.getValue();
	    auth.login(email, pass, (loggedIn) => {
	      	if (!loggedIn)
	        	return this.setState({ error: true });
	      	if (nextPath) {
	        	router.replaceWith(nextPath);
	      	} else {
	        	router.replaceWith('users');
	      	}
	    })
	},
	handleAlertDismiss : function(){
		this.setState({ error : false })
	},
	render : function(){
		return <Grid>
			<Row>
				<Col xsOffset={4} xs={4}>
					<Well>
					<form onSubmit={this.handleSubmit}>
						<Input  ref="email" type='text' label='Login' placeholder='Enter Login' />
						<Input  ref="pass" type='text' label='Password' placeholder='Enter Password' />
						<div style={{ height : 72 }}>
						{this.state.error && <Alert dismissAfter={2000} onDismiss={this.handleAlertDismiss} bsStyle="danger" >incorect login/password</Alert>}
						</div>
						<Button type="submit">Login</Button>
					</form>
					</Well>
				</Col>
			</Row>
		</Grid>
	}
});