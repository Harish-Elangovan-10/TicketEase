<script lang="ts">
    import { changePassword, updateUserProfile, user } from "$lib/auth";
    import { handleAboutUs, handleHome, handleMuseums, handleSignOut } from "$lib/handleRouting";
    import { startLoading, stopLoading } from "$lib/pageLoading";
    import type { MuseumTicket, UserProfile } from "$lib/types";
    import { Building, Building2, CalendarDays, CircleUserRound, Clock, Eye, EyeClosed, History, Landmark, Lock, LogOut, Mail, MapPin, Phone, Save, Settings, Ticket } from "lucide-svelte";
    import { onMount } from "svelte";
    import DisplayTicket from "$lib/museumTicket.svelte";
    import { showTicket, toggleTicket } from "$lib/handleRouting";
    import toast, { Toaster } from "svelte-french-toast";
    import { sendCancelOTP } from "$lib";

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
			pincode: ''
		},
        tickets: [],
	};

    let currentPass = '';
    let newPass = '';

    let pastTickets: MuseumTicket[] = [];
    let upcommingTickets: MuseumTicket[] = [];
    const currentDate = new Date();

    $: upcommingTickets = userData.tickets.filter(ticket => {
        const ticketDateTime = new Date(`${ticket.date} ${ticket.time}`);
        return ticketDateTime > currentDate;
    });

    $: pastTickets = userData.tickets.filter(ticket => {
        const ticketDateTime = new Date(`${ticket.date} ${ticket.time}`);
        return ticketDateTime <= currentDate;
    });
	
	$: {
		userData.uid = $user?.uid ?? '';
		userData.displayName = $user?.displayName ?? '';
		userData.firstName = $user?.firstName ?? '';
		userData.lastName = $user?.lastName ?? '';
		userData.mobile = $user?.mobile ?? '';
		userData.email = $user?.email ?? '';
		userData.address.line1 = $user?.address.line1 ?? '';
		userData.address.line2 = $user?.address.line2 ?? '';
		userData.address.city = $user?.address.city ?? '';
		userData.address.state = $user?.address.state ?? '';
		userData.address.pincode = $user?.address.pincode ?? '';
        userData.tickets = $user?.tickets ?? [];
	}

    function formatMobile(event: Event) {
		const input = event.target as HTMLInputElement;
		let value = input.value.replace(/\D/g, '');
		value = value.substring(0, 10);
		value = value.replace(/(\d{5})(?=\d)/g, '$1 ');
		userData.mobile = value;
	};
    
    let activeTab = 0;
    
    const setActiveTab = (tab: number) => {
        activeTab = tab;
    };

    const handleUpdate = () => {
        try {
            updateUserProfile(userData);
            toast.success("Profile Updated Successfully!", {
                duration: 5000,
                style: 'border-radius: 10px; background: #2225; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
            });
        } catch (error) {
            stopLoading();
            toast.error("Error Updating Your Profile!", {
                duration: 5000,
                style: 'border-radius: 10px; background: #2225; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
            });
            console.error("Error updating your profile: ", error);
        }
    };

    const handleChangePassword = async () => {
        try {
            startLoading();
            const response = await changePassword(currentPass, newPass);
            if(response.success) {
                stopLoading();
                toast.success(response.message, {
                    duration: 5000,
                    style: 'border-radius: 10px; background: #2225; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
                });
            } else {
                stopLoading();
                toast.error(response.message, {
                    duration: 5000,
                    style: 'border-radius: 10px; background: #2225; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
                });
                throw new Error(response.message);
            }
        } catch (e) {
            console.error("Error updating your password: ", e);
        }
    };

    $: showCurrent = false;
	const toggleCurrent = () => {
		showCurrent = !showCurrent;
	};

	$: showNew = false;
	const toggleNew = () => {
		showNew = !showNew;
	};

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const handleSendOTP = async (ticket: MuseumTicket) => {
		try {
            startLoading();
			if (userData.email && userData.firstName) {
                localStorage.setItem('cancelTicket', JSON.stringify(ticket));
				const response = await sendCancelOTP(userData.email, userData.firstName);

                if (response.success) {
					toast.success('OTP sent successfully!', {
        			    duration: 5000,
        			    style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
        			});
                    window.location.replace('/cancel');
				} else {
					toast.error('Failed to send OTP', {
						duration: 5000,
						style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
					});
					throw new Error(response.message);
				}
			}
		} catch (err) {
            stopLoading();
			console.error("Failed to send OTP: ", err);
		}
	};
