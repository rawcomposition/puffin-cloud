import React from 'react';
import { isLoggedIn } from '../../utils/user';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({...props}) {
	return (
		isLoggedIn()
			? <Route {...props} />
			: <Redirect to="/"/>
	);
}

export default PrivateRoute;