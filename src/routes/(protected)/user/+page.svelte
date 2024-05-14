<script>
	import Unauthorized from "../../../lib/Unauthorized.svelte";
	import {
		checkPermissions,
		checkRoleAndPermissions,
	} from "../../../rbacMiddleware";
	import { user } from "../../../stores";

	$: isCustomerAndCanViewProfile = checkRoleAndPermissions(
		$user,
		"customer",
		"read:profile"
	);
	$: canEditProfile = checkPermissions($user, "update:profile");

	let name = $user.name;
	let email = $user.email;
</script>

{#if isCustomerAndCanViewProfile}
	<div class="h-[calc(100svh-64px)] w-full flex items-center justify-center">
		<div
			class="rounded-lg border bg-card text-card-foreground shadow-sm w-[28rem] max-w-md"
		>
			<div class="flex flex-col space-y-1.5 p-6">
				<h3
					class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight"
				>
					Profile
				</h3>
				<p class="text-sm text-muted-foreground">
					Update your profile information.
				</p>
			</div>
			<div class="p-6 space-y-4">
				<div class="space-y-2">
					<label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						for="name"
					>
						Name
					</label>
					<input
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						id="name"
						placeholder="Enter your name"
						bind:value={name}
						disabled={!canEditProfile}
					/>
				</div>
				<div class="space-y-2">
					<label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						for="email"
					>
						Email
					</label>
					<input
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						id="email"
						placeholder="Enter your email"
						type="email"
						bind:value={email}
						disabled={!canEditProfile}
					/>
				</div>
				<div class="space-y-2">
					<label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						for="password"
					>
						Old password
					</label>
					<input
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						id="password"
						placeholder="Enter your old password"
						type="password"
						disabled={!canEditProfile}
					/>
				</div>
				<div class="space-y-2">
					<label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						for="password"
					>
						New password
					</label>
					<input
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						id="password"
						placeholder="Enter your new password"
						type="password"
						disabled={!canEditProfile}
					/>
				</div>
			</div>
			<div class="flex items-center p-6">
				<button
					class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-white hover:bg-gray-900 h-10 px-4 py-2 ml-auto"
					disabled={!canEditProfile}
				>
					Save
				</button>
			</div>
		</div>
	</div>
{:else}
	<Unauthorized />
{/if}
