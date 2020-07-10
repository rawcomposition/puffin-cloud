import React, { useEffect } from 'react';
import { setTitle } from '../../utils/global';
import './styles.scss';



function Error404() {
	useEffect(() => {
		setTitle("404 Not Found");
	}, []);

	return (
		<div className="error-page text-center">
			<h1>Oops. We couldn't find that :(</h1>
			<p>The page you're looking for must be really elusive.</p>
		</div>
	);
}

export default Error404;