import { computed, map } from 'nanostores';

export const $cart = map<Record<number, CartItem>>({});

export function addItemToCart(item: ShopItem) {
	const cartItemt = $cart.get()[item.id];
	const quantity = cartItemt ? cartItemt.quantity : 0;

	$cart.setKey(item.id, {
		item,
		quantity: quantity + 1,
	});
}

export function removeItemFromCart(itemId: number) {
	//@ts-ignore -- we’re deleting the entry, so don’t worry about the type
	$cart.setKey(itemId, undefined);
}

export const subtotal = computed($cart, (entries) => {
	let subtotal = 0;
	Object.values(entries).forEach((entry) => {
		if (!entry) return;

		subtotal += entry.item.price * entry.quantity;
	});
});
