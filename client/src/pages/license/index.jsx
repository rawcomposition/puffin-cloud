import React, { useEffect, useState } from 'react';
import { setTitle } from '../../utils/global';
import Error404 from '../error-404';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Loader from '../../components/loader';

function LicensePage() {
	const [content, setContent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		setTitle("License");
		axios.get('license')
		.then(response => {
			setContent(response.data.content);
		})
		.catch(error => {
			setError(true);
		})
		.then(() => {
			setLoading(false);
		})
	}, []);

	if (loading) return <Loader/>
	if (error || !content) return <Error404/>;
	return (
		<div className="container compact single-page license-page">
			<ReactMarkdown source={content} />
		</div>
	);
}

export default LicensePage;