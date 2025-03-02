<script lang="ts">
    import { user } from '$lib/auth';
    import { handleHome, handleMuseums, handleSignIn, handleSignOut, handleSignUp } from '$lib/handleRouting';
    import { stopLoading } from '$lib/pageLoading';
    import { Ticket, Shield, Globe, Zap, Phone, Mail, MapPin } from 'lucide-svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        stopLoading();
    });

    const features = [
        {
            icon: Ticket,
            title: "Easy Booking",
            description: "Streamlined ticket booking for over 500 government museums across the nation, making culture accessible to all.",
        },
        {
            icon: Shield,
            title: "Government Authorized",
            description: "Official platform for all state and national museum bookings, ensuring secure and legitimate transactions.",
        },
        {
            icon: Globe,
            title: "Nationwide Access",
            description: "Connect with museums across the country through a single platform, simplifying cultural exploration.", 
        },
        {
            icon: Zap,
            title: "Instant Confirmation",
            description: "Real-time booking confirmation and digital tickets for a seamless museum visit experience.",
        },
    ]

    const benefits = [
    {
      title: "Government Museums",
      value: "30+",
      desc: "Connected nationwide"
    },
    {
      title: "Monthly Visitors",
      value: "100K+",
      desc: "Through our platform"
    },
    {
      title: "User Satisfaction",
      value: "98%",
      desc: "Booking experience rating"
    }
  ];

</script>

<div class="min-h-screen text-white/75 bg-gradient-to-br from-gray-900 to-black">
    <div class="mx-12 pt-8">
        <nav class="flex justify-between items-center text-gray-400">
            <div class="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                MuseumPass
            </div>
            <div class="flex space-x-8">
                <button 
                    onclick={handleHome}
                    class="hover:text-white/90 transition-colors duration-200"
                >
                    Home
                </button>
                <button 
                    onclick={handleMuseums}
                    class="hover:text-white/90 transition-colors duration-200"
                >
                    Museums
                </button>
                <button
                    class="text-white/90 transition-colors duration-200"
                >
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
    </div>
    
    <div class="pl-32 pt-24">
        <h1 class="text-5xl w-fit h-14 font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
            Honoring the past, 
        </h1>
        <h1 class="text-5xl w-fit h-14 mt-2 font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
            Shaping the future.
        </h1>
    </div>
    <div class="ml-32 mt-12">
        <p class="text-lg text-white/75 max-w-5xl">
            Embark on a journey through time: where history lives and art speaks. More than artifacts, the museum visit is a cultural odyssey. Wander through the echoes of ancient civilizations, marvel at the masterpieces that have shaped our world, and uncover the stories behind every exhibit. Each step you take unlocks a new chapter, connecting the past with the present and inspiring a brighter future.
        </p>
    </div>
    <div class="max-w-8xl mx-auto px-14 py-24">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
            {#each features as feature}
                <div class="bg-gradient-to-br from-gray-800 to-gray-800 hover:from-lime-500 hover:to-emerald-500 p-[2px] rounded-xl">
                    <div class="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8">
                        <div class="bg-gradient-to-br from-lime-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <svelte:component this={feature.icon} class="w-6 h-6 text-black" />
                        </div>
                        <h2 class="text-lg font-semibold text text-white/85 mb-2">
                            {feature.title}
                        </h2>
                        <p class="text-gray-400">
                            {feature.description}
                        </p>
                    </div>
                </div>
            {/each}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            <div class="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border-[2.5px] border-gray-800 flex flex-col items-center space-y-7">
                <h2 class="text-3xl h-10 w-fit font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                    Your Gateway to Cultural Heritage
                </h2>
                <p class="text-md text-gray-300 text-center">
                    As the official government platform for museum ticket bookings, we're committed to making cultural experiences accessible to everyone. Our platform connects visitors with hundreds of state and national museums, streamlining the booking process while preserving the integrity of our cultural institutions.
                </p>
                <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                    {#each benefits as stat}
                        <div class="flex flex-col items-center text-center">
                            <div class="text-2xl w-fit font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <h3 class="text-white/90 font-medium text-sm mt-2">
                                {stat.title}
                            </h3>
                            <p class="text-gray-400 text-sm mt-1">
                                {stat.desc}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="w-full bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border-[2.5px] border-gray-800 flex flex-col items-center justify-between">
                <h2 class="text-3xl w-fit font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                    Get in Touch
                </h2>
                <p class="text-md max-w-xl font-normal text-gray-300 text-center">
                    Have questions or need assistance? Our team is here to help. Reach out to us via phone, email, or visit our office for personalized support.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div class="flex flex-col items-center space-y-2">
                        <Phone class="text-green-500 h-8 w-8" />
                        <h3 class="text-white/90 font-medium">
                            Phone
                        </h3>
                        <p class="text-sm text-gray-400">
                            +1 (800) 123 4567
                        </p>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <Mail class="text-green-500 h-8 w-8" />
                        <h3 class="text-white/90 font-medium">
                            Email
                        </h3>
                        <p class="text-sm text-gray-400">
                            museumpass_support@gmail.com
                        </p>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <MapPin class="text-green-500 h-8 w-8" />
                        <h3 class="text-white/90 font-medium">
                            Address
                        </h3>
                        <p class="text-sm text-gray-400">
                            Chennai, India
                        </p>
                    </div>
                </div>                
            </div>
        </div>

        <div class="w-full flex flex-col items-center space-y-10">
            <h2 class="bg-gradient-to-r w-fit from-lime-500 to-emerald-500 bg-clip-text text-transparent text-3xl font-bold">
                Stay Updated
            </h2>
            <p class="text-md max-w-xl font-normal text-gray-400 text-center">
                Subscribe to receive updates about new museum additions, special exhibitions, offers and exclusive cultural events.
            </p>
            <div class="flex items-center gap-5">
                <input 
                    type="email"
                    class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg border-2 border-gray-800 px-4 py-3 pr-20 
                    focus:outline-none hover:border-lime-500 focus:border-emerald-500"
                    placeholder="Enter your email"
                />
                <button 
                    class="bg-gradient-to-br from-lime-500 to-emerald-500 px-5 py-3 rounded-lg text-black
                    hover:from-lime-600 hover:to-emerald-600"
                >
                    Subscribe
                </button>                
            </div>
        </div>

    </div>
</div>