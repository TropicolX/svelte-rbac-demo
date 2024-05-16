<script>
	import { cart } from "../../stores";

	export let title;
	export let price;
	export let description = "";
	export let images;
	export let id;

	const image = images[0].replace(/[\[\]\\"]/g, "");

	const addToCart = () => {
		$cart = [...$cart, id];
	};

	const removeFromCart = () => {
		$cart = $cart.filter((productId) => productId !== id);
	};

	$: productInCart = $cart.includes(id);
</script>

<div class="bg-white rounded-lg shadow-lg overflow-hidden h-[388px]">
	<img
		src={image}
		alt="Product"
		width="400"
		height="300"
		class="w-full h-48 object-cover"
		style="aspect-ratio: 400 / 300; object-fit: cover;"
	/>
	<div class="p-4 h-[calc(100%-192px)] flex flex-col justify-between">
		<div>
			<h3 class="text-lg font-bold mb-2 h-[56px]">{title}</h3>
			<p class="text-gray-600 mb-4 line-clamp-2">
				{description}
			</p>
		</div>
		<div class="flex items-center justify-between">
			<span class="text-gray-900 font-bold">${price}</span>
			<button
				class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 bg-gray-900 text-white hover:bg-gray-800"
				on:click={() =>
					productInCart ? removeFromCart() : addToCart()}
			>
				{productInCart ? "Remove from cart" : "Add to cart"}
			</button>
		</div>
	</div>
</div>
