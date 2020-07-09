export const getJWT = () => {
	return localStorage.getItem('jwt');
}

export const isLoggedIn = () => {
	return !! getJWT;
}