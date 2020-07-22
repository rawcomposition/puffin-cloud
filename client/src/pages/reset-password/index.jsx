import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setTitle } from '../../utils/global';
import Error404 from '../error-404';
import { Link } from 'react-router-dom';

const initialState = {
	password: '',
	passwordConfirmation: '',
	code: '',
}

function ResetPassword({location: { search }}) {
	const [state, setState] = useState(initialState);
	const [formError, setFormError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const { password, passwordConfirmation, code } = state;

	useEffect(() => {
		const { code } = state;
		setTitle('Update Password');
		if(!code) {
			const code = new URLSearchParams(search).get("code") || 'undefined';
			setState({...state, code});
		}
	},[state, search]);

	const handleSubmit = event => {
		event.preventDefault();
		setLoading(true);
		setFormError(false);
		axios.post('auth/reset-password', state)
		.then(response => {
			setSuccess(true);
		})
		.catch(error => {
			let message = "Error processing request";
			try {
				message = error.response.data.message[0].messages[0].message;
			} catch (error) {}
			setFormError(message);
		})
		.then(() => {
			setLoading(false);
		});
	}
	
	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setState({...state, [name]: value });
	}

	const submitDisabled = (!password || !passwordConfirmation) || loading;
	if(code === "undefined") return <Error404/>
	return (
		<div className="container">
			<h3 className="headline text-center">Update Password</h3>
			<form className="auth-form" onSubmit={handleSubmit}>
				{formError && <div className="form-error">{formError}</div>}
				{success && <div className="form-success">Sucess! You may now <Link to='/login'>login</Link></div>}
				<input type="password" onChange={handleInputChange} placeholder="New password" name="password" value={password}/>
				<input type="password" onChange={handleInputChange} placeholder="Confirm password" name="passwordConfirmation" value={passwordConfirmation}/>
				<div className="button-container">
					<button className={'btn primary' + (submitDisabled ? ' disabled' : '')}>Save</button>
				</div>
			</form>
		</div>
	);
}

export default ResetPassword;