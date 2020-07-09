import React from 'react';
import PhotoList from '../../components/photo-list/photo-list.component';
import Avatar from '../../components/avatar';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UserStats from '../../components/user-stats';
import './styles.scss';

const USER_QUERY = gql`
	query User($userId: ID!){
		user(id: $userId) {
			first_name,
			last_name,
			id
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
						if (error) return `Error! ${error.message}`
						if (data.user) {
							return (
								<div className="profile">
									<Avatar size="100"/>
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