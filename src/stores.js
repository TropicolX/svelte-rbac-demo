import { writable } from "svelte/store";

export const user = writable(null);
export const products = writable([]);
export const cart = writable([]);
