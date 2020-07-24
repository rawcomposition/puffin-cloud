import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import HomeBanner from '../home-banner';
import MainNav from '../main-nav';
import Logo from '../logo';
import './styles.scss';

function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const { pathname } = useLocation();
	const isHome = pathname === '/';

	const handleMenuToggle = () => {
		setMenuOpen(!menuOpen);
	}

	return(
		<header className="main-header">
			<div className="nav-bar">
				<Logo/>
				<MainNav menuOpen={menuOpen} handleMenuToggle={handleMenuToggle}/>
				<button className="btn-text right menu-toggle" onClick={handleMenuToggle}><span className="hamburger"></span></button>
			</div>
			{ isHome ? (
				<HomeBanner/>
			) : ''}
			
		</header>
	);
}
export default Header;