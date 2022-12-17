<script>
  import Popup from './Popup.svelte'
  import Note from './NoteContainer.svelte'
  import Filter from './Filter.svelte';

  let popupStatus = false;

  function togglePopup() {
    popupStatus = !popupStatus
  }
</script>

<main class="relative font-poppins w-full min-h-screen bg-gray-600" id="main">
    <!-- Popup -->
    <Popup {popupStatus} {togglePopup}/>

    <div class="w-container mx-auto text-white py-11">
      <!-- Header -->
      <header class="flex justify-between items-center pb-11">

        <!-- Filter -->
        <Filter/>
  
        <div>
          <button 
          class="flex justify-center items-center bg-purpleDiscord w-[90px] aspect-square rounded-full border-purpleDiscord text-white drop-shadow-lg hover:border-4 hover:bg-white hover:text-purpleDiscord hover:border-purpleDiscord group transition-all outline-none focus:outline-purpleDiscord"
          on:click={togglePopup}
          >
            <div class="flex justify-center items-center w-[76px] aspect-square rounded-full border-dotted border-subDark group-hover:border-transparent group-hover:p-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-[32px] h-[32px] group-hover:w-[66px] group-hover:h-[66px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>          
            </div>
          </button>
        </div>
      </header>
  
      <!-- Cards -->
      <Note/>
    </div>
  </main>