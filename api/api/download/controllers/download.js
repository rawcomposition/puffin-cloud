module.exports = {
	index: async ctx => {
		const { photoId } = ctx.params;
		let request = require('request');
		response = await strapi.query('images').findOne({ id: photoId });
		if(response) {
			const {file, user, species_code} = response;
			filename = species_code.common_name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
			filename = filename + file.ext;
			ctx.attachment(filename);
			ctx.body = request(file.url);
		}
	},
};