import { useEffect, useContext } from 'react';
import { UserContext } from '../../providers/user/user.provider';

function LogoutPage() {
	const { setCurrentUser } = useContext(UserContext);
	useEffect(() => {
		localStorage.removeItem('jwt');
		setCurrentUser({});
		window.location.href = '/';
	},[setCurrentUser]);
	return '';
}

export default LogoutPage;