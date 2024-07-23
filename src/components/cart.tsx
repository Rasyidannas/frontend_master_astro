import { useStore } from '@nanostores/solid';
import { $cart as cart, removeItemFromCart, subtotal } from '../stores/cart';
import styles from './cart.module.css';
import { Show, createSignal } from 'solid-js';

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-US', {
		currency: 'USD',
		style: 'currency',
	}).format(amount);
}

const EmptyState = () => {
	return (
		<>
			<p class={styles.icon}>
				<span role="img" aria-label="hot dog">
					🌭
				</span>
			</p>
			<p class={styles.empty}>
				Your cart is empty! Add a sandwich kit or two and give flavor to chance.
			</p>
		</>
	);
};

const CheckoutNotice = () => {
	return <p class={styles.notice}>Checkout is not implemented yet.</p>;
};

export const Cart = () => {
	const [showNotice, setShowNotice] = createSignal(false);
	const $subtotal = useStore(subtotal);
	const $cart = useStore(cart);

	return (
		<aside class={styles.cart}>
			<h2>Your Cart</h2>
			<Show when={Object.values($cart()).length > 0} fallback={<EmptyState />}>
				<ul class={styles.items}>
					{Object.values($cart()).map((entry: CartItem) => {
						if (!entry.item) return null;

						return (
							<li class={styles.item}>
								<span style={styles.quantity}>{entry.quantity}</span>
								<span style={styles.name}>{entry.item.title}</span>
								<span class={styles.remove}>
									<button
										title="remove item"
										onClick={() => removeItemFromCart(entry.item.id)}
									>
										&times;
									</button>
								</span>
								<span style={styles.price}>{entry.item.price}</span>
							</li>
						);
					})}
				</ul>

				<div class={styles.detail}>
					<p class={styles.subtotal}>
						<span class={styles.label}>Subtotal:</span>{' '}
						{formatCurrency($subtotal())}
					</p>

					<p class={styles.shipping}>
						<span class={styles.label}>Shipping:</span>[' ']
						<del>$10.00</del>
						<ins>FREE</ins>
					</p>

					<p class={styles.subtotal}>
						<span class={styles.label}>Total:</span>[' ']
						{formatCurrency($subtotal())}
					</p>

					<p class={styles.checkout}>
						<button class="big-link" onClick={() => setShowNotice(true)}>
							Check Out
						</button>
					</p>

					<Show when={showNotice()}>
						<CheckoutNotice />
					</Show>
				</div>
			</Show>
		</aside>
	);
};
