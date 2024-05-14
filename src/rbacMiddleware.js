export function checkRole(user, requiredRoles) {
	if (!user?.role) {
		return false;
	}

	return requiredRoles.includes(user.role);
}

export function checkPermissions(user, requiredPermissions) {
	if (!user?.permissions) {
		return false;
	}

	if (Array.isArray(requiredPermissions)) {
		return requiredPermissions.every((requiredPermission) => {
			return user.permissions?.includes(requiredPermission);
		});
	}

	return user.permissions?.includes(requiredPermissions);
}

export function checkRoleAndPermissions(
	user,
	requiredRole,
	requiredPermissions
) {
	return (
		checkRole(user, requiredRole) &&
		checkPermissions(user, requiredPermissions)
	);
}

export function getUserData(userData) {
	const adminPermissions = [
		"delete:products",
		"update:products",
		"create:products",
	];

	const customerPermissions = ["update:profile", "read:profile"];

	return {
		...userData,
		permissions:
			userData.role === "admin" ? adminPermissions : customerPermissions,
	};
}
