import React, { useEffect } from 'react';
import SignupForm from '../../components/signup-form';
import { setTitle } from '../../utils/global';

function SignupPage() {
	useEffect(() => {
		setTitle('Create Account');
	},[]);
	return (
		<div className="container signup-page">
			<h3 className="headline text-center">Create Account</h3>
			<SignupForm/>
		</div>
	);
}

export default SignupPage;