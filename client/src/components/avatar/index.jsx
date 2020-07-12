import React from 'react';
import './styles.scss';

function Avatar({url, size = 50}) {
	return (
		<img width={size} height={size} className="avatar" src={url}/>
	)
}

export default Avatar;