<script>
    import {v4 as uuidv4 } from 'uuid'

    import { fade } from 'svelte/transition';
    import { useStorage, filter, filteredNotes } from '../store/store.js'

    export let popupStatus
    export let togglePopup

    let notes = useStorage('notes', [])

    function addNewDate() {
        let days = ['Sundah', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        let newDate = new Date,
				date = newDate.getDate(),
				day = newDate.getDay(),
				month = newDate.getMonth(),
				year = newDate.getFullYear()
		return(`${days[day]}, ${date}-${month}-${year}`)
    }

    function handleSubmit(e) {
        notes = useStorage('notes', [])
        let newNote = {}
        
        let formData = new FormData(e.target)
        for (let data of formData) {
            const [key, value] = data
            newNote[key] = value;
        }

        Object.assign(newNote, {id: uuidv4(), dateCreated: addNewDate(), favorite: false})

        $notes = [newNote, ...$notes]

        e.target.reset()
        filteredNotes.applyFilter($filter, $notes)
        togglePopup();
    }
</script>

{#if popupStatus}
<div class="bg-subDark w-full h-full absolute z-20 bg-opacity-30"
transition:fade={{
  duration: 200
}}
>
    <div class="w-[560px] h-[640px] bg-purpleDiscord fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-9 pt-8 pb-12 rounded-lg drop-shadow-lg">
      <header class="flex justify-between pb-[21px] border-b-4 border-subDark items-center">
        <h3 class="text-white text-2xl font-semibold">Create a New Note</h3>
        <button 
        class="text-subDark hover:text-white transition-colors"
        on:click={togglePopup}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>          
        </button>
      </header>

      <div class="pt-[21px]">
        <form on:submit|preventDefault={e => {handleSubmit(e)}}>
          <label for="itle" class="text-white text-lg font-medium">Note title</label>
          <!-- svelte-ignore a11y-autofocus -->
          <input name="title" value="" type="text" class="w-full mt-[14px] mb-[21px] h-[60px] outline-purpleDiscord bg-subDark text-white focus:outline-none rounded-md px-4"
          autofocus
          >
          <label for="description" class="text-white text-lg font-medium">Note description</label>
          <textarea name="description" class="w-full mt-[14px] h-[230px] outline-purpleDiscord bg-subDark text-white focus:outline-none  rounded-md p-4 resize-none"></textarea>

          <button type="submit" class="bg-subDark w-full text-purpleDiscord py-[13px] rounded-full font-semibold text-lg tracking-widest hover:bg-white transition-colors  mt-6 focus:outline outline-offset-4 outline-4 outline-subDark">Create Note</button>
        </form>
      </div>
    </div>
  </div>
  
{/if}