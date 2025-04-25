<script>
	import Header from '$comp/header/header.svelte';
	import '../app.css';

	const botName = 'ModGuard';

	const navLinks = [
		{ name: 'Home', url: '#' },
		{ name: 'Features', url: '#features' },
		{ name: 'Commands', url: '#commands' },
		{ name: 'Documentation', url: '#docs' },
		{ name: 'Support', url: '#support' }
	];
</script>

<div class="app">
	<Header />
</div>
