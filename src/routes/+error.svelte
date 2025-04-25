<script lang="ts">
	import { page } from '$app/state';
	import './error.scss';

	let message = $derived(page.error?.message ?? 'Unknown error.');
	let status = $derived(page.status);
</script>

<div class="error-container">
	<div class="card">
		<div class="error-status">{status}</div>
		<div class="divider"></div>
		<h2 class="error-title">Oops! Something went wrong</h2>
		<p class="error-message">{message}</p>
		<div class="error-actions">
			<button on:click={() => (window.location.href = '/')} class="button primary"
				>Return Home</button
			>
			<button on:click={() => location.reload()} class="button secondary">Try Again</button>
		</div>
	</div>
</div>
