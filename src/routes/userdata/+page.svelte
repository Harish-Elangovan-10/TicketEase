<script lang="ts">
    import { 
        CircleUserRound, 
        Phone, 
        Mail, 
        Building, 
        Building2,
        Landmark,
        MapPin
    } from "lucide-svelte";
    import type { UserProfile } from "$lib/types";
    import { isPageLoading, startLoading, stopLoading } from "$lib/pageLoading";
    import { updateUserProfile, user } from "$lib/auth";
    import { onMount } from "svelte";
    import LoadingAnimation from "$lib/loadingAnimation.svelte";

    onMount(() => {
        stopLoading();
    });

    
    let userData: UserProfile = {
        uid: '',
        displayName: '',
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            pincode: '',
        },
    };

    $: {
        userData.uid = $user?.uid ?? '';
		userData.displayName = $user?.displayName ?? '';
        userData.firstName = $user?.firstName ?? '';
        userData.lastName = $user?.lastName ?? '';
        userData.email = $user?.email ?? '';
	}

    function formatMobile(event: Event) {
		const input = event.target as HTMLInputElement;
		let value = input.value.replace(/\D/g, '');
		value = value.substring(0, 10);
		value = value.replace(/(\d{5})(?=\d)/g, '$1 ');
		userData.mobile = value;
	};

    const handleSkip = () => {
        try {
            startLoading();
            window.location.href = "/";
        } catch (error) {
            stopLoading();
            console.error("Error navigating to Home: ", error);
        }
    };

    const handleUpdate = () => {
        try {
            startLoading();
            updateUserProfile(userData);
            window.location.href = "/";
        } catch (error) {
            stopLoading();
            console.error("Error navigating to Home: ", error);
        }
    };
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center text-gray-400">
    {#if $isPageLoading}
        <div class="fixed inset-0 flex items-center justify-center w-full h-screen bg-black/75 backdrop-blur-sm z-50">
            <LoadingAnimation />
        </div>
    {/if}
    <div class="flex flex-col items-center mt-20 mb-12">
        <h1 class="w-fit text-4xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
            Update Your Profile
        </h1>
        <p class="text-lg mt-8">
            Keep your information current to ensure seamless booking experiences
        </p>
    </div>

    <div class="bg-gradient-to-br max-w-6xl from-gray-900 to-black p-8 rounded-xl border-[2px] border-gray-800 backdrop-blur-sm">
        <div class="grid grid-cols-1 space-y-6">
            <div class="grid grid-cols-2 gap-5">
                <div class="relative group input-gradient">
                    <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                        <CircleUserRound class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {userData.firstName.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                    </div>
                    <input
                        type="text"
                        bind:value={userData.firstName}
                        class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                        border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                        placeholder="First Name"
                        required
                    />
                </div>

                <div class="relative group input-gradient">
                    <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                        <CircleUserRound class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {userData.lastName.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                    </div>
                    <input
                      type="text"
                      bind:value={userData.lastName}
                      class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                          border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                      placeholder="Last Name"
                      required
                    />
                </div>
            </div>

            <div class="grid grid-cols-2 gap-5">
                <div class="relative group input-gradient">
                    <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                        <Phone class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {userData.mobile.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                    </div>
                    <input
                        type="text"
                        bind:value={userData.mobile}
                        oninput={formatMobile}
                        class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                        border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                        placeholder="Phone Number"
                        required
                    />
                </div>

                <div class="relative group">
                    <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                        <Mail class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {userData.email?.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                    </div>
                    <input
                        type="text"
                        bind:value={userData.email}
                        class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 placeholder-white/30 transition-all duration-200 focus:outline-none 
					    border-[2px] border-gray-800 text-gray-500/80"
                        placeholder="Email Address"
                        disabled
                    />
                </div>
            </div>

            <div class="relative group input-gradient">
                <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                    <Building2 class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {userData.address.line1.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                </div>
                <input
                  type="text"
                  bind:value={userData.address.line1}
                  class="block w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                          border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                  placeholder="Address Line 1"
                  required
                />
            </div>

            <div class="relative group input-gradient">
                <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                    <Building2 class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {userData.address.line2.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                </div>
                <input
                  type="text"
                  bind:value={userData.address.line2}
                  class="block w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                          border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                  placeholder="Address Line 2"
                  required
                />
            </div>

            <div class="grid grid-cols-3 gap-5">
                <div class="relative group input-gradient">
                    <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                        <Building class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {userData.address.city.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                    </div>
                    <input
                      type="text"
                      bind:value={userData.address.city}
                      class="block w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                          border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                      placeholder="City"
                      required
                    />
                </div>

                <div class="relative group input-gradient">
                    <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                        <Landmark class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {userData.address.state.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                    </div>
                    <input
                      type="text"
                      bind:value={userData.address.state}
                      class="block w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                          border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                      placeholder="State"
                      required
                    />
                </div>

                <div class="relative group input-gradient">
                    <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                        <MapPin class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {userData.address.pincode.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                    </div>
                    <input
                      type="text"
                      bind:value={userData.address.pincode}
                      class="block w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                          border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                      placeholder="Pincode"
                      required
                    />
                </div>
            </div>
        </div>

        <div class="flex items-center justify-between mt-6 px-1">
            <button 
                class="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg px-6 py-2.5 text-lg
                hover:from-gray-800 hover:to-gray-900 focus:from-gray-700 focus:to-gray-900"
                onclick={handleSkip}
            >
                Skip
            </button>
            <button 
                class="bg-gradient-to-br from-lime-500 to-emerald-500 rounded-lg px-6 py-2.5 text-lg text-black
                hover:from-lime-600 hover:to-emerald-600 focus:from-cyan-500 focus:to-green-500"
                onclick={handleUpdate}
            >
                Update
            </button>
        </div>
    </div>
</div>