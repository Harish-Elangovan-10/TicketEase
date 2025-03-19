<script lang="ts">
	import { 
		Mail, 
		Building, 
		Landmark, 
		Building2, 
		CircleUserRound, 
		Phone, 
		MapPin, 
		NotebookTabs, 
		Tickets, 
		CalendarDays, 
		PersonStanding, 
		PackagePlus, 
		CreditCard, 
		LockKeyhole, 
		Wallet, 
        Ticket,
        Clock,
        Users,
        Languages,
        LaptopMinimalCheck
	} from "lucide-svelte";
    import type { MuseumTicket, UserProfile } from "$lib/types";
    import { user } from "$lib/auth";
    import type { Museum } from "$lib/accessData";
    import { handleBooking } from "$lib/ticketing";
    import { sendOTP } from "$lib";
    import toast, { Toaster } from "svelte-french-toast";
    import { startLoading, stopLoading } from "$lib/pageLoading";

	export let data: { museum: Museum | null };
    let museum = data.museum;

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

	let selectedTicket: { type: string; price: number; benefits: string[]; } | null = null;
	let selectedDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
	let selectedTime = '';
	let adults = 1;
	let kids = 0;
	let guide = false;
	let audio = false;
	let selectedLang = "English";
	let selectedCard = '';
	let cardNumber = '';
	let expiryDate = '';
	let cvv = '';
	let termsAccepted = false;

	const selectTicket = (ticket: any) => {
		selectedTicket = ticket;
	};

	const setTime = (time: string) => {
		selectedTime = time;
	};

	const incrementAdult = () => {
		if (adults < 10) adults++;
	};

	const decrementAdult = () => {
		if (adults > 1) adults--;
	};

	const incrementChild = () => {
		if (kids < 10) kids++;
	};

	const decrementChild = () => {
		if (kids > 0) kids--;
	};

	const setGuide = () => { guide = !guide };

	const setAudio = () => { audio = !audio };

	const selectLang = (lang: string) => {
		selectedLang = lang;
	};

	const selectPayment = (method: string) => {
		selectedCard = method;
	};

	function formatMobile(event: Event) {
		const input = event.target as HTMLInputElement;
		let value = input.value.replace(/\D/g, '');
		value = value.substring(0, 10);
		value = value.replace(/(\d{5})(?=\d)/g, '$1 ');
		userData.mobile = value;
	};

	function formatCardNumber(event: Event) {
    	const input = event.target as HTMLInputElement;
    	let value = input.value.replace(/\D/g, '');
    	value = value.substring(0, 16);
    	value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    	cardNumber = value;
  	};

	function formatExpiryDate(event: Event) {
    	const input = event.target as HTMLInputElement;
    	let value = input.value.replace(/\D/g, '');
    	value = value.substring(0, 4);
    	if (value.length > 2) {
    	  value = value.substring(0, 2) + '/' + value.substring(2);
    	}
    	expiryDate = value;
  	};

	const tickets = [
		{
			type: "Standard",
			price: museum?.price,
			description: 'Experience our essential museum offerings',
			benefits: [
				'General museum access', 
				'Access to permanent exhibitions',
				'Free locker facility',
				'Free wifi access',
			],
		},
		{
			type: "Premium",
			price: (museum?.price ?? 0) + 100,
			description: 'Elevate your experience with exclusive benefits',
			benefits: [
				'All Standard benifits',
				'Access to special exhibitions',
				'Priority entry',
				'Museum guidebook',
			],
		},
		{
			type: "Elite",
			price: (museum?.price ?? 0) + 300,
			description: 'Experience luxury with exclusive VIP perks',
			benefits: [
				'All Premium benefits',
      			'Exclusive VIP lounge access',
      			'Complimentary refreshments',
      			'Private curator tour',
			],
		},
	];

	const timeSlots = [
    	"09:00 AM",
    	"10:00 AM",
    	"11:00 AM",
    	"12:00 PM",
    	"01:00 PM",
    	"02:00 PM",
    	"03:00 PM",
		"04:00 PM",
		"05:00 PM",
		"06:00 PM",
  	];

	const languages = [
		"English",
		"தமிழ்",
		"മലയാളം",
		"ಕನ್ನಡ",
		"తెలుగు",
		"हिन्दी",
	];

	const cards = [
		{
			type: 'Credit Card',
			image: '../src/assets/mastercard.jpg',
		},
		{
			type: 'Debit Card',
			image: '../src/assets/visa.jpg',
		},
	];
	
	let ticketPrice = 0;
	let subtotal = 0;
	let discount = 0;
	let total = 0;

	$: {
		ticketPrice = (adults * (selectedTicket ? selectedTicket.price : 0)) + ((kids > 0) ? kids * (selectedTicket ? selectedTicket.price / 2 : 0) : 0);
		subtotal = (guide ? 500 : 0) + (audio ? 200 : 0) + ticketPrice;
		discount = (selectedCard === 'Credit Card' ? subtotal * 0.05 : 0);
		total = subtotal - discount;
	};

	const handleSubmit = async () => {
		const bookingID = 'TKT-' + (Math.random() * 0x10000000000000).toString(36).toUpperCase().slice(0, 8);

		let ticket: MuseumTicket = {
			id: bookingID,
			name: museum?.title ?? 'Museum',
			type: selectedTicket?.type ?? 'Standard',
			date: selectedDate,
			time: selectedTime,
			adults: adults,
			kids: kids,
			guide: guide,
			audio: audio,
			price: total,
		};

		try {
			startLoading();
			if (userData.email) {
				const response = await sendOTP(userData.email, userData.firstName);
				
				if (response.success) {
					toast.success('OTP sent successfully!', {
        			    duration: 5000,
        			    style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
        			});
					handleBooking(ticket);
				} else {
					toast.error('Failed to send OTP', {
						duration: 5000,
						style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
					});
					throw new Error(response.message);
				}
			}
		} catch (error) {
			stopLoading();
			console.error("Error sending OTP: ", error);
		}
	};
