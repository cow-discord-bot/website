<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { browser } from '$app/environment';
	import { getThemeContext } from '$lib/stores/themes.svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { themes } from '$lib/stores/themes.svelte.ts';
	import './ThemeSwitcher.scss';

	const settingsSync = writable(true);
	const themeContext = getThemeContext();

	let currentTheme = $state('dark');

	if (browser) {
		currentTheme = themeContext.theme;

		$effect(() => {
			currentTheme = document.documentElement.className || themeContext.theme;

			const observer = new MutationObserver(() => {
				currentTheme = document.documentElement.className;
			});

			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['class']
			});

			return () => observer.disconnect();
		});
	}

	const {
		elements: { trigger, menu, item, arrow },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true
	});

	const {
		elements: { checkboxItem }
	} = createCheckboxItem({
		checked: settingsSync
	});

	function setTheme(themeClass: string) {
		if (!browser) return;

		if (themeClass === 'system') {
			themeContext.useSystem();
		} else {
			themeContext.theme = themeClass;
		}
	}
</script>

<button class="trigger" use:melt={$trigger}>
	{#each themes as theme}
		{#if currentTheme === theme.class}
			<Icon icon={theme.icon} width="24" height="24" />
		{/if}
	{/each}
</button>

{#if $open}
	<div class="menu" use:melt={$menu} transition:fly={{ duration: 150, y: -10 }}>
		{#each themes as theme}
			<div
				class="item"
				use:melt={$item}
				onclick={() => setTheme(theme.class)}
				data-active={currentTheme === theme.class}
			>
				<div class="icon">
					<Icon icon={theme.icon} width="20" height="20" />
				</div>
				{theme.name}
				{#if currentTheme === theme.class}
					<div class="check">
						<Icon icon="mdi:check" width="16" height="16" />
					</div>
				{/if}
			</div>
		{/each}
		<div class="item" use:melt={$item} onclick={() => setTheme('system')}>
			<div class="icon">
				<Icon icon="ant-design:desktop-outlined" width="20" height="20" />
			</div>
			System
		</div>
		<div use:melt={$arrow}></div>
	</div>
{/if}
