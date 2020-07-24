import React, { useContext, useEffect, useState, useRef } from 'react';
import NavItem from '../nav-item';
import Avatar from '../avatar';
import { UserContext } from '../../providers/user/user.provider';
import './styles.scss';

function AvatarDropdown() {
	const { currentUser } = useContext(UserContext);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const node = useRef();

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);

	const handleDropdownClick = (e) => {
		setDropdownOpen(dropdownOpen => !dropdownOpen);
	}

	const handleClick = e => {
		if (node.current && node.current.contains(e.target)) {
			return;
		}
		setDropdownOpen(false);
	}

	return (
		<div className='dropdown-menu-container' onClick={handleDropdownClick} ref={node}>
			<Avatar url={currentUser.avatar}/>
			<ul className={'dropdown-menu ' + (dropdownOpen ? 'active' : '')}>
				<NavItem label='Profile' link={'/profile/' + currentUser.id}/>
				<NavItem label='Account Settings' link={'/profile/' + currentUser.id}/>
				<NavItem label='Logout' link='/logout'/>
			</ul>
		</div>
	)
}

export default AvatarDropdown;