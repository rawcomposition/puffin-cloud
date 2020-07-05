import React, { useEffect, useState } from 'react';
import './styles.scss';

function Stats() {
	const initialState = {
		species_count: '...',
		species_percent: '...',
		user_count: '...',
	}
	
	const [stats, setStats] = useState(initialState);
	
	useEffect(() => {
		fetch(process.env.REACT_APP_BASE_URL + '/stats')
		.then(response => response.json())
		.then( data => {
			setStats(data);
		})
		.catch(err => {});
	}, []);
	
	return (
		<div className="stats">
			<div className="stat-box">
				<span className="stat">{stats.species_count}</span>
				<h3>Species with photos</h3>
			</div>
			<div className="stat-box">
				<span className="stat">{stats.species_percent}</span>
				<h3>Percent of all bird species</h3>
			</div>
			<div className="stat-box">
				<span className="stat">{stats.user_count}</span>
				<h3>Contributors</h3>
			</div>
		</div>
	);
}

export default Stats;