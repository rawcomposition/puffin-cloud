import React from 'react';
import { Link } from 'react-router-dom';
import PhotoList from '../../components/photo-list';
import Stats from '../../components/stats';


function HomePage() {
	return (
		<React.Fragment>
			<div className="container">
				<h3 className="headline text-center">Latest Images</h3>
				<PhotoList infiniteScroll={false} loadMore={false} perPage="6"/>
				<p className="text-center mt-4">
					<Link className="btn" to="/browse">View More</Link>
				</p>
			</div>
			<div className="alt-bg mt-4">
				<div className="container">
					<h3 className="headline text-center">Stats</h3>	
					<Stats/>
				</div>
			</div>
		</React.Fragment>
	);
}

export default HomePage;