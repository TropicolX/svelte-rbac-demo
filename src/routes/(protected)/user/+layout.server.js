import { redirect } from "@sveltejs/kit";

import { checkRoleAndPermissions } from "../../../rbacMiddleware";
import { PERMISSIONS, ROLES } from "../../../constants";

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
	const user = locals.user;
	const isCustomerAndCanViewProfile = checkRoleAndPermissions(
		user,
		ROLES.CUSTOMER,
		PERMISSIONS.READ_PROFILE
	);

	if (!isCustomerAndCanViewProfile) {
		redirect(307, "/unauthorized");
	}
}
