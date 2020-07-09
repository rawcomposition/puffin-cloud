import React, { useEffect, useState } from 'react';

function UserStats({userId}) {
	const initialState = {
		species_count: '...',
		species_percent: '...',
	}
	
	const [stats, setStats] = useState(initialState);
	
	useEffect(() => {
		fetch(process.env.REACT_APP_BASE_URL + '/stats/user/' + userId)
		.then(response => response.json())
		.then( data => {
			setStats(data);
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