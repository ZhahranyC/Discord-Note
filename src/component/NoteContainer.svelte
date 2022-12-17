<script>
    import { flip } from 'svelte/animate';
    import { fly } from 'svelte/transition'
    import { backOut } from 'svelte/easing'
    import Note from './Note.svelte'
    import {filteredNotes } from '../store/store.js'

</script>
<div>
    <ul class="grid grid-cols-autoMax3 gap-[20px]">
      {#each $filteredNotes as note (note.id)}
        <div
        in:fly={{
          key: note,
          y: 100,
          delay: 100,
          easing: backOut
        }}
        animate:flip={{
          duration: 400
        }}
        >
          <!-- Card -->
          <Note {note} (note.id)/>
        </div>
      {/each}   
    </ul>
  </div>