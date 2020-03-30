import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [],
    tips: [{ name: 'home' }, { name: 'work' }, { name: 'priority' }]
  },
  mutations: {
    ADD_LIST (state, item) {
      state.todoList.push({ item: item.item, time: item.time, done: false, tips: item.tips })
      localStorage.setItem('todoList', JSON.stringify(state.todoList))
    },
    DELETE_ITEM (state, i) {
      state.todoList.splice(i, 1)
      localStorage.setItem('todoList', JSON.stringify(state.todoList))
    },
    DONE_ITEM (state, i) {
      state.todoList[i].done = !state.todoList[i].done
      localStorage.setItem('todoList', JSON.stringify(state.todoList))
    },
    CLEAR_ALL (state) {
      state.todoList.splice(0, state.todoList.length)
      localStorage.setItem('todoList', JSON.stringify(state.todoList))
    }
  },
  actions: {
  },
  modules: {
  }
})
