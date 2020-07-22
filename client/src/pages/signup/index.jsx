import React from 'react';
import SignupForm from '../../components/signup-form';

function SignupPage() {
	return (
		<div className="container signup-page">
			<h3 className="headline text-center">Create Account</h3>
			<SignupForm/>
		</div>
	);
}

export default SignupPage;