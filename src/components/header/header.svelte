<script lang="ts">
	import Icon from '@iconify/svelte';
	import {
		PUBLIC_BOT_NAME,
		PUBLIC_GUILD_INVITE,
		PUBLIC_GITHUB_USERNAME,
		PUBLIC_GITHUB_REPO
	} from '$env/static/public';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import './Header.scss';

	const navLinks = [
		{ name: 'Dashboard', url: 'dashboard' },
		{ name: 'Documentation', url: 'docs' },
		{ name: 'Source', url: `https://github.com/${PUBLIC_GITHUB_USERNAME}/${PUBLIC_GITHUB_REPO}` },
		{ name: 'Support', url: PUBLIC_GUILD_INVITE }
	];

	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function handleLinkClick() {
		mobileMenuOpen = false;
	}
</script>

<header>
	<div class="container">
		<a href="/" class="logo">
			<Icon icon="twemoji:cow-face" />
			<h2>{PUBLIC_BOT_NAME}</h2>
		</a>

		<button
			type="button"
			class="mobile-menu-button"
			onclick={toggleMobileMenu}
			aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileMenuOpen}
		>
			<Icon icon={mobileMenuOpen ? 'mdi:close' : 'mdi:menu'} width="24" height="24" />
		</button>

		<nav class:active={mobileMenuOpen}>
			<ul>
				{#each navLinks as link}
					<li><a href={link.url} onclick={handleLinkClick}>{link.name}</a></li>
				{/each}
				<ThemeSwitcher />
			</ul>
		</nav>
	</div>
</header>
