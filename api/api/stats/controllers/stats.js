module.exports = {
	index: async ctx => {

		const species = await strapi
			.query('images')
			.model.query(qb => {
				qb.join('species_codes', 'images.species_code', '=', 'species_codes.id');
				qb.countDistinct('species_codes.species_code as species_count');
			})
			.fetch();
		
		users = await strapi.query('user', 'users-permissions').count();

		const species_count = species.toJSON().species_count;
		result = {
			species_count: species_count,
			species_percent: (species_count / 10721 * 100).toFixed(1) + '%',
			user_count: users,
		}
		return result;
	},
};