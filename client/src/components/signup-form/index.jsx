import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import './styles.scss';

const SIGNUP_MUTATION = gql`
	mutation Signup($email: String!, $password: String!) {
		register(input: {
			email: $email,
			username: $email,
			password: $password,
		}) {
			jwt
		}
	}
`;

const initialState = {
	email: '',
	password: '',
}

function SignupForm() {
	const [ signup, { loading: mutationLoading, error } ] = useMutation(SIGNUP_MUTATION);

	const [formState, setFormState] = useState(initialState);
	const [formError, setFormError] = useState(null);

	const { email, password } = formState;
	
	const handleSignup = () => {
		setFormError(false);
		signup({
			variables: {
				email: email,
				password: password,
				provider: 'local',
			}
		}).then(response => {
			const { jwt } = response.data.register;
			localStorage.setItem('jwt', jwt);
			window.location.href = '/upload';
		}).catch((e) => {
			setFormError(true);
		});
	}
	
	const handleInputChange = event => {
		const {name, value} = event.target;
		setFormState({...formState, [name]: value});
	}

	const handleSubmit = event => {
		event.preventDefault();
		handleSignup();
	}

	const submitDisabled = !email || !password || mutationLoading;
	return (
		<form onSubmit={handleSubmit} className="signup-form">
			{formError && <div className="form-error">Error creating account</div>}
			<input type="text" onChange={handleInputChange} name="email" value={email} placeholder="Email"/>
			<input type="password" onChange={handleInputChange} placeholder="Password" name="password" value={password}/>
			<button className={'m-auto btn primary' + (submitDisabled ? ' disabled' : '')} disabled={submitDisabled}>Create Account</button>
			<div className="text-center text-muted mt-2">
				Already have an account? <Link to="/signup">Signup</Link>
			</div>
		</form>
	);
}

export default SignupForm;