import React, { useState } from 'react';
import './styles.scss';
import AsyncSelect from 'react-select/async';
import debounce from 'debounce-promise';

const SpeciesSearchOld = ({handleChange, value, label, hideBorder}) => {

	const customStyles = {
		control: (provided, state) => (
			hideBorder ?{
			display: "flex",
			cursor: 'text',
		} : {
			cursor: 'text',
			borderRadius: '4px',
			display: 'flex',
			border: 'solid 1px hsl(0,0%,80%)',
		}),
		indicatorSeparator: (provided, state) => ({
			display: "none",
		}),
		svg: (provided, state) => ({
			display: "none",
		}),
		menu: (provided, state) => ({
			...provided,
			display: state.options.length ? 'block' : 'none',
		}),
		option: (provided, state) => ({
			...provided,
			cursor: 'pointer',
		})
	}

	const [inputValue, setInputValue] = useState('');

	const wait = 300;
	const loadOptions = searchValue => getAsyncOptions(searchValue);
	const debouncedLoadOptions = debounce(loadOptions, wait);
	
	
	//TODO: https://github.com/JedWatson/react-select/issues/3189#issuecomment-442792535
	const getAsyncOptions = (searchValue) => {
		//https://github.com/JedWatson/react-select/issues/3075#issuecomment-450194917
		const url = 'http://localhost:1337/species-codes?category=species&common_name_contains=' + searchValue;
		return fetch(url)
		.then(response => response.json())
		.then( data => {
			return new Promise((resolve, reject) => {
				resolve(data.map( item => {
	  			  return {
	  				  label: item.common_name,
	  				  value: item.species_code,
	  			  }
	  		  }));
			});
		})
		.catch(err => {
			alert('Error searching for species');
		});
	}

	const handleSelect = (value) => {
		handleChange(value);
		setInputValue('');
		
	}

	const handleInputChange = (query, { action }) => {
		if (action === 'input-change') {
			setInputValue(query);
			return query;
		}
		return inputValue;
	};
	
	const selected_option = {
		value,
		label
	}

	return(
		<AsyncSelect loadOptions={searchValue => debouncedLoadOptions(searchValue)} inputValue={inputValue} onInputChange={handleInputChange} onChange={handleSelect} styles={customStyles} placeholder='Search for a species...' className='species-select' value={value ? selected_option : 'undefined'} />
	)
}
export default SpeciesSearchOld;