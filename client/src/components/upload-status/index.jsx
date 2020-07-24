import React from 'react';

function UploadStatus({remainingUploads}) {
	return (
		<div className="upload-status">
			{remainingUploads > 0 &&
				<span>Uploads remaining: {remainingUploads}</span>
			}
			{remainingUploads === 0 &&
				<span>Uploading complete</span>
			}
		</div>
	)
}

export default UploadStatus;