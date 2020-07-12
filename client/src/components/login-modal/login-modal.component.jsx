import React, { useContext } from 'react';
import './login-modal.component.scss';
import { UIContext } from '../../providers/ui/ui.provider';
import LoginForm from '../login-form';

function LoginModal() {
	const { loginModalHidden, toggleLoginModal } = useContext(UIContext);

	return (
		<div className={"modal-background login-modal" + (!loginModalHidden ? 'open' : '')}>
			<div className="modal-wrapper">
				<header>
					<h3>Login</h3>
					<span className="close" onClick={() => toggleLoginModal()}>&times;</span>
				</header>
				<div className="body">
					<LoginForm/>
				</div>
			</div>
		</div>
	);
}

export default LoginModal;