import React from 'react';
import './styles.scss';

function Avatar({size = 50}) {
	return (
		<img width={size} height={size} className="avatar" src="http://rawcomposition.com/rawcomposition/wp-content/uploads/2014/07/299345_2396207908406_1347214951_2867795_76565241_n.jpg"/>
	)
}

export default Avatar;