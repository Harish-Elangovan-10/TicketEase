<script lang="ts">
    import { user } from "$lib/auth";
    import { arrayUnion, doc, updateDoc } from "firebase/firestore";
    import { PenBox, Star } from "lucide-svelte";
    import { db } from "../firebase";
    import { onDestroy, onMount } from "svelte";
    import { fetchMuseums, museums, type Museum } from "$lib/accessData";
    import type { MuseumTicket } from "$lib/types";
    import toast from "svelte-french-toast";
    import { closeReview } from "$lib/handleRouting";

    let museumData: Museum[] | null = null;
    let parsedTicket: MuseumTicket | null = null;
    $: museumName = "";
    let unsubscribe: () => void;

    onMount(() => {
        fetchMuseums();
        unsubscribe = museums.subscribe((data) => {
            museumData = data;
        });

        const currentTicket = localStorage.getItem("reviewTicket");

        if (!currentTicket) return;

        try {
            parsedTicket = JSON.parse(currentTicket) as MuseumTicket;

            if (!parsedTicket || !parsedTicket.id) return;

            museumName = parsedTicket.name;
        } catch (error) {
            console.error("Error parsing ticket data:", error);
        }
    });

    onDestroy(() => {
        if(unsubscribe) unsubscribe();
    });

    const findMuseumId = (): number => {
        if (!museumData) return 1;
        const museum = museumData.find(m => m.title === museumName);
        return museum?.id ?? 1;
    };

    $: id = museumData ? findMuseumId() : 1;
    $: currentRating = museumData?.[id - 1]?.rating ?? 0;

    let comment = '';
    $: rating = 0;
    $: name = $user?.displayName;
    $: documentID = "Museum" + ((id < 10) ? "0" + id.toString() : id.toString());
    $: avgRating = (currentRating === 0) ? rating : Math.round(((currentRating + rating) / 2) * 10) / 10;

    const setRating = (index: number) => {
        rating = index + 1;
    };

    const handleSubmit = async () => {
        const date = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        const review = {
            'name': name,
            'rating': rating,
            'date': date,
            'comment': comment,
        };
        
        try {
            const museumRef = doc(db, 'museums', documentID);

            await updateDoc(museumRef, {
                rating: avgRating,
                reviews: arrayUnion(review),
            });

            toast.success('Review submitted successfully!', {
                duration: 5000,
                style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
            });
        } catch (error) {
            toast.error('Error submitting review. Please try again!', {
                duration: 5000,
                style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
            });
        }

        closeReview();
    };
</script>

<div class="fixed w-full min-h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center text-gray-400">
    <div class="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border-[2px] border-gray-700 flex flex-col items-end backdrop-blur-sm gap-5">
        <div class="w-full flex items-center justify-between gap-2">
            <h1 class="text-xl font-bold">Write your review</h1>
            <div>
                <div class="flex items-center">
                    {#each Array(5) as _, i}
                        <button onclick={() => setRating(i)} class="focus:outline-none">
                            <Star class={`h-5 w-5 mr-0.5 ${i < Math.floor(rating) ? 'text-lime-500' : 'text-gray-700'} hover:text-emerald-500`} />
                        </button>
                    {/each}
                </div>
            </div>
        </div>
        <div class="relative group input-gradient w-xl">
            <div class="absolute inset-y-0 l-0 pl-4 flex items-center pointer-events-none">
                <PenBox class="h-5 w-5 group-focus-within:text-emerald-400 transition-colors {comment.trim() !== '' ? 'text-lime-500' : 'text-gray-400'}" />
            </div>
            <input
                type="text"
                bind:value={comment}
                class="block w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 placeholder-white/30 transition-all duration-200 focus:outline-none 
                border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent"
                placeholder="Comment here..."
                required
            />
        </div>
        <div class="flex items-center gap-5">
            <button 
                class="px-4 py-2 border-[2px] border-gray-400 rounded-lg transition-colors duration-200 
                hover:text-black hover:bg-white hover:border-white focus:outline-none"
                onclick={closeReview}
            >
                Cancel
            </button>
            <button 
                class="px-4 py-2.5 bg-gradient-to-br from-lime-500 to-emerald-500 text-black disabled:cursor-not-allowed
                hover:from-lime-600 hover:to-emerald-600 rounded-lg transition-colors duration-200 focus:outline-none"
                onclick={handleSubmit}
                disabled={comment.trim() === '' || rating === 0}
            >
                Submit
            </button>
        </div>
    </div>
</div>