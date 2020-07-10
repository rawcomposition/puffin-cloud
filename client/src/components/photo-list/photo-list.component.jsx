import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import PhotoItem from '../photo-item/photo-item.component';
import './photo-list.scss';

const PHOTOS_QUERY = gql`
	query Images($speciesCode: String, $userId: String, $commonName: String, $limit: Int!, $start: Int!){
		images(limit: $limit, start: $start, where: {
			species_code: {
				species_code: $speciesCode,
				common_name_contains: $commonName
			},
			user: {
				id: $userId
			}
		}){
			species_code  {
				common_name,
				species_code,
				id
			},
			user {
				username,
				id
			},
			file {
				url,
				id
			},
			created_at,
			id,
		}
	}
`;

function PhotoList({speciesCode, userId, infiniteScroll = true, loadMore = true}) {
	const [resultsEnd, setResultsEnd] = useState(false);
	const { data = [], fetchMore, loading, error } = useQuery(
		PHOTOS_QUERY,
		{
			variables: {
				speciesCode,
				userId,
				limit: 6,
				start: 0
			},
			fetchPolicy: "cache-and-network"
		}
	);

	useEffect(() => {
		if(!infiniteScroll || resultsEnd) return;
		document.addEventListener("scroll", handleOnScroll);
		return () => {
			document.removeEventListener("scroll", handleOnScroll);
		};
	}, [data.images, resultsEnd]);
	
	const handleLoadMore = () => {
		fetchMore({
			variables: {
				start: data.images.length
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				if (fetchMoreResult.images.length < 1) {
					setResultsEnd(true);
					return;
				}
				return Object.assign({}, prev, {
					images: [...prev.images, ...fetchMoreResult.images]
				});
			}
		});
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

	const images = data.images || [];

	return (
		<React.Fragment>
			<div className="photo-grid">
				{images.map(image => {
					if(image.file) {
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