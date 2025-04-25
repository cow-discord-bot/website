<script lang="ts">
	import Icon from '@iconify/svelte';
	import { PUBLIC_BOT_NAME, PUBLIC_GUILD_INVITE, PUBLIC_BOT_INVITE } from '$env/static/public';
	import './style.scss';

	const navLinks = [
		{ name: 'Home', url: '/' },
		{ name: 'Features', url: 'features' },
		{ name: 'Commands', url: 'commands' },
		{ name: 'Documentation', url: 'docs' },
		{ name: 'Support', url: PUBLIC_GUILD_INVITE },
		{ name: 'Invite', url: PUBLIC_BOT_INVITE }
	];
</script>

<header>
	<div class="container">
		<div class="logo">
			<span class="bot-icon">🤖</span>
			<h2>{PUBLIC_BOT_NAME}</h2>
		</div>

		<nav>
			<ul>
				{#each navLinks as link}
					<li><a href={link.url}>{link.name}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
</header>
