const { sanitizeEntity } = require('strapi-utils');
var crypto = require("crypto-js");

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
			data.avatar = 'https://www.gravatar.com/avatar/' + crypto.MD5(data.email).toString() + '?d=mm&size=120';
			data.email = '';
			data.username = '';
			data.provider = '';
			data.confirmed = '';
			data.blocked = '';
			data.role = '';
		}
		// Send 200 `ok`
		ctx.send(data);
	},
	async me(ctx) {
		const user = ctx.state.user;

		if (!user) {
			return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
		}

		const data = sanitizeUser(user);

		if (data) {
			data.avatar = 'https://www.gravatar.com/avatar/' + crypto.MD5(data.email).toString() + '?d=mm&size=120';
		}

		ctx.send(data);
	},
};