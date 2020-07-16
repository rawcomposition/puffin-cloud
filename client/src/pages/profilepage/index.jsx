import React, { useState, useEffect } from 'react';
import PhotoList from '../../components/photo-list/photo-list.component';
import Avatar from '../../components/avatar';
import UserStats from '../../components/user-stats';
import { setTitle } from '../../utils/global';
import Error404 from '../error-404';
import axios from 'axios';
import Loader from '../../components/loader';
import './styles.scss';

function ProfilePage({match: {params: {userId}}}) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		axios.get('users/' + userId)
		.then(response => {
			setUser(response.data);
			setTitle(response.data.first_name + ' ' + response.data.last_name);
		})
		.catch(error => {
			setError(true);
		})
		.then(() => {
			setLoading(false);
		})
	}, []);

	if (loading) return <Loader/>;
	if (error || !user) return <Error404/>;
	return (
		<div className="container profile-page">
			<div className="profile">
				<div className="profile">
					<Avatar url={user.avatar} size="100"/>
					<span className="profile-info">
						<h3>{user.first_name} {user.last_name}</h3>
						<UserStats userId={user.id}/>
					</span>
				</div>
			</div>
			<PhotoList userId={userId}/>
		</div>
	);
}

export default ProfilePage;