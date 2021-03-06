import React from 'react';
import { isLoggedIn } from '../../utils/user';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({...props}) {
	return (
		isLoggedIn()
			? <Redirect to="/"/>
			: <Route {...props} />
	);
}

export default AuthRoute;