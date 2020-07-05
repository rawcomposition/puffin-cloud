import React from 'react';
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
					<a href="">About</a>	
					<a href="">License</a>
					<a href="">Contribute</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer;