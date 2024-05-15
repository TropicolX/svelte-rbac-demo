/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	return { user: locals.user };
}
