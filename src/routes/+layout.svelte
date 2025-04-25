<script>
	import Header from '$comp/header/header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<main>
		{@render children()}
	</main>

	<Header />
</div>
