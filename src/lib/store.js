import { writable } from 'svelte/store'

// Get the value out of storage on load.
const stored = localStorage.user
// or localStorage.getItem('content')

// Set the stored value or a sane default.
export const user = writable(stored == "null" ? null : stored)

// Anytime the store changes, update the local storage value.
user.subscribe((value) => localStorage.user = value)
// or localStorage.setItem('content', value)