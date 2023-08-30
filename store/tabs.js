export const state = () => ({
  currentTab: '1',
})

export const mutations = {
  setCurrentTab: (state, payload) => {
    state.currentTab = payload
  },
}

// export const actions = {
//   updateActionValue({ commit }) {
//     commit('updateValue', payload)
//   },
// }
