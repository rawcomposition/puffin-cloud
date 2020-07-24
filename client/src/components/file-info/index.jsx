import React from 'react';
import './styles.scss';

function FileInfo({size, width, height}) {
	return (
		<div className="file-info">
			<b>License: </b>Creative Commons Zero<br/>
			<b>File size: </b>{(parseInt(size)/1000).toFixed(1)+' mb'}<br/>
			<b>Dimensions: </b>{width + 'x' + height +' px'}
		</div>
	)
}

export default FileInfo;