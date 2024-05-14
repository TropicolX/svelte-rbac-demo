import { redirect } from "@sveltejs/kit";

import { getUserData } from "./rbacMiddleware";

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handler = async ({ event, resolve }) => {
	event.locals.user = null;

	// get access token from cookies
	const accessToken = event.cookies.get("access_token");

	const fetchAndHandleUserData = async () => {
		const userData = await fetch(
			"https://api.escuelajs.co/api/v1/auth/profile",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		).then(async (res) => await res.json());

		return getUserData(userData);
	};

	switch (true) {
		case event.url.pathname.startsWith("/login"):
			if (accessToken) {
				throw redirect(303, "/");
			}
			break;
		case event.route.id?.startsWith("/(protected)"):
			if (!accessToken) {
				throw redirect(307, "/login");
			} else {
				try {
					event.locals.user = await fetchAndHandleUserData();
				} catch (error) {
					throw redirect(307, "/login");
				}
			}
			break;
		default:
			if (accessToken) {
				try {
					event.locals.user = await fetchAndHandleUserData();
				} catch (error) {
					console.error(error);
				}
			}
			break;
	}

	const response = await resolve(event);
	return response;
};
