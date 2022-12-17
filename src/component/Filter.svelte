<script>
  import { useStorage, favStatus, orderByStatus, filter, filteredNotes} from '../store/store.js'

  let notes = useStorage('notes', [])
  $filter = `${$favStatus}-${$orderByStatus}`
  filteredNotes.applyFilter($filter, $notes)

  function changeFavStatus() {
    notes = useStorage('notes', [])
    if($favStatus == 'favorite') {
      $favStatus = 'all'
    } else {
      $favStatus = 'favorite'
    }
    $filter = `${$favStatus}-${$orderByStatus}`
    let tempNotes = $notes
    filteredNotes.applyFilter($filter, tempNotes)
    console.log($filteredNotes)
  }

  function changeOrderByStatus() {
    notes = useStorage('notes', [])
    if($orderByStatus == 'oldest') {
      $orderByStatus = 'latest'
    } else {
      $orderByStatus = 'oldest'
    }
    $filter = `${$favStatus}-${$orderByStatus}`
    let tempNotes = $notes
    filteredNotes.applyFilter($filter, tempNotes)
    filteredNotes.applyFilter($filter, $notes)
  }

</script>

<div class="flex py-[22px] ">
    <button 
    class={`flex bg-purpleDiscord px-[22px] py-[7px] rounded-lg drop-shadow-xl hover:bg-white hover:text-purpleDiscord hover:border-purpleDiscord border-4 border-transparent transition-colors hover:fill-purpleDiscord fill-none w-[170px] justify-center outline-none focus:outline-purpleDiscord` }
    on:click={changeFavStatus}
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="inheret" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[26px] h-[26px] mr-[17px]"
    class:hidden={$favStatus == 'favorite'}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>          
      
      <span class="text-lg">{$favStatus == "all" ? 'Favorite' : 'All'}</span>
    </button>

    <button 
    class="flex mx-[20px] bg-purpleDiscord px-[22px] py-[7px] rounded-lg drop-shadow-xl hover:bg-white hover:text-purpleDiscord hover:border-purpleDiscord border-4 border-transparent transition-colors hover:fill-purpleDiscord fill-none w-[160px] justify-center outline-none focus:outline-purpleDiscord"
    on:click={changeOrderByStatus}
    >
      {#if $orderByStatus == 'latest'}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[26px] h-[26px] mr-[17px]">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
      </svg>    
      {:else}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[26px] h-[26px] mr-[17px]">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
      </svg>          
      {/if}
      <span class="text-lg">{$orderByStatus == "latest" ? "Oldest" : "Latest"}</span>
    </button>
  </div>