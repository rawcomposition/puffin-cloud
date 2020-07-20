import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../providers/user/user.provider';
import './styles.scss';
import Avatar from '../../components/avatar';
import { setTitle } from '../../utils/global';
import Error404 from '../error-404';
import Loader from '../../components/loader';

function PhotoPage({match: {params: {photoId}}}) {
	const history = useHistory();
	const { currentUser } = useContext(UserContext);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios.get('images/' + photoId)
		.then(response => {
			const image = response.data;
			setImage(image);
			setTitle(image.species.common_name);
		})
		.catch(error => {
			setError(true);
		})
		.then(() => {
			setLoading(false);
		});
	}, []);

	const handleDelete = (event) => {
		axios.delete('images/' + photoId)
		.then(response => {
			history.push('/profile/' + currentUser.id);
		})
		.catch(error => {
			alert("Error deleting image");
		});
	}

	if (loading) return <Loader/>;
	if (error || !image) return <Error404/>;
	
	return (
		<div className="container photo-page">
			<div className="photo-container">
				<img src={image.file.url}/>
				<h2>{image.species.common_name} <span className="text-badge text-italic">{image.species.scientific_name}</span></h2>
			</div>
			<div className="sidebar">
				<a className="download-button" href={process.env.REACT_APP_BASE_URL + '/download/' + image.id}>
					<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="icon"><path fill="currentColor" d="M543.7 200.1C539.7 142.1 491.4 96 432 96c-7.6 0-15.1.8-22.4 2.3C377.7 58.3 328.1 32 272 32c-84.6 0-155.5 59.7-172.3 139.8C39.9 196.1 0 254.4 0 320c0 88.4 71.6 160 160 160h336c79.5 0 144-64.5 144-144 0-61.8-39.2-115.8-96.3-135.9zM496 432H160c-61.9 0-112-50.1-112-112 0-56.4 41.7-103.1 96-110.9V208c0-70.7 57.3-128 128-128 53.5 0 99.3 32.8 118.4 79.4 11.2-9.6 25.7-15.4 41.6-15.4 35.3 0 64 28.7 64 64 0 11.8-3.2 22.9-8.8 32.4 2.9-.3 5.9-.4 8.8-.4 53 0 96 43 96 96s-43 96-96 96zM387 256h-67v-84c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5z"></path></svg>
					Download
				</a>
				<div className="widget">
					<Link className="author-info" to={'/profile/' + image.user.id}>
						<div className="name">
							<span className="text-muted text-small">Photographer</span><br/>
							<strong>{image.user.first_name} {image.user.last_name}</strong>
						</div>
						<Avatar url={image.user.avatar_url}/>
					</Link>
					<div className="technical">
						<b>License: </b>Creative Commons Zero<br/>
						<b>File size: </b>{(parseInt(image.file.size)/1000).toFixed(1)+' mb'}<br/>
						<b>Dimensions: </b>{image.file.width + 'x' + image.file.height+' px'}
					</div>
				</div>

				<img className="map" src={`https://maps.googleapis.com/maps/api/staticmap?zoom=5&scale=2&size=400x200&maptype=roadmap&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&format=jpg&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:S%7C${image.lat}%2C${image.lng}`}/>
				{image.address}
				<hr/>
				<p>
					<button type="button" class="text-danger btn-text" onClick={() => { if (window.confirm('Are you sure you want to delete this image? It will be gone. Forever.')) handleDelete() } }>Delete Image</button>
				</p>
			</div>
		</div>

	);
}

export default PhotoPage;