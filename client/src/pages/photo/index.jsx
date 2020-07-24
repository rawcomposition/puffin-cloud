import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../providers/user/user.provider';
import { setTitle } from '../../utils/global';
import Error404 from '../error-404';
import Loader from '../../components/loader';
import DownloadButton from '../../components/download-button';
import Map from '../../components/map';
import AuthorInfo from '../../components/author-info';
import FileInfo from '../../components/file-info';
import './styles.scss';

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
	}, [photoId]);

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
				<img src={image.file.url} alt=""/>
				<h2>{image.species.common_name} <span className="text-badge text-italic">{image.species.scientific_name}</span></h2>
			</div>
			<div className="sidebar">
				<DownloadButton photoId={image.id}/>
				<div className="widget">
					<AuthorInfo {...image.user}/>
					<FileInfo {...image.file}/>
				</div>
				<Map lat={image.lat} lng={image.lng}/>
				{image.address}
				<hr/>
				<p>
					<button type="button" className="text-danger btn-text" onClick={() => { if (window.confirm('Are you sure you want to delete this image? It will be gone. Forever.')) handleDelete() } }>Delete Image</button>
				</p>
			</div>
		</div>

	);
}

export default PhotoPage;