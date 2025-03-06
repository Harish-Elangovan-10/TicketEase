<script lang="ts">
    import { user } from "$lib/auth";
    import { handleAboutUs, handleBookNow, handleHome, handleMuseums, handleMuseumView, handleSignIn, handleSignOut, handleSignUp } from "$lib/handleRouting";
    import { stopLoading } from "$lib/pageLoading";
    import { Accessibility, AudioLines, Binoculars, Boxes, Coffee, ContactRound, GalleryVerticalEnd, Image, MapPin, ShoppingBag, Star, SwatchBook, Theater, Wifi } from "lucide-svelte";
    import { onDestroy, onMount } from "svelte";
    import { fetchMuseums, museums, type Museum } from "$lib/accessData";

    export let data: { museum: Museum | null };
    let museumData: Museum[] | null = null;
    let unsubscribe: () => void;
    let museum = data.museum;

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
  
    const similarMuseums = museum ? [
        (museum.id + 1) % 5, // (museum.id + 8) % 36,
        (museum.id + 2) % 5, // (museum.id + 16) % 36,
        (museum.id + 3) % 5, // (museum.id + 24) % 36,
        (museum.id + 4) % 5, // (museum.id + 32) % 36,
    ] : [];

    const tickets = [
        { type: "Standard", cost: 0 },
        { type: "Premium", cost: 100 },
        { type: "Elite", cost: 300 },
    ];

    let gallery = museum?.gallery ?? [];

    const overviews = [
        {
            title: 'Opening Hours',
            subtitle: '9:00 AM - 6:00 PM',
            extras: 'Closed on Mondays',
        },
        {
            title: 'Best Time to Visit',
            subtitle: 'Weekday mornings',
            extras: 'Avoid weekends',
        },
        {
            title: 'Average Visit Time',
            subtitle: '2-3 hours for general visit',
            extras: '4+ hours for in-depth exploration',
        },
        {
            title: 'Special Notes',
            subtitle: 'Photography allowed without flash',
            extras: 'Guided tours available hourly',
        },
    ];

    const exhibits = [
        { icon: Boxes, title: "Ancient Artifacts Collection", description: "Rare artifacts dating back to the 3rd century BCE, showcasing the craftsmanship of ancient Indian civilizations." },
        { icon: GalleryVerticalEnd, title: "Royal Gallery", description: "Exquisite collection of royal possessions including jewelry, weapons, and attire from various dynasties that ruled the region." },
        { icon: Image, title: "Modern Art Pavilion", description: "Contemporary artwork from prominent Indian artists reflecting the cultural evolution of the country in modern times." },
        { icon: Binoculars, title: "Archaeological Discoveries", description: "Fascinating archaeological finds from excavations across the state, providing insights into ancient everyday life." }
    ];

    const facilities = [
        { icon: Coffee, title: "Café", description: "Enjoy diverse refreshments and local cuisine at our cozy café, perfect for a relaxing break." },
        { icon: ShoppingBag, title: "Gift Shop", description: "Browse our unique collection of museum merchandise, including educational books and authentic replicas." },
        { icon: AudioLines, title: "Audio Tours", description: "Multi-language audio guides offering in-depth insights into major exhibition pieces." },
        { icon: Accessibility, title: "Accessibility", description: "Our venue offers complete wheelchair access, including convenient ramps, lifts, and adapted facilities." },
        { icon: Theater, title: "Theater", description: "State-of-the-art theater showcasing informative documentaries about our museum collections all day long." },
        { icon: Wifi, title: "Free Wi-Fi", description: "High-speed wireless internet access available at no cost throughout the building." },
    ];

    let mainImage = museum ? museum.image : "";
    let activeTab = 0;
    let basePrice = museum?.price ?? 0;
    let reviewLength = museum?.reviews.length ?? 0;
    let reviewCount = reviewLength > 3 ? 3 : reviewLength;

    const loadMoreReviews = () => {
        if(reviewCount + 3 > reviewLength) reviewCount = reviewLength;
        else reviewCount += 3;
    }

    const showlessReviews = () => {
        reviewCount = 3;
    }
    
    const tabs = ['Overview', 'Exhibits', 'Facilities', 'Reviews'];
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-400 pb-16">
    <div class="mx-12 pt-8">
        <nav class="flex justify-between items-center">
            <div class="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                MuseumPass
            </div>
            <div class="flex space-x-8">
                <button class="hover:text-white/90 transition-colors duration-200"
                onclick={handleHome}>
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

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
            <div class="h-fit md:col-span-1 p-7 rounded-xl bg-gradient-to-br from-gray-900 to-black border-[2px] border-gray-800">
                <h1 class="w-fit text-3xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                    {museum?.title}
                </h1>
                <div class="flex items-start justify-start gap-3 mt-5">
                    <MapPin class="mt-0.5 h-5 w-5 text-emerald-500" />
                    <div class="text-base max-w-96">{museum?.address}</div>
                </div>
                <div class="flex items-center justify-start gap-3 mt-5">
                    <Star class="h-5 w-5 text-emerald-500" />
                    <p class="text-base">{museum?.rating} Star rating</p>
                </div>
                <div class="flex items-center justify-start gap-3 mt-5">
                    <SwatchBook class="h-5 w-5 text-emerald-500" />
                    <p class="text-base">{museum?.exhibitCount} exhibits on display</p>
                </div>
                <div class="flex items-center justify-start gap-3 mt-5">
                    <ContactRound class="h-5 w-5 text-emerald-500" />
                    <p class="text-base">{museum?.contact}</p>
                </div>
                
                <div class="border-t-[2px] border-gray-800 mt-6 mb-4"></div>
                
                <h2 class="text-xl font-semibold text-white/90">Ticket Prices</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {#each tickets as ticket}
                        <div class="flex flex-col items-start justify-center mt-5 bg-gradient-to-br 
                            from-gray-900 to-gray-950 border-[2px] border-gray-800 py-2 px-4 rounded-lg"
                        >
                            <p class="font-medium text-xl bg-clip-text text-transparent bg-gradient-to-r 
								{ ticket.type === "Elite" ? 'from-yellow-400 to-amber-600' : 
								ticket.type === "Premium" ? 'from-violet-400 to-indigo-600' : 
								'from-cyan-400 to-blue-600' }"
                            >
                                { ticket.type }
                            </p>
                            <p class="text-lg bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent font-bold">
                                ₹{ basePrice + ticket.cost }
                            </p>
                        </div>
                    {/each}
                </div>
                <p class="mt-4 text-base text-gray-500 italic">*Half price for children under 12 years old</p>

                <div class="border-t-[2px] border-gray-800 mt-6 mb-4"></div>

                <button 
					class="w-full mt-2 py-4 px-6 rounded-lg font-semibold bg-gradient-to-r from-lime-400 to-emerald-400 
					text-black hover:opacity-90 transition-opacity disabled:opacity-50"
                    onclick={() => handleBookNow(museum ? museum.id.toString() : '0')}
				>
					Book your visit
            	</button>
            </div>

            <div class="md:col-span-2 space-y-7">
                <div class="w-full h-[45vh] rounded-xl overflow-hidden">
                    <img 
                      src={mainImage} 
                      alt={museum?.title}
                      class="h-full w-full object-cover"
                    />
                </div>
                <div class="grid grid-cols-3 gap-4">
                    {#each gallery as img, index}
                        <button 
                            class="h-[17vh] rounded-lg overflow-hidden"
                            onclick={() => mainImage = img}
                            onkeydown={(e) => e.key === 'Enter' && (mainImage = img)}
                        >
                            <img 
                              src={img} 
                              alt={`Gallery image ${index + 1}`}
                              class="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <div class="border-b border-gray-800 mt-12 mb-8">
            <div class="flex space-x-2">
                {#each tabs as tab, i}
                    <div class="flex flex-col items-center">
                        <button 
                            class="pb-4 px-6 { activeTab === i ? 'text-white/90' : 'hover:text-white/90' } transition-all duration-300"
                            onclick={() => activeTab = i}
                        >
                            {tab}
                        </button>
                        <div class="w-full h-[2px] { activeTab === i ? 'bg-gradient-to-r from-lime-500 to-emerald-500' : 'bg-transparent' } transition-all duration-300"></div>
                    </div>
                {/each}
            </div>
        </div>

        {#if activeTab === 0}
            <div class="space-y-10">
                <p class="text-white/90 leading-relaxed">
                    {museum?.description}
                </p>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {#each overviews as overview}
                        <div class="bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border-[2px] border-gray-800">
                            <h4 class="text-white/90 font-medium mb-3">{ overview.title }</h4>
                            <ul class="list-disc marker:text-lime-500 list-inside">
                                <li class="text-sm mb-2">{ overview.subtitle }</li>
                                <li class="text-sm mb-1">{ overview.extras }</li>
                            </ul>
                        </div>
                    {/each}
                </div>
            </div>
        {:else if activeTab === 1}
            <div class="grid grid-cols-2 gap-8">
                {#each exhibits as exhibit}
                    <div class="h-full w-full bg-gradient-to-br from-gray-900 to-black rounded-lg py-5 px-6 border-[2px] border-gray-800">
                        <div class="flex items-center justify-start gap-5 mb-5">
                            <svelte:component this={exhibit.icon} class="h-6 w-6 text-lime-500" />
                            <h4 class="text-white/90 text-xl font-bold">{ exhibit.title }</h4>
                        </div>
                        <p class="text-base mb-2">{ exhibit.description }</p>
                    </div>
                {/each}
            </div>
        {:else if activeTab === 2}
            <div class="grid grid-cols-3 gap-8">
                {#each facilities as facility}
                    <div class="h-full w-full bg-gradient-to-br from-gray-900 to-black rounded-lg py-5 px-6 border-[2px] border-gray-800">
                        <div class="flex items-center justify-start gap-5 mb-5">
                            <svelte:component this={facility.icon} class="h-6 w-6 text-lime-500" />
                            <h4 class="text-white/90 text-xl font-bold">{ facility.title }</h4>
                        </div>
                        <p class="text-base mb-2">{ facility.description }</p>
                    </div>
                {/each}
            </div>
        {:else if activeTab === 3}
            <div class="flex flex-col space-y-8">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        {#each Array(5) as _, i}
                            <Star class={`h-5 w-5 mr-0.5 ${i < Math.floor(museum?.rating ?? 0) ? 'text-lime-500' : 'text-gray-700'}`} />
                        {/each}
                        <p class="text-lg ml-2.5 font-semibold text-white/90">
                            {museum?.rating} out of 5
                        </p>
                    </div>
                    <button 
                        class="px-4 py-2 rounded-lg border-[1.5px] border-emerald-500 hover:border-emerald-300 hover:text-emerald-300 
                        focus:border-emerald-500 focus:text-emerald-500 text-emerald-500 transition-all duration-200"
                    >
                        Write a Review
                    </button>
                </div>
                {#each Array(reviewCount) as _, index}
                    <div class="bg-gradient-to-br from-gray-900 to-black border-[2px] border-gray-800 rounded-lg px-6 py-4 space-y-3">
                        <h1 class="text-lg text-white/90 font-semibold">
                            {museum?.reviews[index].name}
                        </h1>
                        <div class="flex items-center pb-1">
                            {#each Array(5) as _, i}
                                <Star class={`h-5 w-5 mr-0.5 ${i < Math.floor(museum?.reviews[index].rating ?? 0) ? 'text-lime-500' : 'text-gray-700'}`} />
                            {/each}
                            <p class="text-base ml-3">
                                {museum?.reviews[index].date}
                            </p>
                        </div>
                        <p class="text-white/90 pb-2">
                            {museum?.reviews[index].comment}
                        </p>
                    </div>
                {/each}
                {#if reviewCount < reviewLength}                    
                    <button 
                        class="self-center w-fit px-4 py-2 rounded-lg border-[1.5px] border-gray-400 hover:bg-white hover:text-black 
                        focus:bg-white/75 focus:text-black transition-all duration-200"
                        onclick={loadMoreReviews}
                    >
                        Load More
                    </button>
                {:else}
                    {#if reviewLength > 3}
                        <button 
                            class="self-center w-fit px-4 py-2 rounded-lg border-[1.5px] border-gray-400 hover:bg-white hover:text-black 
                            focus:bg-white/75 focus:text-black transition-all duration-200"
                            onclick={showlessReviews}
                        >
                            Show Less
                        </button>
                    {/if}
                {/if}
            </div>    
        {/if}

        <div class="mt-16">
            <div class="flex items-center justify-between mb-10 mr-5">
                <h1 class="text-3xl font-bold text-white/90">
                    Similar Museums You Might Like
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
                {#if museumData}
                    {#each similarMuseums as index}
                        <div class="bg-gradient-to-br from-gray-900 to-black rounded-xl border-[1.5px] border-gray-800">
                            <div class="h-48">
                                <img 
                                    src={museumData[index].image} 
                                    alt={museumData[index].title}
                                    class="h-full w-full object-cover rounded-t-xl"
                                />
                            </div>
                            <div class="p-6 flex flex-col">
                                <h3 class="text-xl font-bold text-white/90 mb-4">
                                    {museumData[index].title}
                                </h3>
                                <div class="flex items-center gap-2 mb-4">
                                    <MapPin class="h-5 w-5 text-emerald-500" />
                                    <span class="text-md">
                                        {museumData[index].location}, {museumData[index].state}
                                    </span>
                                </div>
                                <p class="text-md text-gray-300 mb-6">
                                    {museumData[index].subtitle}
                                </p>
                                <div class="flex items-center justify-between">
                                    <span class="flex items-center justify-start gap-1.5 text-md text-gray-400">
                                        <p>
                                            Starts from
                                        </p>
                                        <span class="bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent font-bold text-lg">
                                            ₹{museumData[index].price}
                                        </span>
                                    </span>
                                    <button 
                                        class="px-4 py-2 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600
                                        text-black focus:from-teal-500 focus:to-green-500 transition-all duration-200"
                                        onclick={() => handleMuseumView(museumData ? museumData[index].id?.toString() : '0')}
                                    >
                                        Visit Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>

    </div>
</div>

<svelte:head>
    <title>{museum?.title}</title>
</svelte:head>