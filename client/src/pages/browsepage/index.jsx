import React, { useState, useEffect } from 'react';
import PhotoList from '../../components/photo-list/photo-list.component';
import SpeciesSearch from '../../components/species-search';
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
				<button className="btn-text sort">
					Sort <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
				</button>
			</div>
			<PhotoList speciesCode={speciesCode}/>
		</div>
	);
}

export default BrowsePage;