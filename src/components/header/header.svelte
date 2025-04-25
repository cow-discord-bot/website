<script lang="ts">
	import Icon from '@iconify/svelte';
	import {
		PUBLIC_BOT_NAME,
		PUBLIC_GUILD_INVITE,
		PUBLIC_BOT_INVITE,
		PUBLIC_GITHUB_USERNAME,
		PUBLIC_GITHUB_REPO
	} from '$env/static/public';
	import './style.scss';

	const navLinks = [
		{ name: 'Home', url: '/' },
		{ name: 'Dashboard', url: 'dashboard' },
		{ name: 'Documentation', url: 'docs' },
		{ name: 'Source', url: `https://github.com/${PUBLIC_GITHUB_USERNAME}/${PUBLIC_GITHUB_REPO}` },
		{ name: 'Support', url: PUBLIC_GUILD_INVITE }
	];
</script>

<header>
	<div class="container">
		<div class="logo">
			<Icon icon="twemoji:cow-face" />
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
