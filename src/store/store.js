import { writable } from 'svelte/store';

export function useStorage(key, initialValue) {
    let storedValue = JSON.parse(localStorage.getItem(key))

    let store = writable(storedValue ? storedValue : initialValue)

    store.subscribe(value => localStorage.setItem(key, JSON.stringify(value)))

    return store
}

export const favStatus = writable('all')

export const orderByStatus = writable('latest')

export const filter = writable('')

function createFilteredNotes() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    applyFilter: (filter, notes) => update((filteredNotes) => {
      switch (filter) {
        case 'all-latest':
          filteredNotes = notes
          break
        case 'all-oldest':
          filteredNotes = notes.filter(note => note).reverse()
          break
        case 'favorite-latest':
          filteredNotes = notes.filter(note => note.favorite)
          break
        case 'favorite-oldest':
          filteredNotes = notes.filter(note => note.favorite).reverse()
          break
      }
      return filteredNotes
    }
    ),
    change: (notes) => set(notes)
  }
}

export const filteredNotes = createFilteredNotes()