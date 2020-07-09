const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
	sanitizeEntity(user, {
		model: strapi.query('user', 'users-permissions').model,
});

module.exports = {
	async findOne(ctx) {
		const { id } = ctx.params;
		let data = await strapi.plugins['users-permissions'].services.user.fetch({
			id,
		});

		if (data) {
			data = sanitizeUser(data);
		}

		data.email = '';
		data.username = '';
		data.provider = '';
		data.confirmed = '';
		data.blocked = '';
		data.role = '';

		// Send 200 `ok`
		ctx.send(data);
	},
};