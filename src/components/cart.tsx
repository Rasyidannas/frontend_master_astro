import { useStore } from '@nanostores/solid';
import { $cart, removeItemFromCart, subtotal } from '../stores/cart';
import styles from './cart.module.css';
import { Show, createSignal } from 'solid-js';
