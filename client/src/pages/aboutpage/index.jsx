import React, { useEffect } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { setTitle } from '../../utils/global';
import Error404 from '../error-404';
import ReactMarkdown from 'react-markdown';

const PAGE_QUERY = gql`
{
	about {
		content,
		id
	}
}
`

function AboutPage() {
	useEffect(() => {
		setTitle("About");
	}, []);

	return (
		<div className="container compact single-page about-page">
			<Query query={PAGE_QUERY}>
				{({ loading, error, data }) => {
					if (loading) return "Loading..."
					if (error || ! data.about) return <Error404/>
					if (data.about) {
						return (
							<ReactMarkdown source={data.about.content} />
						);
					}
				}}
			</Query>
		</div>
	);
}

export default AboutPage;