module.exports = ({ env }) => ({
	upload: {
	  provider: 'aws-s3',
	  providerOptions: {
		accessKeyId: env('AWS_ACCESS_KEY_ID'),
		secretAccessKey: env('AWS_ACCESS_SECRET'),
		region: 'us-east-2',
		params: {
		  Bucket: 'puffin-cloud',
		},
	  },
	},
	email: {
		provider: 'sendgrid',
		providerOptions: {
			apiKey: env('SENDGRID_API_KEY'),
		},
		settings: {
			defaultFrom: 'info@puffincloud.org',
			defaultReplyTo: 'info@puffincloud.org',
		},
	},
  });
