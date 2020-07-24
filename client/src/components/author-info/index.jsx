import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../components/avatar';
import './styles.scss';

function AuthorInfo({id, first_name, last_name, avatar_url}) {
	return (
		<Link className="author-info" to={'/profile/' + id}>
			<div className="name">
				<span className="text-muted text-small">Photographer</span><br/>
				<strong>{first_name} {last_name}</strong>
			</div>
			<Avatar url={avatar_url}/>
		</Link>
	)
}

export default AuthorInfo;