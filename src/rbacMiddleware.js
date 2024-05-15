import { rolePermissions } from "./rolePermissions";

export function checkRole(user, requiredRole) {
	if (!user) {
		return false;
	}

	return user.role === requiredRole;
}

export function checkPermissions(user, requiredPermissions) {
	if (!user) {
		return false;
	}

	const userPermissions = rolePermissions[user.role];
	return userPermissions?.includes(requiredPermissions);
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
