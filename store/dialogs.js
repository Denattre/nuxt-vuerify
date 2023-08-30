export const state = () => ({
  createListDialog: false,
})

export const mutations = {
  setCreateListDialog: (state, payload) => {
    state.createListDialog = payload
  },
}

// export const actions = {
//   updateActionValue({ commit }) {
//     commit('updateValue', payload)
//   },
// }
