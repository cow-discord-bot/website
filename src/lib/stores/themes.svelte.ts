import { PersistedState } from 'runed';
import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';

export class Theme {
	#theme = new PersistedState('theme', '', {
		serializer: {
			serialize: (value) => value,
			deserialize: (value) => value
		}
	});

	constructor() {
		$effect.pre(() => {
			if (browser) {
				document.documentElement.className = this.theme;
			}
		});
	}

	get theme() {
		if (!browser) {
			return 'dark';
		}

		if (this.#theme.current === '' || !this.#theme.current) {
			this.useSystem();
		}
		return this.#theme.current ?? 'dark';
	}

	set theme(value: string) {
		this.#theme.current = value;
		if (browser) {
			document.documentElement.className = value;
		}
	}

	useSystem() {
		if (!browser) {
			return;
		}

		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const systemTheme = prefersDark ? 'dark' : 'light';
		this.theme = systemTheme;
	}
}

export const themes = [
	{ name: 'Light', class: 'light' as const, isDark: false, icon: 'flowbite:sun-solid' },
	{ name: 'Dark', class: 'dark' as const, isDark: true, icon: 'ri:moon-fill' }
] as const;
export type ThemeClass = (typeof themes)[number]['class'];

export function initThemeContext() {
	const existing = getContext<Theme>('theme');
	if (existing) {
		return existing;
	}

	const stats = new Theme();
	setContext('theme', stats);
	return stats;
}

export function getThemeContext() {
	const stats = getContext<Theme>('theme');
	if (!stats) {
		throw new Error('Theme context not found');
	}
	return stats;
}
