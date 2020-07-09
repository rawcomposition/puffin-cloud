'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	bulkcreate: async ctx => {
		const images = ctx.request.body;
		for(const image of images) {
			await strapi.services.images.create({
				user: ctx.state.user.id,
				file: image.file_id,
				species_code: image.species_code_id,
			});
		}
		return {};
	},
};
