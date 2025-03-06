<script lang="ts">
    import { MapPin, Search } from "lucide-svelte";
    import { onDestroy, onMount } from "svelte";
    import { user } from "$lib/auth";
    import { stopLoading } from "$lib/pageLoading";
    import { handleHome, handleMuseumView, handleSignIn, handleSignOut, handleSignUp } from "$lib/handleRouting";
    import { fetchMuseums, museums, type Museum } from "$lib/accessData";
    import LoadingAnimation from "$lib/loadingAnimation.svelte";

    let museumData: Museum[] | null = null;
    let unsubscribe: () => void;

    onMount(() => {
        stopLoading();
        fetchMuseums();
        unsubscribe = museums.subscribe((data) => {
            museumData = data;
        });
    });

    onDestroy(() => {
        if(unsubscribe) unsubscribe();
    });

    let searchQuery = "";
    let selectedState = "all";

    $: states = museumData ? [...new Set(museumData.map(museum => museum.state))].sort() : [];
    $: sortedMuseums = museumData ? museumData.filter(museum => {
        const matchesSearch = museum.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            museum.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            museum.state.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = selectedState === "all" || museum.state === selectedState;
        
        return matchesSearch && matchesState;
    }) : [];
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-400">
    <div class="mx-12 pt-8">
        <nav class="flex justify-between items-center mb-10">
            <div class="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                MuseumPass
            </div>
            <div class="flex space-x-8">
                <button class="hover:text-white/90 transition-colors duration-200"
                onclick={handleHome}>
                    Home
                </button>
                <button class="text-white/90 transition-colors duration-200">
                    Museums
                </button>
                <button class="hover:text-white/90 transition-colors duration-200">
                    About Us
                </button>
                
                {#if $user}
                    <button class="hover:text-white/90 transition-colors duration-200">
                        Dashboard
                    </button>
                    <button 
                        onclick={handleSignOut}
                        class="px-4 py-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                        focus:from-red-700 focus:to-red-800 transition-all duration-200 text-black"
                    >
                        Sign Out
                    </button>
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

        <div class="pb-12">
            <div class="flex flex-col items-center text-center mb-10 space-y-6">
                <h1 class="text-5xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                    Discover Museums
                </h1>
                <p class="text-xl text-gray-400">
                    Find and explore amazing museums across different states
                </p>
            </div>
            <div class="flex flex-col md:flex-row items-center justify-between mb-16 gap-5">
                <h1 class="text-3xl font-bold text-white/90">
                    All Museums
                </h1>
                <div class="flex w-full gap-5 md:w-auto">
                    <div class="relative flex-1 md:flex-none">
                        <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                        <input
                            type="text"
                            bind:value={searchQuery}
                            placeholder="Search museums..."
                            class="w-full md:w-64 pl-12 pr-4 py-2.5 rounded-lg bg-gray-950 border-[2px] border-gray-800 
                            hover:border-lime-600 focus:border-emerald-500 focus:outline-none text-white/90 placeholder-gray-400"
                        />
                    </div>
                    <div 
                        class="pr-3 pt-0.5 rounded-lg bg-gray-950 border-[2px] border-gray-800 
                            hover:border-lime-600 focus:border-emerald-500"
                    >
                        <select bind:value={selectedState} class="pl-4 py-2 outline-none bg-gray-950 text-gray-400">
                            <option value="all">All States</option>
                            {#each states as state}
                                <option value={state}>
                                    {state}
                                </option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {#if museumData}
                    {#each sortedMuseums as museum}
                        <div class="bg-gradient-to-br from-gray-900 to-black rounded-xl border-[1.5px] border-gray-800">
                            <div class="h-48">
                                <img 
                                    src={museum.image} 
                                    alt={museum.title}
                                    class="h-full w-full object-cover rounded-t-xl"
                                />
                            </div>
                            <div class="p-6 flex flex-col">
                                <h3 class="text-xl font-bold text-white/90 mb-4">
                                    {museum.title}
                                </h3>
                                <div class="flex items-center gap-2 mb-4">
                                    <MapPin class="h-5 w-5 text-emerald-500" />
                                    <span class="text-md">
                                        {museum.location}, {museum.state}
                                    </span>
                                </div>
                                <p class="text-md text-gray-300 mb-6">
                                    {museum.subtitle}
                                </p>
                                <div class="flex items-center justify-between">
                                    <span class="flex items-center justify-start gap-1.5 text-md text-gray-400">
                                        <p>
                                            Starts from
                                        </p>
                                        <span class="bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent font-bold text-lg">
                                            ₹{museum.price}
                                        </span>
                                    </span>
                                    <button 
                                        class="px-4 py-2 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600
                                        text-black focus:from-teal-500 focus:to-green-500 transition-all duration-200"
                                        onclick={() => handleMuseumView(museum.id?.toString())}
                                    >
                                        Visit Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <div class="col-span-full h-[50vh] w-full flex items-center justify-center">
                        <LoadingAnimation />
                    </div>
                {/if}
            </div>

            {#if sortedMuseums.length == 0 && museumData}
                <div class="w-full h-[50vh] flex items-center justify-center">
                    <p class="text-xl text-gray-400">No museums found matching your search criteria.</p>
                </div>
            {/if}
        </div>

    </div>
</div>

<svelte:head>
    <title>Museums</title>
</svelte:head>