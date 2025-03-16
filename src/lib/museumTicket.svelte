<script lang="ts">
    import JsBarcode from "jsbarcode";
    import { Clock, CreditCard, PackagePlus, Users, X } from "lucide-svelte";
    import { onMount } from "svelte";
    import { closeTicket } from "./handleRouting";
    
    let value = (Math.random() * 0x10000000000000).toString(36).toUpperCase().slice(0, 8);
    let svg: any;

    onMount(() => {
        JsBarcode(svg, value, {
            format: 'CODE128',
            lineColor: "#99a1af",
            background: "#00000000",
            width: 2,
            height: 50,
            displayValue: false,
            margin: 0,
        });
    });

    const ticketNumber = "TKT-" + value;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${ticketNumber}&bgcolor=030712&color=99a1af`;
</script>

<div class="fixed min-h-screen w-full bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-gray-400 gap-10">
    <button 
        class="bg-gray-700 hover:bg-gray-600 rounded-full p-3 text-gray-400 hover:text-gray-300"
        onclick={closeTicket}
    >
        <X class="h-5 w-5"/>
    </button>
    <div class="relative flex items-center justify-center">
        <img src="./src/assets/ticket.png" alt="Ticket" class="w-4xl h-80 relative">
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div class="w-4xl h-80 p-5 flex items-center justify-between">
                <div class="col-span-5 h-full w-[34rem] flex flex-col items-start py-2 pl-5 pr-3 font-mono">
                    <p class="text-xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent font-sans">
                        MuseumPass
                    </p>
                    <p class="text-2xl font-bold text-white/90 mt-4">
                        Maharaja Ranjit Singh Museum
                    </p>
                    <div class="h-full w-full flex items-start justify-between bg-red-500/0 mt-8">
                        <div class="flex flex-col items-start justify-between h-full pb-5">
                            <div>
                                <div class="flex items-center gap-2.5 mb-2">
                                    <Clock class="h-4 w-4 text-emerald-500"/>
                                    <p class="text-sm bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">Date & Time</p>
                                </div>
                                <p class="text-sm font-bold text-gray-400">25th Dec 2024, 10:00 AM</p>
                            </div>
                            <div>
                                <div class="flex items-center gap-2.5 mb-2">
                                    <PackagePlus class="h-4 w-4 text-emerald-500"/>
                                    <p class="text-sm bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">Package</p>
                                </div>
                                <p class="text-sm font-bold text-gray-400">Audio Guide + Guided Tour</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start justify-between h-full pb-5"> 
                            <div>
                                <div class="flex items-center gap-2.5 mb-2">
                                    <Users class="h-4 w-4 text-emerald-500"/>
                                    <p class="text-sm bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">Visitors</p>
                                </div>
                                <p class="text-sm font-bold text-gray-400">5 Adults, 2 Children</p>
                            </div>
                            <div>
                                <div class="flex items-center gap-2.5 mb-2">
                                    <CreditCard class="h-4 w-4 text-emerald-500"/>
                                    <p class="text-sm bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">Amount</p>
                                </div>
                                <p class="text-sm font-bold text-gray-400">₹2400</p>
                            </div>
                        </div>
                        <div class="h-full flex flex-col items-center justify-end">
                            <p class="text-sm text-gray-400">Scan Here</p>
                            <img 
                                src={qrCode} 
                                alt="Ticket QR Code" 
                                class="w-20 h-20 pb-5 mt-1"
                            />
                        </div>
                    </div>
                </div>
                <div class="h-56 border-r-[2px] border-dashed border-gray-700"></div>
                <div class="col-span-2 h-full w-[12rem] pt-6 pb-16 flex flex-col items-center justify-between -rotate-90">
                    <div class="flex flex-col items-start">
                        <p class="text-sm pl-2 font-mono pb-1">
                            {ticketNumber}
                        </p>
                        <p class="text-5xl font-bold bg-gradient-to-r from-violet-400 to-indigo-600 bg-clip-text text-transparent">
                            PREMIUM TICKET
                        </p>
                    </div>
                    <svg bind:this={svg}></svg>
                </div>
            </div>
        </div>
    </div>
    <button 
        class="bg-gradient-to-br from-lime-500 to-emerald-500 py-3 px-6 text-black font-semibold 
        rounded-lg hover:from-lime-600 hover:to-emerald-600 transition-colors duration-300"
    >
        Print Ticket
    </button>
</div>
