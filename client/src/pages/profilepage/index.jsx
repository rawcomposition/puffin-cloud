import React from 'react';
import PhotoList from '../../components/photo-list/photo-list.component';
import Avatar from '../../components/avatar';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UserStats from '../../components/user-stats';
import { setTitle } from '../../utils/global';
import Error404 from '../error-404';
import './styles.scss';

const USER_QUERY = gql`
	query User($userId: ID!){
		user(id: $userId) {
			first_name,
			last_name,
			id,
			avatar
		}
	}
`;
function ProfilePage({match: {params: {userId}}}) {
	return (
		<div className="container profile-page">
			<div className="profile">
				<Query query={USER_QUERY} variables={{userId}}>
					{({ loading, error, data }) => {
						if (loading) return "Loading stats..."
						if (error || ! data.user) return <Error404/>
						if (data.user) {
							setTitle(data.user.first_name + ' ' + data.user.last_name);
							return (
								<div className="profile">
									<Avatar url={data.user.avatar} size="100"/>
									<span className="profile-info">
										<h3>{data.user.first_name} {data.user.last_name}</h3>
										<UserStats userId={data.user.id}/>
									</span>
								</div>
							);
						} else {
							return <p>User not found</p>
						}
					}}
				</Query>
			</div>
			<PhotoList userId={userId}/>
		</div>
	);
}

export default ProfilePage;