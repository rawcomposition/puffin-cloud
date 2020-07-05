module.exports = {
	definition: `
		type Self {
			id: ID
			username: String
			email: String
			first_name: String
			last_name: String
		}
		`,
		query: `
			self: Self
		`,
		resolver: {
			Query: {
				self: {
					resolver: 'plugins::users-permissions.user.me'
				},
			},
		}
}