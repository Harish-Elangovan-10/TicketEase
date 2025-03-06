<script lang="ts">
    import { resetPassword } from "$lib/auth";
    import { handleSignIn } from "$lib/handleRouting";
    import { startLoading, stopLoading } from "$lib/pageLoading";
    import { Mail } from "lucide-svelte";
    import { onMount } from "svelte";
    
    onMount(() => {
        stopLoading();
    });

    let email = '';
    let success = '';
    let error = '';

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        try {
            startLoading();
            error = '';
            success = '';
            const response = await resetPassword(email);
            
            if (response.success) {
                stopLoading();
                success = 'Password reset email sent. Please check your inbox and reset your password to Sign In.';
                email = '';
            } else {
                stopLoading();
                throw new Error(response.message);
            }
        } catch (e) {
            stopLoading();
            error = 'Failed to send password reset email. Please check your email address.';
        }
    };
</script>

<div class="min-h-screen text-white/75 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
	<div class="flex flex-col items-center justify-stretch space-y-5">
		<h1 class="h-12 text-4xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
            Reset your Password
		</h1>
		{#if error}
			<p class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent pb-3">{error}</p>
        {:else if success}
            <p class="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent pb-3">{success}</p>            
		{:else}
			<h2 class="text-gray-400 pb-3">
                Enter your email to receive a password reset link.
			</h2>
		{/if}
		<div class="w-md bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800 backdrop-blur-sm">
			<form onsubmit={handleSubmit}>
				<div class="space-y-7">
					<div class="relative group input-gradient">
						<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
							<Mail class="h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
						</div>
						<input
						type="email"
						bind:value={email}
						class="block w-full pl-12 pr-3 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none" 
						placeholder="Enter your email"
						required
						/>
					</div>

					{#if success}
                        <button
                            onclick={handleSignIn}
                            type="button"
                            class="w-full py-3 px-4 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600
                            font-medium focus:outline-none focus:from-teal-500 focus:to-green-500 transition-all duration-200"
                        >
                            Sign In
                        </button>
                    {:else}
                        <button
                            type="submit"
                            class="w-full py-3 px-4 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600
                            font-medium focus:outline-none focus:from-teal-500 focus:to-green-500 transition-all duration-200"
                        >
                            Send Link
                        </button>
                    {/if}
				</div>				
			</form>
		</div>
	</div>
</div>