<script lang="ts">
	import { Mail, Lock, Eye, EyeClosed } from 'lucide-svelte';
	import LoadingAnimation from '$lib/loadingAnimation.svelte';
	import { isPageLoading, startLoading, stopLoading } from '$lib/pageLoading';
	import { onMount } from 'svelte';
	import { signIn, signInWithGoogle } from '$lib/auth';

	let email = $state('');
	let password = $state('');
	let rememberMe = $state(false);
	let error = $state('');

	const handleSignIn = async () => {
		try {
			startLoading();
			error = '';
			await signIn(email, password, rememberMe);
			window.location.href = '/';
		} catch (e) {
			stopLoading();
			error = "Failed to sign in. Please check your credentials.";
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			startLoading();
			error = '';
			await signInWithGoogle();
			window.location.href = '/';
		} catch (e) {
			stopLoading();
			error = "Failed to sign in with Google."
		}
	};

	const handleForgotPassword = async () => {
		try {
			startLoading();
			error = '';
			window.location.href = '/forgotpass';
		} catch (e) {
			stopLoading();
			error = "Failed to reset your password.";
		}
	};

	onMount(() => {
		stopLoading();
		document.title = "Sign In";
	});

	let showPassword = $state(false);

	const togglePassword = () => {
		showPassword = !showPassword;
	};
</script>

<div class="min-h-screen text-white/75 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">	
	{#if $isPageLoading}
		<div class="fixed inset-0 flex items-center justify-center w-full h-screen bg-black/75 backdrop-blur-sm z-50">
			<LoadingAnimation />
		</div>
	{/if}
	<div class="flex flex-col items-center justify-stretch space-y-5">
		<h1 class="h-12 text-4xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
			Great to be back!
		</h1>
		{#if error}
			<p class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent pb-3">{error}</p>
		{:else}
			<h2 class="text-gray-400 pb-3">
				The faster you fuel up, the faster you snag your ticket.
			</h2>
		{/if}
		<div class="w-md bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800 backdrop-blur-sm">
			<form onsubmit={handleSignIn}>
				<div class="space-y-7">
					<div class="relative group input-gradient">
						<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
							<Mail class="h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
						</div>
						<input
						type="email"
						id="email"
						bind:value={email}
						class="block w-full pl-12 pr-3 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none" 
						placeholder="Email Address"
						required
						/>
					</div>
					
					<div class="relative group input-gradient">
						<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
							<Lock class="h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
						</div>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							bind:value={password}
							class="block w-full px-12 pr-3 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none" 
							placeholder="Password"
							required
						/>
						<button 
							type="button"
							onclick={togglePassword}
							class="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointers"
						>
							{#if showPassword}
								<Eye class="w-5 h-5 text-gray-400" />
							{:else}
								<EyeClosed class="w-5 h-5 text-gray-400" />
							{/if}
						</button>
					</div>

					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2.5">
							<input 
								type="checkbox"
								bind:checked={rememberMe}
								class="h-6 w-6 transition-all duration-300"
							/>
							<label for="remenber-me" class="block text-sm text-gray-400">
								Remember me
							</label>
						</div>
						<button
							onclick={handleForgotPassword}
							type="button"
							class="text-sm bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent 
							hover:from-lime-600 hover:to-emerald-600 focus:from-teal-500 focus:to-green-500 transition-all duration-200"
						>
							Forgot Password?
						</button>
					</div>

					<button
						type="submit"
						class="w-full py-3 px-4 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600
						font-medium focus:outline-none focus:from-teal-500 focus:to-green-500 transition-all duration-200"
					>
						Sign In
					</button>

					<div class="relative">
						<div class="absolute inset-0 pt-0.5 flex items-center">
							<div class="w-full border-[1px] border-gray-800"></div>
						</div>
						<div class="relative flex justify-center text-sm">
						  	<span class="px-2 bg-black text-gray-400">Or continue with</span>
						</div>
					</div>

					<button
						type="button"
						onclick={handleGoogleSignIn}
						class="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-950
						font-medium focus:outline-none focus:from-gray-700 focus:to-gray-8s00 transition-all duration-200"
					>
						<img src="./src/assets/search.png" alt="Google" class="h-5 w-5 mr-3">
						Sign in with Google
					</button>
				</div>				
			</form>

			<div class="mt-6 text-center">
				<p>
					Don't have an account?
					<a
						href="/signup"
						class="pl-1 bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent 
						hover:from-lime-600 hover:to-emerald-600 focus:from-teal-500 focus:to-green-500 transition-all duration-200"
					>
						Sign Up
					</a>
				</p>
			</div>
		</div>
	</div>
</div>