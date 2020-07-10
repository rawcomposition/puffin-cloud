import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './styles.scss';

function Footer() {
	return (
		<footer className="main-footer">
			<div className="container">
				<div className="siteinfo">
					<h2>PuffinCloud.org</h2>
					<p>Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper.</p>
				</div>
				<div className="info-links">
					<Link to="/about">About</Link>	
					<Link to="/license">License</Link>
					<a href="">Contribute</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer;