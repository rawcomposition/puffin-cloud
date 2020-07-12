import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory'
import UIProvider from './providers/ui/ui.provider';
import { getJWT } from './utils/user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337/';

const uploadLink = createUploadLink({
	uri: 'http://localhost:1337/graphql',
	headers: {
		"keep-alive": "true"
	}
});

const jwt = getJWT();

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: {
			authorization: jwt ? 'Bearer ' + jwt : '',
		}
	});

	return forward(operation);
});

const client = new ApolloClient({
	link: concat(authMiddleware, uploadLink),
	cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<UIProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UIProvider>
	</ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
