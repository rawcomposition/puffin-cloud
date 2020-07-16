import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { UIContext } from '../../providers/ui/ui.provider';
import { UserContext } from '../../providers/user/user.provider';
import './styles.scss';
import Avatar from '../avatar';
import SpeciesSearch from '../species-search';
import { isLoggedIn } from '../../utils/user';

function Header() {
	const history = useHistory();
	const { toggleLoginModal } = useContext(UIContext);
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const initialState = {
		speciesLabel: '',
		speciesCode: '',
		value: '',
	}

	const [menuOpen, setMenuOpen] = useState(false);
	const [formState, setFormState] = useState(initialState);
	const { speciesCode, speciesLabel, value } = formState;
	const { pathname } = useLocation();
	const isHome = pathname == '/';
	const node = useRef();
	
	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);

	const handleSpeciesChange = response => {
		const {speciesLabel, speciesCode } = response;
		setFormState({
			...formState,
			speciesLabel,
			speciesCode
		});
		history.push('/browse', {
			speciesLabel,
			speciesCode,
		});
	}

	const handleInputChange = (value) => {
		setFormState({
			...formState,
			value
		});
	}

	const handleLogout = (e) => {
		localStorage.removeItem('jwt');
		setCurrentUser({});
		window.location.href = '/';
	}

	const handleMenuClick = (e) => {
		setMenuOpen(menuOpen => !menuOpen);
	}

	const handleClick = e => {
		if (node.current && node.current.contains(e.target)) {
			return;
		}
		setMenuOpen(false);
	};

	return(
		<header className="masthead">
			<div className="nav-bar">
				<div className="icon">
					<Link className="active nav-item" to="/">
						<svg  className="img" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 0C460.22 3.56 96.44 38.2 71.01 287.61c-3.09 26.66-4.84 53.44-5.99 80.24l178.87-178.69c6.25-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.59 9.37 33.98 0l57.13-57.07c42.09-.14 84.15-2.53 125.96-7.36 53.48-5.44 97.02-26.47 132.58-56.54H255.74l146.79-48.88c11.25-14.89 21.37-30.71 30.45-47.12h-81.14l106.54-53.21C500.29 132.86 510.19 26.26 512 0z"></path></svg>
						<span>PuffinCloud</span>
					</Link>
				</div>
				
				<ul className="nav">
					<li>
						<Link className="nav-item" to="/">Home</Link>
					</li>
					<li>
						<Link className="nav-item" to="/about">About</Link>
					</li>
					<li>
						<Link className="nav-item" to="/browse">Browse</Link>
					</li>
				</ul>
				<ul className="nav right">
					{(isLoggedIn() && currentUser && currentUser.id) ? (
						<div className="current-user">
							<Link className="btn outline" to="/upload">Upload Photos</Link>
							<div className="dropdown-menu-container" onClick={handleMenuClick} ref={node}>
								<Avatar url={currentUser.avatar}/>
								<ul className={'dropdown-menu ' + (menuOpen ? 'active' : '')}>
									<li>
										<Link className="nav-item" to={'/profile/' + currentUser.id}>Profile</Link>
									</li>
									<li>
										<a className="nav-item" onClick={handleLogout}>Logout</a>
									</li>
								</ul>
							</div>
						</div>
					) : (
						<React.Fragment>
						<Link className="btn outline" to="/sign-up">Contribute</Link>
							<li>
								<a className="nav-item" onClick={() => toggleLoginModal()}>Sign In</a>
							</li>
						</React.Fragment>
					)}
				</ul>
			</div>
			{ isHome ? (
				<div className="container">
					<div className="row">
						<div className="">
							<div className="header-content">
								<h1 className="">Freely-usable bird images</h1>
								<span className="sub-heading">Licensed under creative commons for any use</span>
								<div className="search-combo">
									<SpeciesSearch handleChange={handleSpeciesChange} handleInputChange={handleInputChange} inputValue={value} hideBorder={true}/>
									<button className="btn primary search">Search</button>
								</div>
							</div>
						</div>
						<div className=""></div>
					</div>
				</div>
			) : ''}
			
		</header>
	);
}
export default Header;