import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';

function ImageDropzone({handleImageAdd, handleSetTotalFiles}) {
	const onDrop = useCallback((acceptedFiles) => {
		handleSetTotalFiles(acceptedFiles.length);
		acceptedFiles.forEach((file) => {
			if (!file.type.match('image')) return;

				handleImageAdd({
					src: URL.createObjectURL(file),
					file: file,
					status: 'waiting',
				});
		});
	}, []);

	const {getRootProps, getInputProps} = useDropzone({
		onDrop,
		accept: '.jpg, .jpeg',
	});

	return (
		<div {...getRootProps({className: 'dropzone'})}>
			<input {...getInputProps()} />
			<span>Drag 'n' drop some images here, or click to select images</span>
		</div>
	)
}

export default ImageDropzone;