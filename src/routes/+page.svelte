<script lang="ts">
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import {
		PUBLIC_GUILD_INVITE,
		PUBLIC_GITHUB_USERNAME,
		PUBLIC_GITHUB_REPO
	} from '$env/static/public';
	import './style.scss';

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		multiple: true
	});

	const items = [
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

	let className = '';
	export { className as class };
</script>

<div class="faq">
	<h1 class="accordion-title">FAQ</h1>
	<div class="accordion {className}" {...$root}>
		{#each items as { id, title, description }, i}
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
