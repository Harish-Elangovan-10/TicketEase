<script lang="ts">
    import LoadingAnimation from '$lib/loadingAnimation.svelte';
    import { isPageLoading } from '$lib/pageLoading';
	import '../app.css';
	let { children } = $props();
</script>

{#if $isPageLoading}
    <div class="fixed inset-0 flex items-center justify-center w-full h-screen bg-black/75 backdrop-blur-sm z-50">
        <LoadingAnimation />
    </div>
{/if}

{@render children()}
