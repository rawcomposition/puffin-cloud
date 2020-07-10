import React, {useCallback, useState, useEffect} from 'react';
import ImageDropzone from '../../components/image-dropzone';
import UploadStatus from '../../components/upload-status';
import UploadableImage from '../../components/uploadable-image';
import { getJWT } from '../../utils/user';
import './styles.scss';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { setTitle } from '../../utils/global';

const UPLOAD_MUTATION = gql`
	mutation Upload($file: Upload!) {
		upload(file: $file) {
			id,
		}
	}
`;

function UploadPage() {
	const [images, setImages] = useState([]);
	const [totalFiles, setTotalFiles] = useState(0);
	const [uploadStarted, setUploadStarted] = useState(false);
	const [remainingUploads, setRemainingUploads] = useState(null);
	const [uploadImage] = useMutation(UPLOAD_MUTATION);

	//Todo: images is stale (and empty) when this runs :(
	//useEffect(() => {
	//	return () => {
	//		for (const image of images) {
	//			URL.revokeObjectURL(image.src);
	//		}
	//	}
	//}, []);

	const handleDropzoneImageAdd = (imageObject) => {
		setImages(images => ([...images, imageObject]));
	}

	const handleSetTotalFiles = (total) => {
		setTotalFiles(total);
	}

	useEffect(() => {
		setTitle("Upload Images");
	}, []);

	useEffect(() => {
		if(totalFiles === images.length && ! uploadStarted) {
			handleUpload();
		}
	}, [images]);

	const handleSpeciesChange = ({speciesCode, speciesId}, targetIndex) => {
		console.log(speciesId);
		let imagesCopy = [...images];
		imagesCopy[targetIndex] = {
			...imagesCopy[targetIndex],
			code: speciesCode,
			species_id: speciesId,
		}
		setImages(imagesCopy);
	}

	const updateImageStatus = (status, targetIndex) => {		
		setImages(images => {
			let imagesCopy = [...images];
			imagesCopy[targetIndex] = {
				...imagesCopy[targetIndex],
				status: status,
			}
			return imagesCopy;
		});
	};

	const handleUpload = async () => {
		const totalImages = images.length;
		if(totalImages > 0) {
			setUploadStarted(true);
			setRemainingUploads(totalImages);
		}
		for (const [index, value] of images.entries()) {
			updateImageStatus('loading', index);
			await uploadImage({
				variables: {
					file: value.file
				}
			}).then(response => {
				setImages(images => {
					let imagesCopy = [...images];
					imagesCopy[index] = {
						...imagesCopy[index],
						file_id: response.data.upload.id,
					}
					return imagesCopy;
				});
				updateImageStatus('uploaded', index);
				setRemainingUploads(value => (value > 1 ? value - 1 : 0));
			});
		}
	};

	const handleSubmit = () => {
		let error = false;
		const data = images.map(image => {
			if(!image.species_id || !image.file_id) {
				error = true;
			}
			return {
				species_code_id: image.species_id,
				file_id: image.file_id
			}
		});
		if(error) {
			alert("Please choose a species and location for each image");
			return false;
		}
		const jwt = getJWT();
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authorization': jwt ? 'Bearer ' + jwt : '',
				
			},
			body: JSON.stringify(data),
		};
		fetch('http://localhost:1337/bulkimages', requestOptions)
			.then(response => response.json())
			.then(data => {
				alert("success");
			});
	}

	return (
		<div className="upload-page">
			<div className="sidebar">
				<button type="button" className={ 'btn primary' + (remainingUploads !== 0 ? ' disabled' : '')} onClick={handleSubmit}>Submit Images</button>
				<UploadStatus uploadStarted={uploadStarted} remainingUploads={remainingUploads}/>
			</div>
			<div className="upload-items">
				{!images.length &&
					<ImageDropzone handleImageAdd={handleDropzoneImageAdd} handleSetTotalFiles={handleSetTotalFiles}/>
				}
				{images.map((image, index) => (
					<UploadableImage key={index} image={image} index={index} handleSpeciesChange={handleSpeciesChange}/>
				))}
			</div>
		</div>
	);
}

export default UploadPage;