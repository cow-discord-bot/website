<script>
	import { initThemeContext } from '$lib/stores/themes.svelte';
	import Header from '$comp/Header/Header.svelte';
	import ThemeWatcher from '$comp/ThemeWatcher.svelte';
	import '../app.scss';

	let { children } = $props();

	initThemeContext();
</script>

<ThemeWatcher />

<div class="app">
	<main>
		{@render children()}
	</main>

	<Header />
</div>
