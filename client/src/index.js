import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './providers/user/user.provider';
import axios from 'axios';
import { getJWT } from './utils/user';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const jwt = getJWT();
if(jwt) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

ReactDOM.render(
	<UserProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</UserProvider>,
  document.getElementById('root')
);
