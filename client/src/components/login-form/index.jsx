import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import './styles.scss';

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(input: {
			identifier: $email,
			password: $password,
			provider: "local",
		}) {
			jwt
		}
	}
`;

const initialState = {
	email: '',
	password: '',
}

function LoginForm() {
	const [login] = useMutation(LOGIN_MUTATION);

	const [formState, setFormState] = useState(initialState);

	const { email, password } = formState;
	
	const handleLogin = () => {
		login({
			variables: {
				email: email,
				password: password,
				provider: 'local',
			}
		}).then(response => {
			const { jwt } = response.data.login;
			localStorage.setItem('jwt', jwt);
			window.location.href = '/';
		});
	}
	
	const handleInputChange = event => {
		const {name, value} = event.target;
		setFormState({...formState, [name]: value});
	}

	const handleSubmit = event => {
		event.preventDefault();
		handleLogin();
	}

	const submitDisabled = !email || !password;

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<input type="text" onChange={handleInputChange} name="email" value={email} placeholder="Email"/>
			<input type="password" onChange={handleInputChange} placeholder="Password" name="password" value={password}/>
			<div className="button-container">
				<button className="btn primary" disabled={submitDisabled}>Sign In</button>
				<Link to="/forgot-password">Forgot Password</Link>
			</div>
			<div className="text-center text-muted mt-2">
				Need an account? <Link to="/sign-up">Sign up</Link>
			</div>
		</form>
	);
}

export default LoginForm;