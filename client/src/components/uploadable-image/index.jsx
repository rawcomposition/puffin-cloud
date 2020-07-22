import React, { useState } from 'react';
import SpeciesSearch from '../../components/species-search';
import PlacesSearch from '../places-search';

function UploadableImage({image, index, handleSpeciesChange, handleLocationChange}) {
	const [speciesInput, setSpeciesInput] = useState('');
	const [placesInput, setPlacesInput] = useState('');

	return (
		<div className="item" key={index}>
			<img src={image.src}/>
			<span className={'status status-' + image.status}>{image.status}</span>
			<SpeciesSearch inputValue={speciesInput} handleChange={(value) => handleSpeciesChange(value, index)} handleInputChange={(value) => setSpeciesInput(value)}/>
			<PlacesSearch handleAddressChange={setPlacesInput} address={placesInput} handleLatLngChange={(value) => handleLocationChange(value, index)}/>
		</div>
	)
}

export default UploadableImage;