</script>

{#if $showTicket}
    <DisplayTicket />
{/if}

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-400">
    <Toaster />
    <div class="mx-12 pt-8">
        <nav class="flex justify-between items-center">
            <div class="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                MuseumPass
            </div>
            <div class="flex items-center space-x-8">
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
                    onclick={handleAboutUs} 
                    class="hover:text-white/90 transition-colors duration-200"
                >
                    About Us
                </button>                
                <button
                    class="text-white/90"
                >
                    Dashboard
                </button>
                <div class="flex items-center space-x-6">
                    <p class="bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent font-semibold transition-all duration-200">
                        Hello, {$user?.firstName}
                    </p>
                    <button
                        class="h-10 w-10 bg-gradient-to-br from-lime-500 to-emerald-500 rounded-full flex 
                        justify-center items-center border-[2px] border-lime-500 text-black font-semibold"
                    >
                        {$user?.firstName[0]}{$user?.lastName[0]}
                    </button>
                </div>
            </div>
        </nav>

        <div class="grid grid-cols-4 gap-10 pt-14 pb-10">
            <div class="col-span-1 h-fit bg-gradient-to-br from-gray-900 to-black pt-10 px-6 rounded-xl border-[2px] border-gray-800 flex flex-col items-start">
                <div class="w-full flex flex-col items-center mb-8">
                    <div 
                        class="h-20 w-20 bg-gradient-to-br from-lime-500 to-emerald-500 rounded-full flex justify-center items-center 
                        border-[2px] border-lime-500 text-2xl text-black font-semibold"
                        >
                        {$user?.firstName[0]}{$user?.lastName[0]}
                    </div>
                    <h1 class="text-2xl text-white/90 font-semibold mt-5">
                        {$user?.displayName}
                    </h1>
                    <h2 class="text-base mt-2">
                        {$user?.email}
                    </h2>
                </div>
                <button 
                    class="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-lg mb-5 bg-gradient-to-br 
                    {activeTab === 0 ? 'from-lime-700/50 to-emerald-700/50 text-white/90' : 'bg-transparent'}"
                    onclick={() => setActiveTab(0)}
                >
                    <Ticket class="h-5 w-5 {activeTab === 0 ? 'text-emerald-500' : 'text-gray-500'}" />
                    <h2>
                        Upcomming Bookings
                    </h2>
                </button>
                <button 
                    class="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-lg mb-5 bg-gradient-to-br 
                    {activeTab === 1 ? 'from-lime-700/50 to-emerald-700/50 text-white/90' : 'bg-transparent'}"
                    onclick={() => setActiveTab(1)}
                >
                    <History class="h-5 w-5 {activeTab === 1 ? 'text-emerald-500' : 'text-gray-500'}" />
                    <h2>
                        Previous Bookings
                    </h2>
                </button>
                <button 
                    class="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-lg bg-gradient-to-br 
                    {activeTab === 2 ? 'from-lime-700/50 to-emerald-700/50 text-white/90' : 'bg-transparent'}"
                    onclick={() => setActiveTab(2)}
                >
                    <Settings class="h-5 w-5 {activeTab === 2 ? 'text-emerald-500' : 'text-gray-500'}" />
                    <h2>
                        Account Settings
                    </h2>
                </button>
                <button
                    class="flex items-center justify-start gap-3 px-3 py-3 text-red-500 mt-10 mb-5 hover:text-red-400 focus:text-red-500"
                    onclick={handleSignOut}
                >
                    <LogOut class="h-5 w-5" />
                    <h2>Sign Out</h2>
                </button>
            </div>
            
            {#if activeTab === 0}
                <div class="col-span-3 bg-gradient-to-br from-gray-900 to-black p-10 rounded-xl border-[2px] border-gray-800">
                    <div class="w-fit h-10 text-3xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                        Upcomming Bookings
                    </div>

                    {#if upcommingTickets.length === 0}
                        <p class="w-full h-full flex items-center justify-center text-lg text-gray-500">
                            Please Book Tickets to see Upcomming Tickets.
                        </p>
                    {:else}
                        <div class="mt-7 flex flex-col items-center gap-5">
                            {#each upcommingTickets as ticket }                            
                                <div class="w-full bg-gradient-to-br from-gray-900 to-gray-950 p-5 rounded-lg border-[2px] border-gray-800">
                                    <div class="flex items-center justify-between mb-3">
                                        <h1 class="text-white/90 text-xl font-bold">
                                            {ticket.name}
                                        </h1>
                                        <p class="text-gray-400 text-base">
                                        <div 
                                            class="bg-gradient-to-br rounded-lg px-3 py-0.5 {(ticket.type === 'Standard') ? "from-cyan-500/25 to-blue-500/25" 
                                            : (ticket.type === 'Premium') ? "from-purple-500/25 to-indigo-500/25" : "from-yellow-500/25 to-amber-500/25"}"
                                        >
                                            <div 
                                                class="bg-gradient-to-br bg-clip-text text-transparent {(ticket.type === 'Standard') ? "from-cyan-400 to-blue-600" 
                                            : (ticket.type === 'Premium') ? "from-purple-400 to-indigo-600" : "from-yellow-400 to-amber-600"}"
                                            >
                                                {ticket.type}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 mb-3">
                                        <CalendarDays class="h-5 w-5 text-lime-500" />
                                        <span class="text-md mr-3">
                                            {formatDate(ticket.date)}
                                        </span>
                                        <Clock class="h-5 w-5 text-lime-500" />
                                        <span class="text-md mr-3">
                                            {ticket.time}
                                        </span>
                                        <Ticket class="h-5 w-5 text-lime-500" />
                                        Booking ID: <span class="text-white/90">
                                            {ticket.id}
                                        </span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <h1 class="w-fit bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent text-xl font-bold">
                                            ₹{ticket.price}
                                        </h1>
                                        <div class="flex items-center gap-5">
                                            <button 
                                                class="self-center w-fit px-3 py-1.5 rounded-lg border-[1.5px] border-gray-400 hover:border-red-500 hover:text-red-500 
                                                focus:border-red-600 focus:text-red-600 transition-all duration-200 text-sm"
                                                onclick={() => handleSendOTP(ticket)}
                                            >
                                                Cancel Booking
                                            </button>
                                            <button 
                                                class="px-3 py-1.5 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600
                                                text-black focus:from-teal-500 focus:to-green-500 transition-all duration-200 text-sm flex items-center gap-2"
                                                onclick={() => toggleTicket(ticket)}
                                            >
                                                <Ticket class="h-5 w-5" strokeWidth={1.5} />
                                                <span>View Ticket</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            {:else if activeTab === 1}
                <div class="col-span-3 bg-gradient-to-br from-gray-900 to-black p-10 rounded-xl border-[2px] border-gray-800">
                    <div class="w-fit h-10 text-3xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                        Previous Bookings
                    </div>

                    {#if upcommingTickets.length === 0}
                        <p class="w-full h-full flex items-center justify-center text-lg text-gray-500">
                            No Previous Bookings Yet.
                        </p>
                    {:else}
                        <div class="mt-7 flex flex-col items-center gap-5">
                            {#each pastTickets as ticket }
                                <div class="w-full bg-gradient-to-br from-gray-900 to-gray-950 p-5 rounded-lg border-[2px] border-gray-800">
                                    <div class="flex items-center justify-between mb-3">
                                        <h1 class="text-white/90 text-xl font-bold">
                                            {ticket.name}
                                        </h1>
                                        <p class="text-gray-400 text-base">
                                        <div class="bg-gray-800/85 rounded-lg px-3 py-1">
                                            <div class="text-gray-400 text-sm">
                                                Visited
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 mb-3">
                                        <CalendarDays class="h-5 w-5 text-gray-600" />
                                        <span class="text-md mr-3">
                                            {formatDate(ticket.date)}
                                        </span>
                                        <Clock class="h-5 w-5 text-gray-600" />
                                        <span class="text-md mr-3">
                                            {ticket.time}
                                        </span>
                                        <Ticket class="h-5 w-5 text-gray-600" />
                                        Booking ID: <span class="text-white/90">
                                            {ticket.id}
                                        </span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <h1 class="text-xl font-bold text-white/90">
                                            ₹{ticket.price}
                                        </h1>
                                        <button 
                                            class="self-center w-fit px-3 py-1.5 rounded-lg border-[1.5px] border-gray-400 hover:border-emerald-500 
                                            hover:text-emerald-500 focus:border-emerald-600 focus:text-emerald-600 transition-all duration-200 text-sm"
                                        >
                                            Write a review
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            {:else if activeTab === 2}
                <div class="col-span-3 bg-gradient-to-br from-gray-900 to-black p-10 rounded-xl border-[2px] border-gray-800 backdrop-blur-sm">
                    <div class="w-fit text-3xl font-bold mb-7 bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                        Account Settings
                    </div>
                    <div class="text-xl font-semibold mb-5 text-white/90">
                        Personal Information
                    </div>
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
							  class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
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
							  class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
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
								  class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
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
								  class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
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
								  class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
								  	border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
								  placeholder="Pincode"
								  required
								/>
							</div>
						</div>
					</div>

                    <div class="flex items-center justify-end border-b-[2px] border-gray-800 pb-7 mb-7">
                        <button 
                            class="mt-7 bg-gradient-to-br from-lime-500 to-emerald-500 rounded-lg px-4 py-2.5 text-base text-black
                            hover:from-lime-600 hover:to-emerald-600 focus:from-cyan-500 focus:to-green-500 flex items-center gap-3"
                            onclick={handleUpdate}
                            >
                            <Save class="h-5 w-5 text-black" />
                            <p>Save Changes</p>
                        </button>
                    </div>

                    <form onsubmit={handleChangePassword}>
                        <div class="text-xl font-semibold mb-5 text-white/90">
                            Change Password
                        </div>
                        <div class="grid grid-cols-5 gap-5 items-center">
                            <div class="col-span-2 relative group input-gradient">
                                <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                                    <Lock class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {currentPass.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                                </div>
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    id="currentPassword"
                                    bind:value={currentPass}
                                    class="block w-full px-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                                    border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent" 
                                    placeholder="Current Password"
                                    required
                                />
                                <button 
                                    type="button"
                                    onclick={toggleCurrent}
                                    class="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointers"
                                >
                                    {#if showCurrent}
                                        <Eye class="w-5 h-5 text-gray-400" />
                                    {:else}
                                        <EyeClosed class="w-5 h-5 text-gray-400" />
                                    {/if}
                                </button>
                            </div>
                            
                            <div class="col-span-2 relative group input-gradient">
                                <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                                    <Lock class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {newPass.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
                                </div>
                                <input
                                    type={showNew ? "text" : "password"}
                                    id="password"
                                    bind:value={newPass}
                                    class="block w-full px-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                                    border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent" 
                                    placeholder="Password"
                                    required
                                />
                                <button 
                                    type="button"
                                    onclick={toggleNew}
                                    class="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointers"
                                >
                                    {#if showNew}
                                        <Eye class="w-5 h-5 text-gray-400" />
                                    {:else}
                                        <EyeClosed class="w-5 h-5 text-gray-400" />
                                    {/if}
                                </button>
                            </div>

                            <button 
                                class="h-fit bg-gradient-to-br from-lime-500 to-emerald-500 rounded-lg px-4 py-2.5 text-base text-black
                                hover:from-lime-600 hover:to-emerald-600 focus:from-cyan-500 focus:to-green-500 flex items-center justify-evenly"
                                type="submit"
                                >
                                <Save class="h-5 w-5 text-black" />
                                <p>Update Password</p>
                            </button>
                        </div>
                    </form>

                </div>
            {/if}
        </div>
    </div>
</div>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>