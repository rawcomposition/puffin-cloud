import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './styles.scss';

function Footer() {
	return (
		<footer className="main-footer">
			<div className="container">
				<div className="siteinfo">
					<h2>PuffinCloud.org</h2>
					<p>All images are published under the Creative Commons Zero license, making bird images freely availabe for anyone to use. We hope to make it easier for organizations and individuals to advocate for the preservation of avian biodiversity and the environment. </p>
				</div>
				<div className="info-links">
					<Link to="/about">About</Link>	
					<Link to="/license">License</Link>
					<Link to="/sign-up">Contribute</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer;