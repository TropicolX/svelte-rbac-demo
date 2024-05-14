<script>
	import Product from "../lib/Product.svelte";

	import { products } from "../stores";
</script>

<section class="py-12 md:py-20">
	<div class="container mx-auto px-4 md:px-8">
		<h2 class="text-3xl md:text-4xl font-bold mb-8">Featured Products</h2>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
		>
			{#each $products as product (product.id)}
				<Product {...product} />
			{/each}
		</div>
	</div>
</section>
