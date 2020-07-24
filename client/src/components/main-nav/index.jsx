import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavItem from '../nav-item';
import AvatarDropdown from '../avatar-dropdown';
import { UserContext } from '../../providers/user/user.provider';
import { isLoggedIn } from '../../utils/user';
import './styles.scss';

function MainNav({menuOpen, handleMenuToggle}) {
	const { currentUser } = useContext(UserContext);
	return (
		<nav className={'main-nav ' + (menuOpen ? 'open' : '')}>
			<ul className='nav'>
				<li className='menu-header'>
					<span>Menu</span>
					<button className='btn-text close' onClick={handleMenuToggle}>&times;</button>
				</li>
				<NavItem label='Home' link='/'/>
				<NavItem label='About' link='/about'/>
				<NavItem label='Browse' link='/browse'/> 
			</ul>
			<ul className='nav right'>
				{(isLoggedIn() && currentUser && currentUser.id) ? (
					<div className='current-user'>
						<Link className='btn outline' to='/upload'>Upload Photos</Link>
						<AvatarDropdown/>
					</div>
				) : (
					<React.Fragment>
						<Link className='btn outline' to='/sign-up'>Contribute</Link>
						<NavItem label='Sign in' link='/login'/>
					</React.Fragment>
				)}
			</ul>
		</nav>
	)
}

export default MainNav;