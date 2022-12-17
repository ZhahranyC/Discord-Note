<script>
    import { fade } from 'svelte/transition';
    import { useStorage, filter, filteredNotes } from '../store/store.js'

    export let note
    export let editStatus
    export let toggleEdit

    let notes = useStorage('notes', [])

    function handleEditSubmit(e, id) {
        notes = useStorage('notes', [])
        let newNote = {}
        
        let formData = new FormData(e.target)
        for (let data of formData) {
            const [key, value] = data
            newNote[key] = value;
        }

        $notes = $notes.map((note) => {
            if(note.id == id) {
                note.title = newNote.title
                note.description = newNote.description
            }
            return note
        })
        filteredNotes.applyFilter($filter, $notes)
        toggleEdit();
    }
</script>

{#if editStatus}
    <div  
    class="bg-subDark w-full h-full absolute z-20 bg-opacity-30 left-0 top-0"
    transition:fade={{
        duration: 200
    }}
    >
        <div class="w-[560px] h-[640px] bg-purpleDiscord fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-9 pt-8 pb-12 rounded-lg drop-shadow-lg">
        <header class="flex justify-between pb-[21px] border-b-4 border-subDark items-center">
            <h3 class="text-white text-2xl font-semibold">
                Edit a Note
            </h3>
            <button 
            class="text-subDark hover:text-white transition-colors"
            on:click={toggleEdit}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>          
            </button>
        </header>

        <div class="pt-[21px]">
            <form 
            on:submit|preventDefault={(e) => {handleEditSubmit(e, note.id)}}
            >
                <label for="itle" class="text-white text-lg font-medium">
                    Note title
                </label>
                <!-- svelte-ignore a11y-autofocus -->
                <input name="title" type="text" 
                class="w-full mt-[14px] mb-[21px] h-[60px] outline-purpleDiscord bg-subDark text-white focus:outline-none rounded-md px-4" 
                value={note.title} autofocus>
                <label for="description" class="text-white text-lg font-medium">
                    Note description
                </label>
                <textarea name="description" 
                class="w-full mt-[14px] h-[230px] outline-purpleDiscord bg-subDark text-white focus:outline-none  rounded-md p-4 resize-none" 
                value={note.description}></textarea>

                <button type="submit" 
                class="bg-subDark w-full text-purpleDiscord py-[13px] rounded-full font-semibold text-lg tracking-widest hover:bg-white transition-all mt-6 focus:outline outline-offset-4 outline-4"
                >Edit Note
                </button>
            </form>
        </div>
        </div>
    </div>
    
{/if}