const AccessControl = require('accesscontrol');

const ac = new AccessControl();

const roleIds = {
	ADMIN: '1',
	STUDENT: '2',
};

const resources = {
	USERINFO: 'user',
	ROLE: 'role',
	PROJECT: 'project',
	REVIEW: 'review',
};

const grantsObject = {
	[roleIds.ADMIN]: {
		[resources.USERINFO]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.ROLE]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.PROJECT]: {
			'read:any': ['*'],
			'update:any': ['*'],
		},
		[resources.REVIEW]: {
			'create:any': ['*'],
			'read:any': ['*'],
		},
	},
	[roleIds.STUDENT]: {
		[resources.PROJECT]: {
			'create:own': ['*'],
			'read:own': ['*'],
		},
	},
};

const roles = (function () {
	ac.setGrants(grantsObject);
	return ac;
})();

module.exports = {
	roles,
	resources,
};
