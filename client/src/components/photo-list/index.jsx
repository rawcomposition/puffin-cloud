import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PhotoItem from '../photo-item';
import Loader from '../loader';
import './styles.scss';

function PhotoList({speciesCode, userId, infiniteScroll = true, loadMore = true, showLoader = false, perPage = 6}) {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [resultsEnd, setResultsEnd] = useState(false);

	const fetchImages = useCallback((offset = 0) => {
		setLoading(true);
		axios.get('images', {
			params: {
				'user.id': userId,
				'species_code.species_code': speciesCode,
				_start: offset,
				_limit: perPage,
				_sort: 'created_at:DESC'
			}
		})
		.then(response => {
			if(response.data.length < perPage) {
				setResultsEnd(true);
			} 
			setImages(images => ([...images, ...response.data]));
		})
		.catch(error => {
			setError(true);
		})
		.then(() => {
			setLoading(false);
		});
	}, [perPage, speciesCode, userId]);

	const handleLoadMore = useCallback(() => {
		fetchImages(images.length);
	}, [fetchImages, images.length]);

	const handleOnScroll = useCallback(() => {
		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
		var clientHeight = document.documentElement.clientHeight || window.innerHeight;
		var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
		if (scrolledToBottom) {
			handleLoadMore();
		}
	}, [handleLoadMore]);

	useEffect(() => {
		if(!infiniteScroll || resultsEnd || loading) return;
		document.addEventListener("scroll", handleOnScroll);
		return () => {
			document.removeEventListener("scroll", handleOnScroll);
		};
	}, [images, resultsEnd, loading, infiniteScroll, fetchImages, handleOnScroll]);

	useEffect(() => {
		setImages([]);
		setResultsEnd(false);
		fetchImages(0);
	}, [speciesCode, fetchImages]);

	return (
		<React.Fragment>
			<div className="photo-grid">
				{images.map(image => {
					if(image.file && image.species) {
						return <PhotoItem key={image.id} item={image}/>
					}
					return '';
				})}
			</div>
			{loading && showLoader ? <Loader/> : ''}
			{loading && !showLoader ? 'Loading...' : ''}
			{error ? 'Error loading images' : ''}
			{(loadMore && !resultsEnd && !loading && images.length > 0) &&
				<p className="text-center">
					<button className="btn m2" onClick={handleLoadMore}>Load More</button>
				</p>
			}
			
		</React.Fragment>
	)
}

export default PhotoList