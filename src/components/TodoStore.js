import Vuex from 'vuex'

const state = {
  todos: [{
    name: 'Première tâche',
    completed: true
  }]
}

const getters = {
  todos: state => state.todos,
  completedTodos: state => state.todos.filter(todo => todo.completed),
  remainingTodos: state => state.todos.filter(todo => !todo.completed),
  remainingTodosCount: state => getters.remainingTodos(state).length,
  completedTodosCount: state => getters.completedTodos(state).length
}

const mutations = {
  ADD_TODO: (state, name) => {
    state.todos.push({
      name: name,
      completed: false
    })
  },
  DELETE_TODO: (state, todo) => {
    state.todos = state.todos.filter(i => i !== todo)
  }
}

const actions = {
  addTodo: (store, name) => {
    store.commit('ADD_TODO', name)
  },
  deleteTodo: (store, todo) => {
    store.commit('DELETE_TODO', todo)
  },
  deleteCompleted: (store) => {
    state.todos.filter(todo => todo.completed).forEach(todo => {
      store.commit('DELETE_TODO', todo)
    })
  }
}

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: true
})

global.store = store

export default store
