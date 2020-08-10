import React from 'react';
import './styles.scss';

function Map({lat, lng}) {
	return(
		<a href={`http://maps.google.com/maps?q=${lat},${lng}&ll=${lat},${lng}&z=7`} target='_blank'>
			<img className="map" alt="Map" src={`https://maps.googleapis.com/maps/api/staticmap?zoom=5&scale=2&size=400x200&maptype=roadmap&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&format=jpg&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:S%7C${lat}%2C${lng}`}/>
		</a>
	)
}

export default Map;