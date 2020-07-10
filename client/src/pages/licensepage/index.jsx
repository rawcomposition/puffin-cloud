import React, { useEffect } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { setTitle } from '../../utils/global';
import Error404 from '../error-404';
import ReactMarkdown from 'react-markdown';

const PAGE_QUERY = gql`
{
	license {
		content,
		id
	}
}
`

function LicensePage() {
	useEffect(() => {
		setTitle("License");
	}, []);

	return (
		<div className="container compact single-page license-page">
			<Query query={PAGE_QUERY}>
				{({ loading, error, data }) => {
					if (loading) return "Loading..."
					if (error || ! data.license) return <Error404/>
					if (data.license) {
						return (
							<ReactMarkdown source={data.license.content} />
						);
					}
				}}
			</Query>
		</div>
	);
}

export default LicensePage;