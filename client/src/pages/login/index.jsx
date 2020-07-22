import React, { useEffect } from 'react';
import LoginForm from '../../components/login-form';
import { setTitle } from '../../utils/global';

function LoginPage() {
	useEffect(() => {
		setTitle('Login');
	},[]);
	return (
		<div className="container login-page">
			<h3 className="headline text-center">Login</h3>
			<LoginForm/>
		</div>
	);
}

export default LoginPage;