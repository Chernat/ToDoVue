import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [],
    markers: ['home', 'work', 'priority'],
    colors: {
      home: 'yellow',
      work: 'blue',
      priority: 'red'
    }
  },
  mutations: {
    ADD_ITEM (state, item) {
      state.todoList.unshift({ text: item.text, time: item.time, done: false, markers: item.markers })
    },
    DELETE_ITEM (state, i) {
      state.todoList.splice(i, 1)
    },
    DONE_ITEM (state, i) {
      state.todoList[i].done = !state.todoList[i].done
    },
    CLEAR_ALL (state) {
      state.todoList.splice(0, state.todoList.length)
    },
    ADD_LOCAL (state) {
      localStorage.setItem('todoList', JSON.stringify(state.todoList))
    }
  },
  actions: {
    addItem ({ commit }, item) {
      commit('ADD_ITEM', item)
      commit('ADD_LOCAL')
    },
    deleteItem ({ commit }, index) {
      commit('DELETE_ITEM', index)
      commit('ADD_LOCAL')
    },
    doneItem ({ commit }, index) {
      commit('DONE_ITEM', index)
      commit('ADD_LOCAL')
    },
    clearAll ({ commit }) {
      commit('CLEAR_ALL')
      commit('ADD_LOCAL')
    }
  },
  getters: {
    itemList: state => state.todoList,
    colorsList: state => state.colors,
    markersList: state => state.markers,
    sortList: state => ['all'].concat(state.markers)
  }
})
