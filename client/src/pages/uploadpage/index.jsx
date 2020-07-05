import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import './styles.scss';
import SpeciesSearch from '../../components/species-search';

function UploadPage() {
	const [images, setImages] = useState([]);

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.forEach((file) => {
			if (!file.type.match('image')) return;
			const reader = new FileReader()

			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.onload = (e) => {
				setImages([...images, {
					src: reader.result,
				}]);
			}
			reader.readAsDataURL(file);
		})

	}, [])

	const handleSpeciesInputChange = (value, targetIndex) => {
		console.log(value, targetIndex);
		let imagesCopy = [...images];
		imagesCopy[targetIndex] = {
			...imagesCopy[targetIndex],
			speciesInput: value,
		}
		setImages(imagesCopy);
	}

	const handleSpeciesChange = ({speciesCode, speciesLabel}, targetIndex) => {
		let imagesCopy = [...images];
		imagesCopy[targetIndex] = {
			...imagesCopy[targetIndex],
			code: speciesCode,
			speciesInput: speciesLabel,
		}
		setImages(imagesCopy);
	}

	const {getRootProps, getInputProps} = useDropzone({onDrop});
	  
	return (
		<div className="alt-bg">
			<div className="container upload-page p2">
				<div {...getRootProps({className: 'dropzone'})}>
					<input {...getInputProps()} />
					<span>Drag 'n' drop some images here, or click to select images</span>
				</div>
				<div className="upload-items mt-4">
					{images.map((image, index) => (
						<div className="item" key={index}>
							<img src={image.src}/>
							<SpeciesSearch inputValue={image.speciesInput} handleChange={(value) => handleSpeciesChange(value, index)} handleInputChange={(value) => handleSpeciesInputChange(value, index)}/>
							<input type="text" placeholder="Location..."/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default UploadPage;