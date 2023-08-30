export const state = () => ({
  listName: '',
  file: null,
  selectedItems: [],
  searchedItems: [],
  csvValid: false,
  catalogValid: false,

  addedListName: '',
  addedFile: null,
  addedSelectedItems: [],
})

export const mutations = {
  setDefaultCreateListStore: (state) => {
    state.listName = ''
    state.addedListName = ''
    state.file = null
    state.addedFile = null
    state.catalogValid = false
    state.csvValid = false
    state.selectedItems = []
  },
  setListName: (state, payload) => {
    state.listName = payload
  },
  setFile: (state, payload) => {
    state.file = payload
  },
  setCsvValid: (state, payload) => {
    state.csvValid = payload
  },
  setCatalogValid: (state, payload) => {
    state.catalogValid = payload
  },
  setSelectedItems: (state, payload) => {
    state.selectedItems = [...payload]
  },
  setSearchedItems: (state, payload) => {
    state.searchedItems = [...payload]
  },

  setAddedListName: (state, payload) => {
    state.addedListName = payload
    console.log('ADDELISTNAME', state.addedListName)
  },
  setAddedFile: (state, payload) => {
    state.addedFile = payload
  },
}
