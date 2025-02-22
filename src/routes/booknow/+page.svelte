<script lang="ts">
	import { CalendarDays, Ticket, Users } from "lucide-svelte";

	let selectedDate = new Date().toISOString().split("T")[0];
	let selectedTicket: { name: string; description: string; price: number; } | null = null;
	let selectedTime = "";
	let visitors = 1;

	const tickets = [
    	{
    	  	name: "Standard",
    	  	description: "Basic museum entry with audio guide",
    	  	price: 200,
    	},
		{
			  name: "VIP",
			  description: "Exclusive access to special exhibitions",
			  price: 500,
		},
    	{
    	  	name: "Premium",
    	  	description: "Enhanced experience with guided tour",
    	  	price: 1000,
    	},
  	];

	const timeSlots = [
    	"09:00 AM",
    	"10:00 AM",
    	"11:00 AM",
    	"12:00 PM",
    	"02:00 PM",
    	"03:00 PM",
		"04:00 PM",
  	];

	const selectTicket = (ticket: any) => {
		selectedTicket = ticket;
	};

	const setTime = (time: string) => {
		selectedTime = time;
	};

	const increment = () => {
		if(visitors < 10) {
			visitors++;
		}
	};

	const decrement = () => {
		if(visitors > 1) {
			visitors--;
		}
	};

	$: total = selectedTicket ? selectedTicket.price * visitors : 0;
</script>

<div class="min-h-screen text-gray-400 bg-gradient-to-br from-gray-900 to-black p-4">
	<div class="max-w-7xl mx-auto mb-10">
		<div class="w-full flex items-center justify-center pt-24 pb-16">
			<h1 class="text-4xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
				Book Your Museum Visit
			</h1>
		</div>

		<p class="mb-16 text-center text-xl font-normal">
			Select your tickets, choose your time and immerse yourself in culture.
		</p>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<div class="lg:col-span-2 space-y-7">

				<div class="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800">
					<div class="flex items-center gap-5 mb-7">
						<Ticket class="h-9 w-9 text-white/90" />
						<h2 class="text-2xl font-semibold text-white/90">
							Select Ticket Category
						</h2>
					</div>

					<div class="space-y-5">
						{#each tickets as ticket}
							<button class="w-full rounded-xl bg-gradient-to-br p-[2px] transition-all duration-200 
							{selectedTicket === ticket ? 'from-lime-500 to-emerald-500' : 'from-gray-800 to-gray-800 hover:from-lime-700 hover:to-emerald-700'}"
							onclick={() => selectTicket(ticket)}>
								<div class="p-8 rounded-xl bg-gradient-to-br {selectedTicket === ticket ? "from-gray-900 to-black" : "from-gray-900 to-gray-950"} 
								hover:from-gray-900 hover:to-black transition-all duration-200">
									<div class="flex items-center justify-between">
										<div class="flex flex-col items-start space-y-3">
											<h3 class="font-medium text-xl bg-clip-text text-transparent bg-gradient-to-r 
											{ ticket.name === "VIP" ? 'from-yellow-400 to-amber-600' : 
											ticket.name === "Premium" ? 'from-purple-400 to-indigo-600' : 
											'from-cyan-400 to-blue-600' }">
												{ticket.name}
											</h3>
											<p class="text-gray-400">
												{ticket.description}
											</p>
										</div>
										<p class="font-semibold text-xl bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
											₹{ticket.price}
										</p>
									</div>
								</div>
							</button>
						{/each}
					</div>
				</div>

				<div class="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800">
					<div class="flex items-center gap-5 mb-7">
						<CalendarDays class="h-8 w-8 text-white/90" />
						<h2 class="text-2xl font-semibold text-white/90">
							Select Date & Time
						</h2>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div class="h-fit p-[2px] rounded-xl bg-gradient-to-br from-gray-800 to-gray-800 hover:from-lime-600 hover:to-emerald-600">
							<input 
								type="date"
								bind:value={selectedDate}
								min={new Date().toISOString().split("T")[0]}
								max="2050-12-31"
								class="w-full p-4 pl-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-950 text-gray-400 placeholder-gray-500 focus:outline-none transition-all duration-200"
							/>
						</div>

						<div class="grid grid-cols-3 gap-4">
							{#each timeSlots as time}
								<button class="w-full p-4 rounded-xl bg-gradient-to-br border-[2px] border-gray-800 transition-all duration-200
								{selectedTime === time ? 'from-lime-500 to-emerald-500 text-black' : 
								'from-gray-900 to-gray-950 hover:from-lime-600 hover:to-emerald-600 hover:text-black'}"
								onclick={() => setTime(time)}>
									{time}
								</button>
							{/each}
						</div>
					</div>
				</div>

				<div class="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800">
					<div class="flex items-center gap-5 mb-7">	
						<Users class="h-8 w-8 text-white/90" />
						<h2 class="text-2xl font-semibold text-white/90">
							Number of Visitors
						</h2>
					</div>

					<div class="flex items-center justify-start gap-10 mt-10">
						<button
                			class="h-12 w-12 text-xl rounded-full transition-all duration-200 border-[1.5px] border-gray-800
                       		bg-gradient-to-br from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-900 font-bold pb-1"
							onclick={decrement}
              			>
                			-
              			</button>
			  			<div class="flex items-center justify-center w-20 py-4 bg-gradient-to-br from-gray-900 to-gray-950 border-[1.5px] border-gray-800 rounded-lg">
							<p class="bg-gradient-to-b from-lime-500 to-emerald-500 bg-clip-text text-transparent text-xl font-bold">
								{visitors}
							</p>
						</div>
						<button
              			  	class="h-12 w-12 text-xl rounded-full transition-all duration-200 border-[1.5px] border-gray-800
                       		bg-gradient-to-br from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-900 font-bold pb-1"
							onclick={increment}
              			>
                			+
              			</button>
					</div>
				</div>
			</div>

			<div class="lg:col-span-1">
				<div class="sticky top-4 bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800">
					<h2 class="text-2xl font-semibold text-white/90 mb-6">
						Order Summary
					</h2>
					<div class="space-y-6">
						<div class="flex justify-between items-center px-1">
							<p class="text-gray-400">Category</p>
							<p class="text-white/90 font-medium">{ selectedTicket ? selectedTicket.name : "None" }</p>
						</div>
						<div class="flex justify-between items-center px-1">
							<p class="text-gray-400">Visitors</p>
							<p class="text-white/90 font-medium">{ visitors }</p>
						</div>
						<div class="flex justify-between items-center px-1">
							<p class="text-gray-400">Date</p>
							<p class="text-white/90 font-medium">{ selectedDate || "None" }</p>
						</div>
						<div class="flex justify-between items-center px-1">
							<p class="text-gray-400">Time</p>
							<p class="text-white/90 font-medium">{ selectedTime || "None" }</p>
						</div>

						<div class="pt-5 mt-5 border-t-[2px] border-gray-800">
							<div class="flex items-center justify-between px-1">
								<p class="text-gray-400">Total Amount</p>
								<p class="text-xl font-semibold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">₹{total}</p>
							</div>
						</div>

						<button 
            			  	class="w-full mt-2 py-4 px-6 rounded-lg font-semibold bg-gradient-to-r from-lime-400 to-emerald-400 
            			  	text-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            			  	disabled={!selectedTicket || !selectedTime}
            			>
            			  	Proceed to Payment
            			</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>