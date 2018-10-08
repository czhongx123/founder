export default {
  namespaced: true,
  state: {
    list: [],
    isPlanShow:false

  },
  mutations: {
    changeList(state, payload) {
      state.list.push(payload)
    },
    changePlanShow(state,payload){
        state.isPlanShow=payload
    },
  }
}