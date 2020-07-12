import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import './styles.scss';

const SpeciesSearch = ({handleChange, handleInputChange, inputValue = '', hideBorder}) => {

	const initialState = {
		activeIndex: 0,
	}
	
	const [state, setState] = useState(initialState);
	const [open, setOpen] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const { activeIndex } = state;
	const [searchQuery] = useDebounce(inputValue, 300);
	const node = useRef();

	useEffect(() => {
		if(searchQuery.length > 3) {
			getAsyncOptions(searchQuery);
		}
	}, [searchQuery]);

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);
	
	const getAsyncOptions = (searchValue) => {
		const url = process.env.REACT_APP_BASE_URL + '/species-codes?category=species&_limit=15&common_name_contains=' + searchValue;
		return fetch(url)
		.then(response => response.json())
		.then( data => {
			if(data.length > 0) {
				setSuggestions(data);
			}
		})
		.catch(err => {});
	}

	const handleFocus = () => {
		setOpen(true);
	}

	const selectOption = (activeIndex) => {
		const selectedCode = suggestions[activeIndex].species_code;
		const selectedLabel = suggestions[activeIndex].common_name;
		const selectedId = suggestions[activeIndex].id;
		handleInputChange(selectedLabel);
		setOpen(false);
		handleChange({
			speciesCode: selectedCode,
			speciesLabel: selectedLabel,
			speciesId: selectedId,
		});
	}

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			selectOption(activeIndex);
		} else if (e.keyCode === 38) {
			if (activeIndex === 0) {
				return;
			}
			setState({
				...state,
				activeIndex: activeIndex - 1,
			});
		} else if (e.keyCode === 40) {
			if (activeIndex - 1 === suggestions.length) {
				return;
			}
			setState({
				...state,
				activeIndex: activeIndex + 1,
			});
		} else if (e.keyCode === 27) {
			setOpen(false);
		} else {
			setOpen(true);
		}
		if(inputValue.length === 0) {
			setSuggestions([]);
		}
	};

	const handleKeyUp = (e) => {
		if(inputValue.length === 0) {
			setSuggestions([]);
			handleChange({
				speciesCode: undefined,
				speciesLabel: undefined,
				speciesId: undefined,
			});
		}
	};

	const handleClick = e => {
		if (node.current.contains(e.target)) {
			return;
		}
		setOpen(false);
	};

	const handleOptionClick = index => {
		selectOption(index);
	}
	const className = 'species-select' + (hideBorder ? ' no-border' : '');

	return(
		<div className={className} ref={node}>
		<input value={inputValue} onKeyDown={handleKeyDown} onFocus={handleFocus} onKeyUp={handleKeyUp} placeholder="Search for a species..." onChange={(e) => {
			handleInputChange(e.target.value);
		}}/>
			{(suggestions.length > 0 && open) &&
				<ul className="suggestions">
					{suggestions.map((item, index) => {
						let className;
						if (index === activeIndex) {
							className = 'active';
						}
						return <li key={item.id} className={className} onClick={() => handleOptionClick(index)}>{item.common_name}</li>
					})}
				</ul>
			}
		</div>
	)
}
export default SpeciesSearch;