import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.scss';

const initialState = {
	email: '',
	password: '',
}

function LoginForm() {
	const [formState, setFormState] = useState(initialState);
	const [formError, setFormError] = useState(null);
	const [loading, setLoading] = useState(false);

	const { email, password } = formState;
	
	const handleLogin = () => {
		setLoading(true);
		setFormError(false);
		axios.post('auth/local', {
			identifier: email,
			password: password,
		})
		.then(response => {
			const { jwt } = response.data;
			if(typeof jwt === 'string') {
				localStorage.setItem('jwt', jwt);
			}
			window.location.href = '/';
		})
		.catch(error => {
			setFormError(true);
		})
		.then(() => {
			setLoading(false);
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

	const submitDisabled = !email || !password || loading;

	return (
		<form onSubmit={handleSubmit} className="login-form">
			{formError && <div className="form-error">Unable to login. Please double check your email and password.</div>}
			<input type="text" onChange={handleInputChange} name="email" value={email} placeholder="Email"/>
			<input type="password" onChange={handleInputChange} placeholder="Password" name="password" value={password}/>
			<div className="button-container">
				<button className={'btn primary' + (submitDisabled ? ' disabled' : '')} disabled={submitDisabled}>Sign In</button>
				<Link to="/forgot-password">Forgot Password</Link>
			</div>
			<div className="text-center text-muted mt-2">
				Need an account? <Link to="/sign-up">Sign up</Link>
			</div>
		</form>
	);
}

export default LoginForm;