<script lang="ts">
    import { user } from "$lib/auth";
    import LoadingAnimation from "$lib/loadingAnimation.svelte";
    import { isPageLoading, startLoading, stopLoading } from "$lib/pageLoading";
    import { handleMuseums, handleSignIn, handleSignUp, handleSignOut, handleAboutUs } from "$lib/handleRouting";
    import { Building2, Globe, Users, MapPin } from "lucide-svelte";
    import { onMount } from "svelte";
    import museums from "$lib/museums.json"

    onMount(() => {
        stopLoading();
    });

    const featuredMuseums = [13, 20, 35, 22, 11, 0, 28, 6];
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-400">
    <div class="mx-12 pt-8">
        <nav class="flex justify-between items-center">
            <div class="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                MuseumPass
            </div>
            <div class="flex items-center space-x-8">
                <button class="text-white/90">
                    Home
                </button>
                <button 
                    onclick={handleMuseums}
                    class="hover:text-white/90 transition-colors duration-200"
                >
                    Museums
                </button>
                <button
                    onclick={handleAboutUs} 
                    class="hover:text-white/90 transition-colors duration-200"
                >
                    About Us
                </button>
                
                {#if $user}
                    <button class="hover:text-white/90 transition-colors duration-200">
                        Dashboard
                    </button>
                    <div class="flex items-center space-x-6">
                        <p class="bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent font-semibold transition-all duration-200">
                            Hello, {$user.firstName}
                        </p>
                        <button 
                            onclick={handleSignOut}
                            class="h-10 w-10 bg-gradient-to-br from-lime-500 to-emerald-500 rounded-full flex justify-center items-center text-black font-semibold"
                        >
                            {$user.firstName[0]}{$user.lastName[0]}
                        </button>
                    </div>
                {:else}
                    <button 
                        onclick={handleSignIn}
                        class="px-4 py-2 rounded-lg border-[1.5px] border-gray-400 hover:bg-white hover:text-black 
                        focus:bg-white/75 focus:text-black transition-all duration-200"
                    >
                        Sign In
                    </button>
                    <button 
                        onclick={handleSignUp}
                        class="px-4 py-2 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 
                        text-black focus:from-teal-500 focus:to-green-500 transition-all duration-200"
                    >
                        Sign Up
                    </button>
                {/if}
            </div>
        </nav>

        <div class="flex flex-col items-center text-center pt-16 pb-10 px-10 space-y-4">
            <h1 class="h-20 text-6xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                Discover India's Heritage
            </h1>
            <p class="text-xl text-gray-400 max-w-2xl mb-8">
                Your digital gateway to India's most prestigious museums. Experience the rich cultural heritage and artistic treasures across different states
            </p>
            <div class="flex gap-10 text-gray-400">
                <div class="flex items-center gap-3">
                    <Globe class="h-5 w-5 text-emerald-500" />
                    <span>28+ States</span>
                </div>
                <div class="flex items-center gap-3">
                    <Building2 class="h-5 w-5 text-emerald-500" />
                    <span>100+ Museums</span>
                </div>
                <div class="flex items-center gap-3">
                    <Users class="h-5 w-5 text-emerald-500" />
                    <span>500K+ Visitors</span>
                </div>
            </div>
        </div>

        <div class="pb-12">
            <div class="flex items-center justify-between mb-10 mr-5">
                <h1 class="text-3xl font-bold text-white/90">
                    Featured Museums
                </h1>
                <button 
                    class="px-4 py-2 rounded-lg border-[1.5px] border-gray-400 hover:bg-white hover:text-black 
                    focus:bg-white/75 focus:text-black transition-all duration-200"
                    onclick={handleMuseums}
                >
                    View All Museums
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {#each featuredMuseums as index}
                    <div class="bg-gradient-to-br from-gray-900 to-black rounded-xl border-[1.5px] border-gray-800">
                        <div class="h-48">
                            <img 
                                src={museums[index].image} 
                                alt={museums[index].title}
                                class="h-full w-full object-cover rounded-t-xl"
                            />
                        </div>
                        <div class="p-6 flex flex-col">
                            <h3 class="text-xl font-bold text-white/90 mb-4">
                                {museums[index].title}
                            </h3>
                            <div class="flex items-center gap-2 mb-4">
                                <MapPin class="h-5 w-5 text-emerald-500" />
                                <span class="text-md">
                                    {museums[index].location}, {museums[index].state}
                                </span>
                            </div>
                            <p class="text-md text-gray-300 mb-6">
                                {museums[index].description}
                            </p>
                            <div class="flex items-center justify-between">
                                <span class="flex items-center justify-start gap-1.5 text-md text-gray-400">
                                    <p>
                                        Starts from
                                    </p>
                                    <span class="bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent font-bold text-lg">
                                        ₹{museums[index].price}
                                    </span>
                                </span>
                                <button class="px-4 py-2 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600
                                text-black focus:from-teal-500 focus:to-green-500 transition-all duration-200">
                                    Visit Now
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<svelte:head>
    <title>Home Page</title>
</svelte:head>