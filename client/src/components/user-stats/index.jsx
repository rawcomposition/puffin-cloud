import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserStats({userId}) {
	const initialState = {
		species_count: '...',
		species_percent: '...',
	}
	
	const [stats, setStats] = useState(initialState);
	
	useEffect(() => {
		axios.get('stats/user/' + userId)
		.then(response => {
			setStats(response.data);
		})
		.catch(err => {});
	}, []);
	
	return (
		<React.Fragment>
			Total species: {stats.species_count}<br/>
			Total images: {stats.image_count}
		</React.Fragment>
	);
}

export default UserStats;