<script lang="ts">
    import { ArrowBigUpDash, Bot, Minimize } from "lucide-svelte";
    import { spring } from "svelte/motion";
    import { fade } from "svelte/transition";
    import { user } from "./auth";

    const dimensions = spring({ width: 56, height: 56, radius: 28 });
    let isOpen = false;

    $: if (isOpen) {
        setTimeout(() => {
            scrollToBottom();
        }, 200);
    }
    

    const toggleChatBot = () => {
        isOpen = !isOpen;

        if (isOpen) {
            dimensions.set({ width: 400, height: 620, radius: 12 });
            // scrollToBottom();
        } else {
            dimensions.set({ width: 56, height: 56, radius: 28 });
        }
    };

    const handleClose = (e: any) => {
        e.stopPropagation();
        toggleChatBot();
    };

    const scrollToBottom = () => {
        const chatDiv = document.querySelector('.chat-container');
        chatDiv?.scrollTo({ top: chatDiv.scrollHeight, behavior: 'smooth' });
    };
</script>

<div 
    class="fixed bottom-5 right-5 bg-gradient-to-br from-gray-900 to-black custom-shadow z-50 overflow-hidden text-gray-400"
    style="width: {$dimensions.width}px; height: {$dimensions.height}px; border-radius: {$dimensions.radius}px;"
    onclick={isOpen ? null : toggleChatBot}
    onkeydown={(e) => e.key === 'Enter' && !isOpen && toggleChatBot()}
    role="button"
    tabindex="0"
    aria-label="Toggle Chat"
>
    {#if !isOpen}
        <div 
            class="h-full w-full flex items-center justify-center rounded-full bg-gradient-to-br from-lime-500 to-emerald-500
            border-[2px] border-lime-500 hover:bg-gradient-to-bl hover:from-lime-500 hover:to-emerald-500 transition-all ease-in-out duration-500"
        >
            <Bot strokeWidth={1.5} class="h-7 w-7 text-black" />
        </div>
    {:else}
        <div class="flex flex-col w-full h-full border-[2px] border-gray-800" style="border-radius: 12px;">
            <div class="w-full flex justify-between items-center px-5 py-4 mr-4 bg-gray-700/30"
                style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
            >
                <div class="flex items-center gap-3">
                    <Bot strokeWidth={1.5} class="h-7 w-7 text-emerald-500" />
                    <h1 class="text-xl font-semibold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                        MuseumPass AI
                    </h1>
                </div>
                <button
                    class="text-gray-400 hover:text-white transition-colors duration-200"
                    onclick={handleClose}
                    aria-label="Close chat"
                >
                    <Minimize class="h-5 w-5 text-gray-400 hover:text-white/90" />
                </button>
            </div>

            <div class="chat-container flex flex-col gap-4 max-w-md overflow-y-auto text-white/90 p-4 h-[calc(100%-100px)]" in:fade={{ duration: 750 }}>
                <div class="self-start max-w-[275px] w-fit px-4 py-3 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 text-black">
                    Hello {$user?.firstName}! I'm MuseumPass AI. How can I help you today?
                </div>
                <div class="self-end max-w-[275px] w-fit px-4 py-3 rounded-lg bg-gray-700/50 text-gray-300">
                    I'd like to know more about featured museums.
                </div>
                <div class="self-start max-w-[275px] w-fit px-4 py-3 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 text-black">
                    We have over 100 museums across 28 states in India. Would you like specific information about any of them?
                </div>
                <div class="self-end max-w-[275px] w-fit px-4 py-3 rounded-lg bg-gray-700/50 text-gray-300">
                    Which museum is near Chennai?
                </div>
                <div class="self-start max-w-[275px] w-fit px-4 py-3 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 text-black">
                    Government Museum, present 30km from Chennai is the nearest museum.
                </div>
                <button 
                    class="self-end max-w-[275px] w-fit px-3.5 py-2.5 rounded-lg bg-gray-700/40 border-[2px] border-gray-800 text-gray-400
                    hover:text-white/90 hover:bg-gray-700/50 transition-all duration-300"
                >
                    What is the ticket price there?
                </button>
                <button 
                    class="self-end max-w-[275px] w-fit px-3.5 py-2.5 rounded-lg bg-gray-700/40 border-[2px] border-gray-800 text-gray-400
                    hover:text-white/90 hover:bg-gray-700/50 transition-all duration-300"
                >
                    When is the good time to visit?
                </button>
                <button 
                    class="self-end max-w-[275px] w-fit px-3.5 py-2.5 rounded-lg bg-gray-700/40 border-[2px] border-gray-800 text-gray-400
                    hover:text-white/90 hover:bg-gray-700/50 transition-all duration-300"
                >
                    Book me a visit.
                </button>
                <div class="self-start flex gap-1.5 px-4 py-3">
                    <div class="w-2 h-2 bg-lime-500 rounded-full dot"></div>
                    <div class="w-2 h-2 bg-emerald-500 rounded-full dot"></div>
                    <div class="w-2 h-2 bg-lime-500 rounded-full dot"></div>
                </div>
            </div>

            <div class="px-4 pb-4">
                <div class="h-[2px] w-full bg-gray-800"></div>
            </div>
            
            <div class="w-full px-4 pb-4 flex gap-4">
                <div class="relative w-full group input-gradient">
                    <input
                    type="text"
                    class="block w-full px-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 transition-all duration-200 focus:outline-none 
                        border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                    placeholder="How can I assist you?"
                    required
                    />
                </div>
                <button
                    class="px-2.5 py-2.5 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 
                    text-black transition-all duration-200"
                >
                    <ArrowBigUpDash strokeWidth={1.2} class="h-7 w-7 text-black" />
                </button>
            </div>
        </div>
    {/if}
</div>