import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoItem from '../photo-item/photo-item.component';
import './photo-list.scss';

function PhotoList({speciesCode, userId, infiniteScroll = true, loadMore = true}) {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [resultsEnd, setResultsEnd] = useState(false);
	const perPage = 3;

	const fetchImages = (offset = 0) => {
		setLoading(true);
		axios.get('images', {
			params: {
				_start: offset,
				_limit: perPage,
			}
		})
		.then(response => {
			if(response.data.length < perPage) {
				setResultsEnd(true);
			} 
			setImages([...images, ...response.data]);
		})
		.catch(error => {
			setError(true);
		})
		.then(() => {
			setLoading(false);
		});
	}

	useEffect(() => {
		if(!infiniteScroll || resultsEnd || loading) return;
		document.addEventListener("scroll", handleOnScroll);
		return () => {
			document.removeEventListener("scroll", handleOnScroll);
		};
	}, [images, resultsEnd, loading]);

	useEffect(() => {
		fetchImages(0);
	}, []);

	const handleLoadMore = () => {
		fetchImages(images.length);
	}

	const handleOnScroll = () => {
		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
		var clientHeight = document.documentElement.clientHeight || window.innerHeight;
		var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
		if (scrolledToBottom) {
			handleLoadMore();
		}
	};

	return (
		<React.Fragment>
			<div className="photo-grid">
				{images.map(image => {
					if(image.file && image.species_code) {
						return <PhotoItem key={image.id} item={image}/>
					}
				})}
			</div>
			{loading ? 'Loading...' : ''}
			{error ? `Error! ${error.message}` : ''}
			{(loadMore && !resultsEnd && !loading && images.length > 0) &&
				<p className="text-center">
					<button className="btn m2" onClick={handleLoadMore}>Load More</button>
				</p>
			}
			
		</React.Fragment>
	)
}

export default PhotoList