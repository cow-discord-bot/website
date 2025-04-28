<script lang="ts">
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import {
		PUBLIC_GUILD_INVITE,
		PUBLIC_GITHUB_USERNAME,
		PUBLIC_GITHUB_REPO
	} from '$env/static/public';
	import Icon from '@iconify/svelte';
	import './style.scss';

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		multiple: true
	});

	const faqItems = [
		{
			id: 'item-1',
			title: 'Can I use my own bot account?',
			description: `Yes! There's have a guide on how to set it up for yourself on our <a href='https://github.com/${PUBLIC_GITHUB_USERNAME}/${PUBLIC_GITHUB_REPO}'>Github</a>.<br>You will have to host it yourself though because that could get pretty expensive for me if I did it for you.`
		},
		{
			id: 'item-2',
			title: 'How do i do <insert thing>?',
			description: `Check out the documentation, if you cant find what you're looking for there, then feel free to ask in the <a href=${PUBLIC_GUILD_INVITE}>Discord</a>.`
		},
		{
			id: 'item-3',
			title: 'Is it any good?',
			description: "<a href='https://news.ycombinator.com/item?id=3067434'>Yes</a>."
		}
	];

	const features = [
		{
			name: 'Automoderation',
			description:
				'A powerful Automod with regex, flexible matching, custom punishments, role ignores, and timeframe-based actions.<br><br>' +
				'Easy setup for blocking swearing, slurs, scam links, and server invites.<br><br>' +
				'Image scanning that searches for automodded text to prevent bypassing.',
			icon: 'material-symbols:shield'
		},
		{
			name: 'Spam Protection',
			description:
				'Detects repeated messages, excessive caps, markdown abuse, mass pings and more.',
			icon: 'maki:police'
		},
		{
			name: 'Role Menus',
			description:
				'Support for buttons, dropdowns, and classic role menus.<br><br>' +
				'Single-role and multi-role selection modes.<br><br>' +
				'Fast setup via slash command or web config.',
			icon: 'fa-solid:laugh'
		},
		{
			name: 'Ticket System',
			description:
				'Custom ticket types with creation forms (like GitHub issue templates).<br><br>' +
				'Auto-instructions per type (instructions, quick info, etc.).<br><br>' +
				'Archive and upload your tickets so they never get lost.',
			icon: 'material-symbols:mail'
		},
		{
			name: 'Action Logging',
			description:
				'Track anything and everything going on across your server.<br><br>' +
				'Customize what logs you want, where they go, who they ping and more',
			icon: 'fa6-solid:magnifying-glass'
		},
		{
			name: 'Custom Command Builder',
			description:
				'Web-based GUI to create custom commands.<br><br>' +
				'Support for dynamic arguments, cooldowns, and permission checks.',
			icon: 'mdi:lego'
		},
		{
			name: 'Server Stats & Analytics',
			description:
				'Live stats channels for member count, boosts, GitHub downloads, etc.<br><br>' +
				'Peak active hours, growth charts, and mod-action summaries.<br><br>' +
				'Exportable CSV reports.',
			icon: 'mdi:chart-line'
		},
		{
			name: 'Captcha Verification',
			description: 'Require a captcha verification to gain access to the server.',
			icon: 'bx:bot'
		},
		{
			name: 'Social Media Alerts',
			description:
				'Auto announcements for nearly all social media uploads/livestreams.<br><br>' +
				'Youtube, Twitter, Twitch, Kick, Instagram, TikTok + more<br><br>',
			icon: 'mdi:youtube'
		},
		{
			name: 'Auto Responses',
			description:
				'Keyword, phrase, starts/ends/contains, or full regex triggers.<br><br>' +
				'Static replies or dynamic context-aware messages.',
			icon: 'material-symbols:chat'
		}
	];
</script>

<div class="page">
	<div class="feature-list">
		{#each features as { name, description, icon }, i}
			<div class="feature {i % 2 == 0 ? 'left' : 'right'}">
				<Icon {icon} class="feature-icon" width="30" height="30" />
				<h2 class="feature-title">{name}</h2>
				<p class="feature-description">{@html description}</p>
			</div>
		{/each}
	</div>
	<div class="faq">
		<h1 class="accordion-title">FAQ</h1>
		<div class="accordion" {...$root}>
			{#each faqItems as { id, title, description }, i}
				<div use:melt={$item(id)} class="accordion-item {$isSelected(id) ? 'is-active' : ''}">
					<h2 class="accordion-header">
						<button
							use:melt={$trigger(id)}
							class="accordion-trigger {i !== 0 ? 'has-border' : ''}"
							aria-expanded={$isSelected(id)}
						>
							<span>{title}</span>
							<svg
								class="accordion-icon"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</button>
					</h2>
					{#if $isSelected(id)}
						<div
							class="accordion-content"
							use:melt={$content(id)}
							transition:slide={{ duration: 300, easing: cubicOut }}
						>
							<div class="accordion-content-inner">
								{@html description}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
