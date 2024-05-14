<script>
	import Unauthorized from "../../../lib/Unauthorized.svelte";
	import { checkPermissions, checkRole } from "../../../rbacMiddleware";
	import { user, products } from "../../../stores";

	$: isAdmin = checkRole($user, "admin");
	$: canCreateProducts = checkPermissions($user, "create:products");
	$: canDeleteProducts = checkPermissions($user, "delete:products");
	$: canUpdateProducts = checkPermissions($user, "update:products");
</script>

{#if isAdmin}
	<div class="container mx-auto px-4 md:px-8 py-12">
		<div class="flex flex-wrap items-center justify-between mb-8">
			<h2 class="text-3xl md:text-4xl font-bold">Admin Dashboard</h2>
			{#if canCreateProducts}
				<button
					class="mt-4 min-[457px]:mt-0 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800"
				>
					Add new product
				</button>
			{/if}
		</div>
		<div class="bg-white rounded-lg shadow-lg overflow-hidden">
			<div class="relative w-full overflow-auto">
				<table class="w-full caption-bottom text-sm">
					<thead class="[&amp;_tr]:border-b">
						<tr
							class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
						>
							<th
								class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
							>
								Product
							</th>
							<th
								class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
							>
								Price
							</th>
							<th
								class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
							>
								Actions
							</th>
						</tr>
					</thead>
					<tbody class="[&amp;_tr:last-child]:border-0">
						{#each $products as product (product.id)}
							<tr
								class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
							>
								<td
									class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
								>
									<div
										class="flex flex-col sm:flex-row items-center space-x-4"
									>
										<img
											src={product.images[0].replace(
												/[\[\]\\"]/g,
												""
											)}
											alt="Product"
											width="80"
											height="80"
											class="w-20 h-20 object-cover rounded-lg"
											style="aspect-ratio: 80 / 80; object-fit: cover;"
										/>
										<div>
											<h3 class="text-lg font-bold">
												{product.title}
											</h3>
											<p class="text-gray-600">
												{product.description}
											</p>
										</div>
									</div>
								</td>
								<td
									class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
									>${product.price}</td
								>
								<td
									class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
								>
									<div class="flex items-center space-x-2">
										{#if canUpdateProducts}
											<!-- Update button -->
											<button
												class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="h-4 w-4"
												>
													<path
														d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
													></path>
												</svg>
											</button>
										{/if}

										{#if canDeleteProducts}
											<!-- Delete button -->
											<button
												class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="h-4 w-4"
												>
													<path d="M3 6h18"></path>
													<path
														d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
													></path>
													<path
														d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
													></path>
												</svg>
											</button>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{:else}
	<Unauthorized />
{/if}
