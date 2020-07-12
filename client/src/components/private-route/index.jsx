import React from 'react';
import { isLoggedIn } from '../../utils/user';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({...props}) {
	console.log(isLoggedIn());
	return (
		isLoggedIn()
			? <Route {...props} />
			: <Redirect to="/login"/>
	);
}

export default PrivateRoute;