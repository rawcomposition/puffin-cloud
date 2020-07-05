import React, { useEffect, useState } from 'react';
import PhotoList from '../../components/photo-list/photo-list.component';
import Stats from '../../components/stats';


function HomePage() {
	return (
		<React.Fragment>
			<div className="container">
				<h3 className="headline text-center">Latest Images</h3>
				<PhotoList infiniteScroll={false} loadMore={false}/>
			</div>
			<div className="alt-bg">
				<div className="container">
					<h3 className="headline text-center">Stats</h3>	
					<Stats/>
				</div>
			</div>
		</React.Fragment>
	);
}

export default HomePage;