import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SpeciesSearch from '../species-search';
import './styles.scss';

function HomeBanner() {
	const history = useHistory();
	const initialState = {
		speciesLabel: '',
		speciesCode: '',
		value: '',
	}

	const [formState, setFormState] = useState(initialState);
	const { value } = formState;

	const handleSpeciesChange = response => {
		const {speciesLabel, speciesCode } = response;
		setFormState({
			...formState,
			speciesLabel,
			speciesCode
		});
		history.push('/browse', {
			speciesLabel,
			speciesCode,
		});
	}

	const handleInputChange = (value) => {
		setFormState({
			...formState,
			value
		});
	}

	return (
		<div className="container">
			<div className="row">
				<div className="">
					<div className="header-content">
						<h1 className="">Freely-usable bird images</h1>
						<span className="sub-heading">Licensed under creative commons for any use</span>
						<div className="search-combo">
							<SpeciesSearch handleChange={handleSpeciesChange} handleInputChange={handleInputChange} inputValue={value} hideBorder={true}/>
							<button className="btn primary search">Search</button>
						</div>
					</div>
				</div>
				<div className=""></div>
			</div>
		</div>
	)
}

export default HomeBanner;