import React, { useState, useEffect } from 'react';
import PhotoList from '../../components/photo-list';
import SpeciesSearch from '../../components/species-search';
import { setTitle } from '../../utils/global';
import './styles.scss';

function BrowsePage({location}) {
	const initialState = (location.state && Object.keys(location.state).length > 0) ? {
		...location.state
	} : {
		speciesCode: undefined,
		speciesLabel: undefined,
	}
	
	const [formState, setState] = useState(initialState);
	const [speciesInput, setSpeciesInput] = useState(initialState.speciesLabel);

	useEffect(() => {
		setTitle("Browse Images");
	}, []);

	const handleSpeciesChange = ({ speciesCode }) => {
		setState({...formState, speciesCode});
	}

	const { speciesCode, speciesLabel } = formState;
	
	return (
		<div className="container browse-page">
			<div className="filter-menu">
				<SpeciesSearch defaultValue={speciesLabel} inputValue={speciesInput} handleInputChange={(value) => setSpeciesInput(value)} handleChange={handleSpeciesChange}/>
			</div>
			<PhotoList speciesCode={speciesCode} showLoader={true}/>
		</div>
	);
}

export default BrowsePage;