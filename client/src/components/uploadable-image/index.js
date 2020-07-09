import React, { useState } from 'react';
import SpeciesSearch from '../../components/species-search';

function UploadableImage({image, index, handleSpeciesChange}) {
	const [speciesInput, setSpeciesInput] = useState('');

	return (
		<div className="item" key={index}>
			<img src={image.src}/>
			<span className={'status status-' + image.status}>{image.status}</span>
			<SpeciesSearch inputValue={speciesInput} handleChange={(value) => handleSpeciesChange(value, index)} handleInputChange={(value) => setSpeciesInput(value)}/>
			<input type="text" placeholder="Location..."/>
		</div>
	)
}

export default UploadableImage;