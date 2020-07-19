import axios from 'axios';
export const getJWT = () => {
	return localStorage.getItem('jwt');
}

export const setJWT = (jwt) => {
	localStorage.setItem('jwt', jwt);
	axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export const isLoggedIn = () => {
	return !! getJWT();
}