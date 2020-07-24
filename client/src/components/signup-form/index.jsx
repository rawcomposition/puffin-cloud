import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../providers/user/user.provider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setJWT } from '../../utils/user';

const initialState = {
	email: '',
	password: '',
}

function SignupForm() {
	const history = useHistory();
	const {setCurrentUser} = useContext(UserContext);
	const [formState, setFormState] = useState(initialState);
	const [formError, setFormError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

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
				setJWT(jwt);
				setCurrentUser(response.data.user);
				setSuccess(true);
			}
			setTimeout(() => {
				history.push('/');
			}, 1000);
		})
		.catch(error => {
			let message = "Error creating account";
			try {
				message = error.response.data.message[0].messages[0].message;
			} catch (error) {}
			setFormError(message);
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
		<form onSubmit={handleSubmit} className="signup-form auth-form">
			{formError && <div className="form-error">{formError}</div>}
			{success && <div className="form-success">Sign up successful</div>}
			<input type="text" onChange={handleInputChange} name="email" value={email} placeholder="Email"/>
			<input type="password" onChange={handleInputChange} placeholder="Password" name="password" value={password}/>
			<button className={'m-auto btn primary' + (submitDisabled ? ' disabled' : '')} disabled={submitDisabled}>Create Account</button>
			<div className="text-center text-muted mt-2">
					Already have an account? <Link to="/login">Login</Link>
			</div>
		</form>
	);
}

export default SignupForm;