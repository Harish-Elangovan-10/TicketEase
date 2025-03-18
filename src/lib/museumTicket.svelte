<script lang="ts">
    import JsBarcode from "jsbarcode";
    import { Clock, CreditCard, PackagePlus, Users, X } from "lucide-svelte";
    import { onMount } from "svelte";
    import { closeTicket } from "./handleRouting";
    import type { MuseumTicket } from "./types";

    let svg: SVGSVGElement | null = null;
    let parsedTicket: MuseumTicket | null = null;
    let ticketID: string = "";
    let qrCode: string = "";

    onMount(() => {
        const currentTicket = localStorage.getItem("viewTicket");

        if (!currentTicket) return;

        try {
            parsedTicket = JSON.parse(currentTicket) as MuseumTicket;

            if (!parsedTicket || !parsedTicket.id) return;

            ticketID = parsedTicket.id;
            qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${ticketID}&bgcolor=030712&color=99a1af`;

            if (svg) {
                JsBarcode(svg, ticketID.slice(4), {
                    format: "CODE128",
                    lineColor: "#99a1af",
                    background: "#00000000",
                    width: 2,
                    height: 50,
                    displayValue: false,
                    margin: 0,
                });
            }
        } catch (error) {
            console.error("Error parsing ticket data:", error);
        }
    });

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    $: adultCount = parsedTicket?.adults ?? 1;
    $: kidCount = parsedTicket?.kids ?? 0;
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
                        {parsedTicket?.name}
                    </p>
                    <div class="h-full w-full flex items-start justify-between bg-red-500/0 mt-8">
                        <div class="flex flex-col items-start justify-between h-full pb-5">
                            <div>
                                <div class="flex items-center gap-2.5 mb-2">
                                    <Clock class="h-4 w-4 text-emerald-500"/>
                                    <p class="text-sm bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">Date & Time</p>
                                </div>
                                <p class="text-sm font-bold text-gray-400">{formatDate(parsedTicket?.date ?? '2020-01-01')} - {parsedTicket?.time}</p>
                            </div>
                            <div>
                                <div class="flex items-center gap-2.5 mb-2">
                                    <PackagePlus class="h-4 w-4 text-emerald-500"/>
                                    <p class="text-sm bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">Package</p>
                                </div>
                                <p class="text-sm font-bold text-gray-400">
                                    {#if parsedTicket?.guide && parsedTicket?.audio}
                                        Guided Tour + Audio Guide
                                    {:else if parsedTicket?.guide && !parsedTicket?.audio}
                                        Guided Tour
                                    {:else if !parsedTicket?.guide && parsedTicket?.audio}
                                        Audio Guide
                                    {:else}
                                        None
                                    {/if}
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start justify-between h-full pb-5"> 
                            <div>
                                <div class="flex items-center gap-2.5 mb-2">
                                    <Users class="h-4 w-4 text-emerald-500"/>
                                    <p class="text-sm bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">Visitors</p>
                                </div>
                                <p class="text-sm font-bold text-gray-400">
                                    { adultCount } { adultCount > 1 ? 'Adults' : 'Adult' }{#if kidCount != 0}, 
                                    { kidCount } { kidCount > 1 ? 'Kids' : 'Kid' }
                                    {/if}
                                </p>
                            </div>
                            <div>
                                <div class="flex items-center gap-2.5 mb-2">
                                    <CreditCard class="h-4 w-4 text-emerald-500"/>
                                    <p class="text-sm bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">Amount</p>
                                </div>
                                <p class="text-sm font-bold text-gray-400">₹{parsedTicket?.price}</p>
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
                            {parsedTicket?.id}
                        </p>
                        <p 
                            class="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent 
                            {(parsedTicket?.type === 'Standard') ? "from-cyan-400 to-blue-600" 
                            : (parsedTicket?.type === 'Premium') ? "from-purple-400 to-indigo-600" 
                            : "from-yellow-400 to-amber-600"}"
                        >
                            {parsedTicket?.type.toUpperCase()} TICKET
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
