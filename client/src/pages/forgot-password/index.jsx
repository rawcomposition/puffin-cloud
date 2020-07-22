import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setTitle } from '../../utils/global';

function ForgotPassword() {
	const [input, setInput] = useState('');
	const [formError, setFormError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setTitle('Update Password');
	},[]);

	const handleSubmit = event => {
		event.preventDefault();
		setLoading(true);
		setFormError(false);
		axios.post('auth/forgot-password', {
			email: input,
		})
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
	
	const submitDisabled = !input || loading;

	return (
		<div className="container forgot-password-page">
			<h3 className="headline text-center">Forgot Password</h3>
			<form className="auth-form" onSubmit={handleSubmit}>
				{formError && <div className="form-error">{formError}</div>}
				{success && <div className="form-success">Sucess! Check your email for further instructions. <i>Note: it may take several minutes for the email to arrive.</i></div>}
				<input type="email" onChange={(e) => setInput(e.target.value)} placeholder="Email" value={input}/>
				<div className="button-container">
					<button className={'btn primary' + (submitDisabled ? ' disabled' : '')}>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default ForgotPassword;