import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.scss';

const initialState = {
	email: '',
	password: '',
}

function SignupForm() {
	const [formState, setFormState] = useState(initialState);
	const [formError, setFormError] = useState(null);
	const [loading, setLoading] = useState(false);

	const { email, password } = formState;
	
	const handleSignup = () => {
		setLoading(true);
		setFormError(false);
		axios.post('auth/local/register', {
			email: email,
			username: email,
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
		handleSignup();
	}

	const submitDisabled = !email || !password || loading;
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