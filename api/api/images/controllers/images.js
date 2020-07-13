'use strict';
var crypto = require("crypto-js");
const { sanitizeEntity } = require('strapi-utils');

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

	findOne: async ctx => {
		const { id } = ctx.params;
		const imageData = await strapi.services.images.findOne({ id });
		const image = sanitizeEntity(imageData, { model: strapi.models.images });
		return {
			id: image.id,
			species: {
				common_name: image.species_code.common_name,
			},
			file: {
				url: image.file.formats.large.url,
				size: image.file.size,
				width: image.file.width,
				height: image.file.height,
			},
			user: {
				first_name: image.user.first_name,
				last_name: image.user.last_name,
				avatar_url: 'https://www.gravatar.com/avatar/' + crypto.MD5(image.user.email).toString() + '?d=mm&size=120',
				id: image.user.id
			}
		}
	},

	async find(ctx) {
		let imagesResponse;
		if (ctx.query._q) {
			imagesResponse = await strapi.services.images.search(ctx.query);
		} else {
			imagesResponse = await strapi.services.images.find(ctx.query);
		}
	
		const images = imagesResponse.map(image => sanitizeEntity(image, { model: strapi.models.images }));

		return images.filter(image => (!!image.species_code && !!image.file)).map(image => {
			return {
				id: image.id,
				species: {
					common_name: image.species_code.common_name,
				},
				file: {
					url: image.file.formats.medium.url,
				},
			} 
		})
	  },
};
