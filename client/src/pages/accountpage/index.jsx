import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../providers/user/user.provider';
import { setTitle } from '../../utils/global';
import Avatar from '../../components/avatar';
import Error404 from '../error-404';
import axios from 'axios';
import './styles.scss';

function AccountPage({match: {params: {userId}}}) {
	const { currentUser } = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [tab, setTab] = useState('basic');

	const initialState = {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
	}
	
	const [formState, setFormState] = useState(initialState);
	const {email, first_name, last_name, password} = formState;

	useEffect(() => {
		setTitle('Account settings');
		if(currentUser) {
			const { email, first_name, last_name } = currentUser;
			setFormState({
				email,
				first_name,
				last_name,
			});
		}
	}, [currentUser]);

	const handleInputChange = event => {
		const {name, value} = event.target;
		setFormState({...formState, [name]: value});
	}

	const handleTabChange = tab => {
		setTab(tab);
		setError(false);
		setSuccess(false);
	}

	const handleBasicSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);
		setSuccess(false);
		axios.put('users/basic', {
			first_name,
			last_name,
			email
		})
		.then(response => {
			setSuccess(true);
		})
		.catch(error => {
			let message = "Error saving account info.";
			try {
				message = error.response.data.message[0].messages[0].message;
			} catch (error) {}
			setError(message);
		})
		.then(() => {
			setLoading(false);
		});
	}

	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);
		setSuccess(false);
		axios.put('users/password', {
			password
		})
		.then(response => {
			setSuccess(true);
		})
		.catch(error => {
			let message = "Error updating password";
			try {
				message = error.response.data.message[0].messages[0].message;
			} catch (error) {}
			setError(message);
		})
		.then(() => {
			setLoading(false);
		});
	}

	if (!currentUser) return '';
	return (
		<div className="container compact account-page">
			<ul className="menu">
				<li className={tab == 'basic' ? 'active' : ''} onClick={() => handleTabChange('basic')}>Name & Email</li>
				<li className={tab == 'avatar' ? 'active' : ''} onClick={() => handleTabChange('avatar')}>Profile Picture</li>
				<li className={tab == 'password' ? 'active' : ''} onClick={() => handleTabChange('password')}>Password</li>
			</ul>
			<div>
				{error && <div className="form-error">{error}</div>}
				{success && <div className="form-success">Saved successfully</div>}
				{ tab == 'basic' &&
					<form onSubmit={handleBasicSubmit}>
						<label>First name<input type="text" name="first_name" value={first_name} onChange={handleInputChange}/></label>
						<label>Last name<input type="text" name="last_name" value={last_name} onChange={handleInputChange}/></label>
						<label>Email<input type="text" name="email" value={email} onChange={handleInputChange}/></label>
						<button type="submit" className={'btn primary' + (loading ? ' disabled' : '')}>Save</button>
					</form>
				}
				{ tab == 'avatar' &&
					<div className="mt-1"><Avatar url={currentUser.avatar} size="70"/>Your profile picture is pulled automatically from <a href="https://gravatar.com/">gravatar.com</a>. To add, update, or remove your avatar, you may do so using their website.</div>
				}
				{ tab == 'password' &&
					<form onSubmit={handlePasswordSubmit}>
						<label>New password<input type="password" placeholder="New password" name="password" value={password} onChange={handleInputChange}/></label>
						<button type="submit" className={'btn primary' + (loading ? ' disabled' : '')}>Save</button>
					</form>
				}
			</div>
			
		</div>
	);
}

export default AccountPage;