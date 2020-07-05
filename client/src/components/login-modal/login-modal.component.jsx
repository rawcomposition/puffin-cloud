import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import './login-modal.component.scss';
import { UIContext } from '../../providers/ui/ui.provider';

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

function LoginModal() {
	const { loginModalHidden, toggleLoginModal } = useContext(UIContext);
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
		<div className={"modal-background login-modal" + (!loginModalHidden ? 'open' : '')}>
			<div className="modal-wrapper">
				<header>
					<h3>Login</h3>
					<span className="close" onClick={() => toggleLoginModal()}>&times;</span>
				</header>
				<div className="body">
					<form onSubmit={handleSubmit}>
						<input type="text" onChange={handleInputChange} name="email" value={email} placeholder="Email"/>
						<input type="password" onChange={handleInputChange} placeholder="Password" name="password" value={password}/>
						<button className="btn primary" disabled={submitDisabled}>Sign In</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginModal;