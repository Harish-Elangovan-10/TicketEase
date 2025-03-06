<script lang="ts">
	import { Mail, Lock, Eye, EyeClosed, User } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { signUp, signInWithGoogle } from '$lib/auth';
    import { startLoading, stopLoading } from '$lib/pageLoading';

	let email = $state('');
	let password = $state('');
	let confirm = $state('');
	let firstname = $state('');
	let lastname = $state('');
	let error = $state('');

	const handleSignUp = async (event: Event) => {
		event.preventDefault();
		try {
			startLoading();
			error = '';
			if(password !== confirm) {
				error = "Passwords do not match.";
				stopLoading();
				return;
			}
			
			const response = await signUp(email, password, firstname, lastname);
			if (response.success) {
				window.location.href = '/userdata';
			} else {
				throw new Error(response.message);
			}
		} catch (e) {
			stopLoading();
			error = "Failed to create account. Please try again.";
		}
	};

	const handleGoogleSignUp = async () => {
		try {
			startLoading();
			error = '';
			const response = await signInWithGoogle();
			
			if (response.success) {
				window.location.href = '/userdata';
			} else {
				throw new Error(response.message);
			}
		} catch (e) {
			stopLoading();
			error = "Failed to sign in with Google."
		}
	};

	onMount(() => {
		stopLoading();
		document.title = "Sign Up";
	});

	let showPassword = $state(false);
	const togglePassword = () => {
		showPassword = !showPassword;
	};

	let showConfirm = $state(false);
	const toggleConfirm = () => {
		showConfirm = !showConfirm;
	};
</script>

<div class="min-h-screen text-white/75 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
	<div class="flex flex-col items-center justify-stretch space-y-5">
		<h1 class="h-12 text-4xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
			Ready to explore?
		</h1>
		{#if error}
			<p class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent pb-3">{error}</p>
		{:else}
			<h2 class="text-gray-400 pb-3">
				Book now and start your journey through history and culture!
			</h2>
		{/if}
		<div class="w-md bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800 backdrop-blur-sm">
			<form onsubmit={handleSignUp}>
				<div class="space-y-7">
					<div class="grid grid-cols-2 gap-3">
						<div class="relative group input-gradient">
							<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
								<User class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {firstname.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
							</div>
							<input
							type="text"
							id="firstname"
							bind:value={firstname}
							class="block w-full pl-12 pr-3 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none" 
							placeholder="First Name"
							required
							/>
						</div>

						<div class="relative group input-gradient">
							<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
								<User class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {lastname.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
							</div>
							<input
							type="text"
							id="lastname"
							bind:value={lastname}
							class="block w-full pl-12 pr-3 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none" 
							placeholder="Last Name"
							required
							/>
						</div>
					</div>

					<div class="relative group input-gradient">
						<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
							<Mail class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {email.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
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
							<Lock class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {password.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
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
					
					<div class="relative group input-gradient">
						<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
							<Lock class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {confirm.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
						</div>
						<input
							type={showConfirm ? "text" : "password"}
							id="confirm"
							bind:value={confirm}
							class="block w-full px-12 pr-3 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none" 
							placeholder="Confirm Password"
							required
						/>
						<button 
							type="button"
							onclick={toggleConfirm}
							class="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointers"
						>
							{#if showConfirm}
								<Eye class="w-5 h-5 text-gray-400" />
							{:else}
								<EyeClosed class="w-5 h-5 text-gray-400" />
							{/if}
						</button>
					</div>
					<button
						type="submit"
						class="mt-1 w-full py-3 px-4 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600
						font-medium focus:outline-none focus:from-teal-500 focus:to-green-500 transition-all duration-200"
					>
						Create Account
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
						onclick={handleGoogleSignUp}
						class="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-950
						font-medium focus:outline-none focus:from-gray-700 focus:to-gray-8s00 transition-all duration-200"
					>
						<img src="./src/assets/search.png" alt="Google" class="h-5 w-5 mr-3">
						Sign up with Google
					</button>
				</div>				
			</form>

			<div class="mt-6 text-center">
				<p>
					Already have an account?
					<a
						href="/login"
						class="pl-1 bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent 
						hover:from-lime-600 hover:to-emerald-600 focus:from-teal-500 focus:to-green-500 transition-all duration-200"
					>
						Sign In
					</a>
				</p>
			</div>
		</div>
	</div>
</div>