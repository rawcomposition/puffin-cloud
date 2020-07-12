export const getJWT = () => {
	return localStorage.getItem('jwt');
}

export const isLoggedIn = () => {
	return !! getJWT();
}

export const logout = () => {
	localStorage.removeItem('jwt');
	window.location.href = '/';
}