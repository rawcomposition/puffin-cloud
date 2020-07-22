import React from 'react';
import LoginForm from '../../components/login-form';

function LoginPage() {
	return (
		<div className="container login-page">
			<h3 className="headline text-center">Login</h3>
			<LoginForm/>
		</div>
	);
}

export default LoginPage;