import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './providers/user/user.provider';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/home';
import PhotoPage from './pages/photo';
import BrowsePage from './pages/browse';
import UploadPage from './pages/upload';
import ProfilePage from './pages/profile';
import AccountPage from './pages/account';
import AboutPage from './pages/about';
import LicensePage from './pages/license';
import PrivateRoute from './components/private-route';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import Error404 from './pages/error-404';
import './_reboot.scss';
import './styles.scss';
import axios from 'axios';

function App() {
	const { setCurrentUser } = useContext(UserContext);
	useEffect(() => {
		axios.get('users/me')
		.then(response => {
			const user = response.data;
			setCurrentUser(user);
		})
		.catch(error => {});
	}, []);

  return (
	<React.Fragment>
		<Header/>
		<div className="page-container">
			<Switch>
			<Route exact path='/' component={HomePage}/>
			<Route path='/photo/:photoId' component={PhotoPage}/>
			<Route path='/profile/:userId' component={ProfilePage}/>
			<Route path='/account' component={AccountPage}/>
			<Route path='/browse' component={BrowsePage}/>
			<Route path='/about' component={AboutPage}/>
			<Route path='/license' component={LicensePage}/>
			<Route path ='/login' component={LoginPage}/>
			<Route path='/sign-up' component={SignupPage}/>
			<PrivateRoute path='/upload' component={UploadPage}/>
			<Route component={Error404}/>
			</Switch>
		</div>
		<Footer/>
	</React.Fragment>
  );
}

export default App;
