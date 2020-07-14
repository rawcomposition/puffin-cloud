import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker'
import UIProvider from './providers/ui/ui.provider';
import axios from 'axios';
import { getJWT } from './utils/user';

axios.defaults.baseURL = 'http://localhost:1337/';
const jwt = getJWT();
if(jwt) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

ReactDOM.render(
	<UIProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</UIProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
