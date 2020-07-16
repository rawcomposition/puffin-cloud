'use strict';
var crypto = require("crypto-js");
/**
 * Lifecycle callbacks for the `User` model.
 */

module.exports = {
	lifecycles: {
		beforeUpdate: async (params, data) => {
			data.avatar = 'https://www.gravatar.com/avatar/' + crypto.MD5(data.email).toString() + '?d=mm&size=120';
		},
		beforeCreate: async (data) => {
			data.avatar = 'https://www.gravatar.com/avatar/' + crypto.MD5(data.email).toString() + '?d=mm&size=120';
		}
	}
};