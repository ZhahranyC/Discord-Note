<script>
    import { fly } from 'svelte/transition'
    import EditPopup from "./EditPopup.svelte";
    import { useStorage, filter, filteredNotes } from '../store/store.js'

    export let note

    let notes = useStorage('notes', [])
    let settingStatus = false
    let editStatus = false

    function toggleSetting() {
        settingStatus = !settingStatus
    }   

    function windowToggleSetting(e) {
        if(settingStatus && !e.target.classList.contains('setting-button') && !e.target.classList.contains('settings')) {
            toggleSetting() 
        }
    }

    function toggleEdit() {
        editStatus = !editStatus
    }

    function deleteNote(id) {
      notes = useStorage('notes', [])
        $notes = $notes.filter(note => !(note.id == id))
        filteredNotes.applyFilter($filter, $notes)
        toggleSetting()
    }

    function toggleFav(id) {
      notes = useStorage('notes', [])
        $notes = $notes.map((note) => {
            if(note.id == id) {
                note.favorite = !note.favorite
            }
            return note
        })
        filteredNotes.applyFilter($filter, $notes)
    }
</script>

<svelte:window on:click={(e) => {windowToggleSetting(e)}}/>    

<EditPopup {note} {editStatus} {toggleEdit}/>

<li 
class="flex flex-col justify-between h-[372px] p-[27px] bg-purpleDiscord rounded-lg drop-shadow-lg"
>
    <div class="bg-subDark p-3 rounded-md overflow-hidden h-auto">
      <div class="pb-1 border-b-2 border-purpleDiscord flex justify-between items-center">
        <h3 class="text-lg">{note.title}</h3>
      </div>
      <p class="text-xs text-white/40 pt-2">{note.dateCreated}</p>
      <p class="pt-1 line-clamp-8 text-sm text-mainGray">{note.description}</p>
    </div>

    <!-- Favorite Button -->
    <div class="relative flex justify-between">
      <div class="flex justify-center items-center w-6">
        <button 
        class:fill-white={note.favorite}
        class="fill-none hover:fill-white transition-all aspect-square w-6 hover:w-8 absolute outline-none"
        on:click={toggleFav(note.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aspect-square w-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>  
        </button>
      </div>

      <!-- Setting Button -->
      <button 
      class="setting-button outline-none"
      on:click={toggleSetting}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="setting-button | w-6 aspect-square">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" class="setting-button"/>
        </svg>              
      </button>

      <!-- Setting -->
      {#if settingStatus}
      <div class="settings | block absolute right-[10px] -top-[65px] flex-col bg-mainDark justify-between px-4 py-2 drop-shadow-lg rounded-lg "
      transition:fly={{
        y:10,
        x:10,
        duration:200
      }}
      >
        <button 
        class="settings | flex hover:text-purpleDiscord mb-2 transition-colors"
        on:click={toggleEdit}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="settings | w-5 h-5 mr-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" class="settings | "/>
          </svg>
          <span class="settings | font font">Edit</span>                
        </button>
        <button class="settings | flex hover:text-purpleDiscord transition-colors"
        on:click={deleteNote(note.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="settings | w-5 h-5 mr-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" class="settings | "/>
          </svg>
          <span class="settings | ">Delete</span>                
        </button>
      </div>
      {/if}
    </div>
  </li>