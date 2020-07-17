import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../providers/user/user.provider';
import { setTitle } from '../../utils/global';
import Avatar from '../../components/avatar';
import Error404 from '../error-404';
import axios from 'axios';
import './styles.scss';

function AccountPage({match: {params: {userId}}}) {
	const { currentUser } = useContext(UserContext);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [tab, setTab] = useState('basic');

	useEffect(() => {
		setTitle('Account settings');
	}, []);

	if (error) return <Error404/>;
	if (!currentUser) return '';
	return (
		<div className="container compact account-page">
			<ul className="menu">
				<li className={tab == 'basic' ? 'active' : ''} onClick={() => setTab('basic')}>Name & Email</li>
				<li className={tab == 'avatar' ? 'active' : ''} onClick={() => setTab('avatar')}>Profile Picture</li>
				<li className={tab == 'password' ? 'active' : ''} onClick={() => setTab('password')}>Password</li>
			</ul>
			{ tab == 'basic' &&
				<form>
					<label>First name<input type="text" value={currentUser.first_name}/></label>
					<label>Last name<input type="text" value={currentUser.last_name}/></label>
					<label>Email<input type="text" value={currentUser.email}/></label>
				</form>
			}
			{ tab == 'avatar' &&
				<div className="mt-1"><Avatar url={currentUser.avatar} size="70"/>Your profile picture is pulled automatically from <a href="https://gravatar.com/">gravatar.com</a>. To add, update, or remove your avatar, you may do so using their website.</div>
			}
			{ tab == 'password' &&
				<form>
				<label>New password<input type="password" placeholder="New password"/></label>
				</form>
			}
			
		</div>
	);
}

export default AccountPage;