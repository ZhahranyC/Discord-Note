<script>
    import { fade } from "svelte/transition";

    export let note
    export let expandStatus
    export let toggleExpandStatus

</script>

{#if expandStatus}
    <div  
    class="bg-subDark w-full h-full absolute z-20 bg-opacity-30 left-0 top-0"
    transition:fade={{
        duration: 200
    }}
    >
        <div class="w-[560px] h-fit bg-purpleDiscord fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-9 pt-8 pb-12 rounded-lg drop-shadow-lg">
        <header class="flex justify-between pb-[21px] border-b-4 border-subDark items-center">
            <h3 class="text-white text-2xl font-semibold">
                {note.title}
            </h3>
            <button 
            class="text-subDark hover:text-white transition-colors"
            on:click={toggleExpandStatus}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>          
            </button>
        </header>

        <div class="pt-[21px]">
            <p class="text-white text-lg font-medium bg-subDark p-4 rounded-md">
                {note.description}
            </p>
        </div>
        </div>
    </div>
    
{/if}