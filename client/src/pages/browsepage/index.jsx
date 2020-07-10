import React, { useState, useEffect } from 'react';
import PhotoList from '../../components/photo-list/photo-list.component';
import SpeciesSearch from '../../components/species-search';
import { setTitle } from '../../utils/global';
import './styles.scss';

function BrowsePage({location}) {
	const initialState = {
		speciesCode: undefined,
		speciesLabel: undefined,
		value: '',
	}
	const [formState, setState] = useState(initialState);

	useEffect( () => {
		if (location.state && Object.keys(location.state).length > 0) setState({
			...location.state,
			value: location.state.speciesLabel,
		});
	}, [location.state]);

	useEffect(() => {
		setTitle("Browse Images");
	}, []);

	const handleSpeciesChange = ({ code }) => {
		setState({
			...formState,
			speciesCode: code,
		});
	}

	const handleInputChange = (value) => {
		setState({
			...formState,
			value
		});
	}

	const {speciesCode, speciesLabel, value} = formState;
	
	return (
		<div className="container browse-page">
			<div className="filter-menu">
				<SpeciesSearch defaultValue={speciesLabel} inputValue={value} handleInputChange={handleInputChange} handleChange={handleSpeciesChange}/>
			</div>
			<PhotoList speciesCode={speciesCode}/>
		</div>
	);
}

export default BrowsePage;