</script>

<svelte:head>
	<title>Book Your Visit</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 text-gray-400">
	<Toaster />
	<form onsubmit={handleSubmit}>
		<div class="max-w-7xl mx-auto mb-10">
			<div class="flex flex-col items-center mt-20 mb-16">
				<h1 class="w-fit text-4xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
					Book Your Museum Visit
				</h1>
				<p class="text-lg mt-8">
					Select your tickets, choose your time and immerse yourself in culture
				</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
				<div class="lg:col-span-2 space-y-5">

					<!-- Personal Information -->
					<div class="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border-[2px] border-gray-800 backdrop-blur-sm">
						<div class="flex items-center justify-start gap-5 mb-5">
							<NotebookTabs class="h-7 w-7 text-white/90" strokeWidth = {1.75} />
							<h1 class="w-fit text-2xl font-semibold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
								Personal Information
							</h1>
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
					</div>

					<!-- Ticket Details -->
					<div class="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border-[2px] border-gray-800">
						<div class="flex items-center justify-start gap-5 mb-5">
							<Tickets class="h-7 w-7 text-white/90" strokeWidth = {1.75} />
							<h1 class="w-fit text-2xl font-semibold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
								Select Your Ticket
							</h1>
						</div>
						
						<div class="space-y-5">
							{#each tickets as ticket}
								<button
									type="button" 
									class="w-full rounded-xl bg-gradient-to-r p-[2px] transition-all duration-200 
									{selectedTicket === ticket ? 
									(ticket.type === "Elite" ? 'from-yellow-400 to-amber-600' : 
									ticket.type === "Premium" ? 'from-purple-400 to-indigo-600' : 
									'from-cyan-400 to-blue-600') : 'from-gray-800 to-gray-800 hover:from-lime-700 hover:to-emerald-700'}"
									onclick={() => selectTicket(ticket)}
								>
									<div 
										class="px-8 py-5 rounded-xl bg-gradient-to-br {selectedTicket === ticket ? "from-gray-900 to-black" : "from-gray-900 to-gray-950"} 
										hover:from-gray-900 hover:to-black transition-all duration-200"
									>
										{#if selectedTicket === ticket}
											<div class="flex flex-col items-start space-y-2">
												<div class="flex w-full items-center justify-between mb-3">
													<h3 class="font-medium text-xl bg-clip-text text-transparent bg-gradient-to-r 
														{ ticket.type === "Elite" ? 'from-yellow-400 to-amber-600' : 
														ticket.type === "Premium" ? 'from-violet-400 to-indigo-600' : 
														'from-cyan-400 to-blue-600' }"
													>
														{ticket.type}
													</h3>
													<p class="font-semibold text-xl bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
														₹{ticket.price}
													</p>
												</div>

												{#each ticket.benefits as benefit}
													<li class="flex items-center text-sm">
														<span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
														{benefit}
													</li>
												{/each}
											</div>
										{:else}
											<div class="flex items-center justify-between">
												<div class="flex flex-col items-start space-y-2.5">
													<h3 class="font-medium text-xl bg-clip-text text-transparent bg-gradient-to-r 
														{ ticket.type === "Elite" ? 'from-yellow-400 to-amber-600' : 
														ticket.type === "Premium" ? 'from-violet-400 to-indigo-600' : 
														'from-cyan-400 to-blue-600' }"
													>
														{ticket.type}
													</h3>
													<p class="text-gray-400 text-md">
														{ticket.description}
													</p>
												</div>
												<p class="font-semibold text-xl bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
													₹{ticket.price}
												</p>
											</div>
										{/if}
									</div>
								</button>
							{/each}
						</div>
					</div>

					<!-- Slot Details -->
					<div class="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border-[2px] border-gray-800">
						<div class="flex items-center justify-start gap-5 mb-5">
							<CalendarDays class="h-7 w-7 text-white/90" strokeWidth = {1.75} />
							<h1 class="w-fit text-2xl font-semibold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
								Select Your Slot
							</h1>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-6 gap-8">
							<div class="md:col-span-2 h-fit p-[2px] rounded-xl bg-gradient-to-br from-gray-800 to-gray-800 hover:from-lime-600 hover:to-emerald-600">
								<input 
									type="date"
									bind:value={selectedDate}
									min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]}
									max="2050-12-31"
									class="w-full py-3 px-4 pl-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-950 text-gray-400 placeholder-gray-500 focus:outline-none transition-all duration-200"
								/>
							</div>

							<div class="md:col-span-4 grid grid-cols-4 gap-4">
								{#each timeSlots as time}
									<button 
										type="button"
										class="w-full p-3 rounded-xl bg-gradient-to-br border-[2px] transition-all duration-200
										{selectedTime === time ? 'from-lime-500 to-emerald-500 text-black border-lime-500' : 
										'from-gray-900 to-gray-950 hover:from-lime-600 hover:to-emerald-600 hover:text-black border-gray-800'}"
										onclick={() => setTime(time)}
									>
										{time}
									</button>
								{/each}
							</div>
						</div>
					</div>

					<!-- Number of Visitors -->
					<div class="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border-[2px] border-gray-800">
						<div class="flex items-center justify-start gap-5 mb-5">
							<PersonStanding class="h-7 w-7 text-white/90" strokeWidth = {2} />
							<h1 class="w-fit text-2xl font-semibold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
								Number of Visitors
							</h1>
						</div>

						<div class="grid grid-cols-2">
							<div class="flex flex-col items-start gap-5">
								<p class="text-lg font-semibold">
									Adult
								</p>
								<div class="flex items-center justify-start gap-10">
									<button
										type="button"
										class="h-12 w-12 text-xl rounded-xl transition-all duration-200 border-[2px] border-gray-800
										bg-gradient-to-br from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-900 font-bold pb-1"
										onclick={decrementAdult}
									>
										-
									</button>
									<div class="flex items-center justify-center w-20 py-4 bg-gradient-to-br from-gray-900 to-gray-950 border-[2px] border-gray-800 rounded-lg">
										<p class="bg-gradient-to-b from-lime-500 to-emerald-500 bg-clip-text text-transparent text-xl font-bold">
											{adults}
										</p>
									</div>
									<button
										type="button"
										class="h-12 w-12 text-xl rounded-xl transition-all duration-200 border-[2px] border-gray-800
										bg-gradient-to-br from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-900 font-bold pb-1"
										onclick={incrementAdult}
									>
										+
									</button>
								</div>
							</div>
							
							<div class="flex flex-col items-start gap-5">
								<p class="text-lg font-semibold">
									Children
								</p>
								<div class="flex items-center justify-start gap-10">
									<button
										type="button"
										class="h-12 w-12 text-xl rounded-xl transition-all duration-200 border-[2px] border-gray-800
										bg-gradient-to-br from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-900 font-bold pb-1"
										onclick={decrementChild}
									>
										-
									</button>
									<div class="flex items-center justify-center w-20 py-4 bg-gradient-to-br from-gray-900 to-gray-950 border-[2px] border-gray-800 rounded-lg">
										<p class="bg-gradient-to-b from-lime-500 to-emerald-500 bg-clip-text text-transparent text-xl font-bold">
											{kids}
										</p>
									</div>
									<button
										type="button"
										class="h-12 w-12 text-xl rounded-xl transition-all duration-200 border-[2px] border-gray-800
										bg-gradient-to-br from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-900 font-bold pb-1"
										onclick={incrementChild}
									>
										+
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Additional Packages -->
					<div class="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border-[2px] border-gray-800">
						<div class="flex items-center justify-start gap-5 mb-5">
							<PackagePlus class="h-7 w-7 text-white/90" strokeWidth = {1.75} />
							<h1 class="w-fit text-2xl font-semibold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
								Additional Packages
							</h1>
						</div>

						<div class="grid grid-cols-2 gap-5">
							<button 
								type="button"
								class="w-full rounded-xl bg-gradient-to-r p-[2px] transition-all duration-200 
								{guide ? 'from-pink-500 to-rose-500' : 'from-gray-800 to-gray-800 hover:from-lime-700 hover:to-emerald-700'}"
								onclick={setGuide}
							>
								<div 
									class="px-7 py-5 rounded-xl bg-gradient-to-br {guide ? "from-gray-900 to-black" : "from-gray-900 to-gray-950"} 
									hover:from-gray-900 hover:to-black transition-all duration-200 flex items-center justify-between"
								>
									<div class="flex flex-col items-start space-y-2.5">
										<h3 class="font-medium text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500"
										>
											Guided Tour
										</h3>
										<p class="text-gray-400 text-sm">
											Expert guide for complete tour
										</p>
									</div>
									<p class="font-semibold text-xl bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
										+ ₹500
									</p>							
								</div>
							</button>
							
							<button 
								type="button"
								class="w-full rounded-xl bg-gradient-to-r p-[2px] transition-all duration-200 
								{audio ? 'from-sky-500 to-indigo-500' : 'from-gray-800 to-gray-800 hover:from-lime-700 hover:to-emerald-700'}"
								onclick={setAudio}
							>
								<div 
									class="px-7 py-5 rounded-xl bg-gradient-to-br {audio ? "from-gray-900 to-black" : "from-gray-900 to-gray-950"} 
									hover:from-gray-900 hover:to-black transition-all duration-200 flex items-center justify-between"
								>
									<div class="flex flex-col items-start space-y-2.5">
										<h3 class="font-medium text-xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500"
										>
											Audio Guide
										</h3>
										<p class="text-gray-400 text-sm">
											Self-guided museum experience
										</p>
									</div>
									<p class="font-semibold text-xl bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
										+ ₹200
									</p>							
								</div>
							</button>
						</div>

						{#if guide || audio}
							<p class="text-lg font-semibold mt-5">
								Select Language
							</p>
							<div class="grid grid-cols-6 gap-5 mt-5">
								{#each languages as language}
									<button 
										type="button"
										class="w-full rounded-xl bg-gradient-to-r p-[2px] transition-all duration-200 
										{selectedLang === language ? 'from-lime-500 to-emerald-500' : 'from-gray-800 to-gray-800 hover:from-lime-700 hover:to-emerald-700'}"
										onclick={() => selectLang(language)}
									>
										<div 
											class="py-4 rounded-xl bg-gradient-to-br {selectedLang === language ? "from-gray-900 to-black" : "from-gray-900 to-gray-950"} 
											hover:from-gray-900 hover:to-black transition-all duration-200 text-center text-md"
										>
											{language}
										</div>
									</button>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Payment Methods -->
					<div class="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border-[2px] border-gray-800">
						<div class="flex items-center justify-start gap-5">
							<Wallet class="h-7 w-7 text-white/90" strokeWidth = {1.75} />
							<h1 class="w-fit pb-1 text-2xl font-semibold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
								Select Payment Method
							</h1>
						</div>

						<p class="text-sm mt-4 mb-6 text-gray-400">
							Get an exclusive <span class="text-emerald-400">5%</span> discount with <span class="text-emerald-400">credit card</span> payment
						</p>

						<div class="flex items-center gap-5">
							{#each cards as card}
								<button 
									type="button"
									class="bg-gradient-to-br p-[2px] rounded-xl {selectedCard === card.type ? 'from-lime-500 to-emerald-500' : 
									'from-gray-800 to-gray-800 hover:from-lime-700 hover:to-emerald-700' }"
									onclick={() => selectPayment(card.type)}
								>
									<div 
										class="h-full bg-gradient-to-br {selectedCard === card.type ? 'from-gray-900 to-black' : 'from-gray-900 to-gray-950' }
										px-2 py-2 rounded-xl flex items-center gap-2"
									>
										<img src={card.image} alt={card.type} class="h-12 w-16 rounded-lg" />
										<p class="text-sm text-center font-semibold">{card.type}</p>
									</div>
								</button>							
							{/each}
						</div>

						{#if selectedCard}
							<div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-5 backdrop-blur-sm">
								<div class="relative group input-gradient md:col-span-2">
									<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
										<CreditCard class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {cardNumber.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
									</div>
									<input
									type="text"
									bind:value={cardNumber}
									oninput={formatCardNumber}
									class="block w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
											border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
									placeholder="Card Number"
									required
									/>
								</div>

								<div class="relative group input-gradient">
									<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
										<CalendarDays class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {expiryDate.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
									</div>
									<input
									type="text"
									bind:value={expiryDate}
									oninput={formatExpiryDate}
									class="block w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
											border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
									placeholder="MM/YY"
									required
									/>
								</div>

								<div class="relative group input-gradient">
									<div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
										<LockKeyhole class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {cvv.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
									</div>
									<input
									type="password"
									bind:value={cvv}
									maxlength="3"
									class="block w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
											border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
									placeholder="CVV"
									required
									/>
								</div>
							</div>
						{/if}
					</div>

					<div class="flex items-center space-x-3 mt-10">
						<input
						type="checkbox"
						id="terms"
						bind:checked={termsAccepted}
						class="w-6 h-6 transition-all duration-300"
						/>
						<label for="terms" class="text-md">
							<!-- svelte-ignore a11y_invalid_attribute -->
							I agree to the museum's <a href="#" class="text-emerald-400 hover:text-emerald-300">terms and conditions</a> and acknowledge that my booking is subject to these policies.
						</label>
					</div>
				</div>
				
				<div class="lg:col-span-1">
					<!-- Order Summary -->
					<div class="sticky top-5 bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border-[2px] border-gray-800 text-gray-400 space-y-5">
						<div class="flex items-center justify-start gap-5">
							<h1 class="w-fit text-2xl font-semibold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
								Order Summary
							</h1>
						</div>

						<div class="border-b-[2px] border-gray-800 px-1 pb-5 space-y-4">
							<div class="flex items-center gap-2.5">
								<Landmark class="h-5 w-5 text-emerald-400" />
								<p class="text-white/90">
									{museum?.title}
								</p>
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2.5">
									<Ticket class="h-5 w-5 text-emerald-400" />
									<p class="text-white/90">Ticket</p>
								</div>
								<p class="font-mono text-[0.9rem]">
									{ selectedTicket ? selectedTicket.type : 'None' }
								</p>
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2.5">
									<CalendarDays class="h-5 w-5 text-emerald-400" />
									<p class="text-white/90">Date</p>
								</div>
								<p class="font-mono text-[0.9rem]">
									{new Date(selectedDate).toLocaleDateString('en-GB').replace(/\//g, '-')}
								</p>
							</div>
							
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2.5">
									<Clock class="h-5 w-5 text-emerald-400" />
									<p class="text-white/90">Time</p>
								</div>
								<p class="font-mono text-[0.9rem]">
									{ selectedTime || 'None' }
								</p>
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2.5">
									<Users class="h-5 w-5 text-emerald-400" />
									<p class="text-white/90">Visitors</p>
								</div>
								<p class="font-mono text-[0.9rem]">
									{ adults } { adults > 1 ? 'Adults' : 'Adult' }, { kids } { kids > 1 ? 'Kids' : 'Kid' }
								</p>
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2.5">
									<CreditCard class="h-5 w-5 text-emerald-400" />
									<p class="text-white/90">Payment Method</p>
								</div>
								<p class="font-mono text-[0.9rem]">
									{ selectedCard || 'None' }
								</p>
							</div>

							{#if guide || audio}
								<div class="flex items-start justify-between">
									<div class="flex items-center gap-2.5">
										<PackagePlus class="h-5 w-5 text-emerald-400" />
										<p class="text-white/90">Packages</p>
									</div>
									<div class="flex flex-col items-end pt-1 space-y-1">
										{#if guide}
											<p class="font-mono text-[0.9rem]">Guided Tour</p>
										{/if}
										{#if audio}
											<p class="font-mono text-[0.9rem]">Audio Guide</p>
										{/if}
									</div>
								</div>

								<div class="flex items-center justify-between">
									<div class="flex items-center gap-2.5">
										<Languages class="h-5 w-5 text-emerald-400" />
										<p class="text-white/90">Language</p>
									</div>
									<p class="font-mono text-[0.9rem]">{ selectedLang }</p>
								</div>
							{/if}
						</div>						

						<div class="border-b-[2px] border-gray-800 px-2 pb-5 space-y-4">
							<div class="flex items-start justify-between">
								<p class="text-white/90 font-semibold">Ticket Price</p>
								<div class="flex flex-col items-end pt-1 space-y-1">
									<p class="font-mono text-[0.9rem]">{ adults } x ₹{ selectedTicket?.price || 0 }</p>
									{#if kids > 0}
										<p class="font-mono text-[0.9rem]">{ kids } x ₹{ (selectedTicket?.price ?? 0) / 2 || 0 }</p>
									{/if}
								</div>
							</div>

							{#if guide || audio}
								<div class="flex items-start justify-between">
									<p class="text-white/90 font-semibold">Additional Packages</p>
									<p class="font-mono text-[0.9rem]">₹{ (guide && audio) ? 700 : guide ? 500 : 200 }</p>
								</div>
							{/if}

							{#if selectedCard === 'Credit Card'}
								<div class="flex items-center justify-between">
									<div class="flex items-center space-x-2">
									<p class="text-white/90 font-semibold">Discount</p>
									<span class="px-2 py-1 text-xs rounded-full bg-gradient-to-br from-lime-500/50 to-emerald-500/50 text-emerald-500">
										SAVE 5%
									</span>
									</div>
									<p class="font-mono text-lime-500">-₹{ discount }</p>
								</div>
							{/if}

							<div class="flex items-center justify-between">
								<p class="text-2xl font-bold text-white">Total</p>
								<p class="text-2xl font-mono font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
								₹{ total }
								</p>
							</div>
						</div>

						<button 
							type="submit"
							class="w-full mt-2 py-4 px-6 rounded-lg font-semibold bg-gradient-to-r from-lime-400 to-emerald-400 
							text-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 justify-center"
							disabled={!selectedTicket || !selectedTime || !selectedCard || !termsAccepted}
						>
							<LaptopMinimalCheck />
							<p>Proceed to Payment</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>