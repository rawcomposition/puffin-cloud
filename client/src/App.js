import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import LoginModal from './components/login-modal/login-modal.component';
import HomePage from './pages/homepage/homepage.component';
import PhotoPage from './pages/photopage/photopage.component';
import BrowsePage from './pages/browsepage';
import './_reboot.scss';
import './App.scss';

function App() {
  return (
	<div className="wrapper">
		<Header/>
		<Switch>
          <Route exact path='/' component={HomePage}/>
		  <Route path='/photo/:photoId' component={PhotoPage}/>
		  <Route path='/browse' component={BrowsePage}/>
		</Switch>
		<LoginModal/>
	</div>
  );
}

export default App;
