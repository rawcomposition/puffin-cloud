import React from 'react';
import { Link } from 'react-router-dom';

function NavItem({label, link}) {
	return (
		<li>
			<Link className='nav-item' to={link}>{label}</Link>
		</li>
	)
}

export default NavItem;