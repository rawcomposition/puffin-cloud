import React, { useState, useEffect } from 'react';
import PhotoList from '../../components/photo-list/photo-list.component';
import SpeciesSearch from '../../components/species-search';
import { setTitle } from '../../utils/global';
import './styles.scss';

function BrowsePage({location}) {
	const initialState = {
		speciesCode: undefined,
		speciesLabel: undefined,
	}
	const [formState, setState] = useState(initialState);
	const [speciesInput, setSpeciesInput] = useState('');

	useEffect( () => {
		if (location.state && Object.keys(location.state).length > 0) {
			setState({...location.state});
			setSpeciesInput(location.state.speciesLabel);
		};
	}, [location.state]);

	useEffect(() => {
		setTitle("Browse Images");
	}, []);

	const handleSpeciesChange = ({ speciesCode }) => {
		setState({
			...formState,
			speciesCode
		});
	}

	const {speciesCode, speciesLabel, value} = formState;
	
	return (
		<div className="container browse-page">
			<div className="filter-menu">
				<SpeciesSearch defaultValue={speciesLabel} inputValue={speciesInput} handleInputChange={(value) => setSpeciesInput(value)} handleChange={handleSpeciesChange}/>
			</div>
			<PhotoList speciesCode={speciesCode}/>
		</div>
	);
}

export default BrowsePage;