<script lang="ts">
    import { ArrowBigUpDash, Bot, Minimize } from "lucide-svelte";
    import { spring } from "svelte/motion";
    import { fade } from "svelte/transition";
    import { user } from "./auth";
    import { onMount } from "svelte";

    const dimensions = spring({ width: 56, height: 56, radius: 28 });
    let isOpen = false;
    let isLoading = false;

    const API_URL = "http://10.10.8.120:8000";

    $: if (isOpen) {
        setTimeout(() => {
            scrollToBottom();
        }, 200);
    }
    
    onMount(() => {
        if (chat.length === 0) {
            chat = [
                ['AI', `Hello ${$user?.firstName || 'there'}! I'm MuseumPass AI. How can I help you today?`]
            ];
        }
    });

    const toggleChatBot = () => {
        isOpen = !isOpen;

        if (isOpen) {
            dimensions.set({ width: 400, height: 620, radius: 12 });
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

    let chat: [string, string][] = [];
    let query = '';
    
    const fetchChatResponse = async (message: string) => {
        try {
            isLoading = true;
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Failed to fetch response:', error);
            return "Sorry, I couldn't connect to the museum database. Please try again later.";
        } finally {
            isLoading = false;
        }
    };

    const handleSendMessage = async () => {
        if (!query.trim()) return;

        setTimeout(() => {
            scrollToBottom();
        }, 100);
        
        chat = [...chat, ['User', query]];
        const userMessage = query;
        query = '';
        
        
        const aiResponse = await fetchChatResponse(userMessage);
        
        chat = [...chat, ['AI', aiResponse]];
        
        setTimeout(() => {
            scrollToBottom();
        }, 100);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const suggestions = [
        "Hello, MuseumPass AI",
        "Museums in Chennai",
        "What are the top 3 museums?"
    ];

    const handleSuggestion = (suggestion: string) => {
        query = suggestion;
        handleSendMessage();
    };
</script>

<div 
    class="fixed bottom-5 right-5 bg-gradient-to-br from-gray-900 to-black custom-shadow z-50 overflow-hidden text-gray-400"
    style="width: {$dimensions.width}px; height: {$dimensions.height}px; border-radius: {$dimensions.radius}px;"
    on:click={isOpen ? null : toggleChatBot}
    on:keydown={(e) => e.key === 'Enter' && !isOpen && toggleChatBot()}
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
                    on:click={handleClose}
                    aria-label="Close chat"
                >
                    <Minimize class="h-5 w-5 text-gray-400 hover:text-white/90" />
                </button>
            </div>

            <div class="chat-container flex flex-col gap-4 max-w-md overflow-y-auto text-white/90 p-4 h-[calc(100%-100px)]" in:fade={{ duration: 750 }}>
                {#each chat as content}
                    {#if content[0] === 'AI'}
                        <div class="self-start max-w-[275px] w-fit px-4 py-3 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 text-black">
                            {content[1]}
                        </div>
                    {:else}
                        <div class="self-end max-w-[275px] w-fit px-4 py-3 rounded-lg bg-gray-700/50 text-gray-300">
                            {content[1]}
                        </div>
                    {/if}
                {/each}
                
                {#if suggestions.length > 0 && chat.length <= 1}
                    <div class="flex flex-col gap-2 mt-2">
                        {#each suggestions as suggestion}
                            <button 
                                class="self-end max-w-[275px] w-fit px-3.5 py-2.5 rounded-lg bg-gray-700/40 border-[2px] border-gray-800 text-gray-400
                                hover:text-white/90 hover:bg-gray-700/50 transition-all duration-300"
                                on:click={() => handleSuggestion(suggestion)}
                            >
                                {suggestion}
                            </button>
                        {/each}
                    </div>
                {/if}
                
                {#if isLoading}
                    <div class="self-start flex gap-1.5 px-4 py-3">
                        <div class="w-2 h-2 bg-lime-500 rounded-full dot"></div>
                        <div class="w-2 h-2 bg-emerald-500 rounded-full dot"></div>
                        <div class="w-2 h-2 bg-lime-500 rounded-full dot"></div>
                    </div>
                {/if}
            </div>

            <div class="px-4 pb-4">
                <div class="h-[2px] w-full bg-gray-800"></div>
            </div>
            
            <div class="w-full px-4 pb-4 flex gap-4">
                <div class="relative w-full group input-gradient">
                    <input
                        type="text"
                        bind:value={query}
                        on:keydown={handleKeyPress}
                        class="block w-full px-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 transition-all duration-200 focus:outline-none 
                            border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                        placeholder="How can I assist you?"
                        disabled={isLoading}
                    />
                </div>
                <button
                    class="px-2.5 py-2.5 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 
                    text-black transition-all duration-200"
                    on:click={handleSendMessage}
                    disabled={isLoading || !query.trim()}
                >
                    <ArrowBigUpDash strokeWidth={1.2} class="h-7 w-7 text-black" />
                </button>
            </div>
        </div>
    {/if}
</div>

<style>
  .dot {
    animation: pulse 1.5s infinite ease-in-out;
  }
  .dot:nth-child(2) {
    animation-delay: 0.5s;
  }
  .dot:nth-child(3) {
    animation-delay: 1s;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>