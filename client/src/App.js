import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './providers/user/user.provider';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/homepage/homepage.component';
import PhotoPage from './pages/photopage/photopage.component';
import BrowsePage from './pages/browsepage';
import UploadPage from './pages/uploadpage';
import ProfilePage from './pages/profilepage';
import AboutPage from './pages/aboutpage';
import LicensePage from './pages/licensepage';
import PrivateRoute from './components/private-route';
import LoginPage from './pages/loginpage';
import SignupPage from './pages/signuppage';
import Error404 from './pages/error-404';
import './_reboot.scss';
import './App.scss';
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
		<Switch>
          <Route exact path='/' component={HomePage}/>
		  <Route path='/photo/:photoId' component={PhotoPage}/>
		  <Route path='/profile/:userId' component={ProfilePage}/>
		  <Route path='/browse' component={BrowsePage}/>
		  <Route path='/about' component={AboutPage}/>
		  <Route path='/license' component={LicensePage}/>
		  <Route path ='/login' component={LoginPage}/>
		  <Route path='/sign-up' component={SignupPage}/>
		  <PrivateRoute path='/upload' component={UploadPage}/>
		  <Route component={Error404}/>
		</Switch>
		<Footer/>
	</React.Fragment>
  );
}

export default App;
