<template>
    <section class="todoapp">
        <header class="header">
            <h1>Todos</h1>
            <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTodo" @keyup.enter="addTodo(newTodo)"/>
        </header>

        <div class="main">
            <input type="checkbox" class="toggle-all" v-model="allDone"/>
            <ul class="todo-list">
                <li class="todo" v-for="(todo, index) in filteredTodos" :key="index" :class="{completed: todo.completed, editing: todo === editing}">
                    <div class="view">
                        <input type="checkbox" v-model="todo.completed" class="toggle"/>
                        <label @dblclick="editTodo(todo)">{{ todo.name }}</label>
                        <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
                    </div>
                    <input type="text" class="edit" v-model="todo.name" @keyup.enter="doneEdit" @blur="doneEdit" @keyup.esc="cancelEdit" v-focus="todo === editing"/>
                </li>
            </ul>
        </div>

        <footer class="footer" v-show="hasTodos">
            <span class="todo-count"><strong>{{ remainingTodosCount }}</strong> tâches à faire</span>
            <ul class="filters">
                <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
                <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">A faire</a></li>
                <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
            </ul>
            <button class="clear-completed" v-show="completedTodosCount > 0" @click.prevent="deleteCompleted">Supprimer les tâches finies</button>
        </footer>
    </section>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import store from './TodoStore'

export default {
  store: store,
  data () {
    return {
      newTodo: '',
      filter: 'all',
      editing: null,
      oldTodo: ''
    }
  },
  watch: {
    value (value) {
      this.todos = value
    }
  },
  methods: {
    ...Vuex.mapActions({
      addTodoStore: 'addTodo',
      deleteTodo: 'deleteTodo',
      deleteCompleted: 'deleteCompleted'
    }),
    addTodo () {
      this.addTodoStore(this.newTodo)
      this.newTodo = ''
    },
    editTodo (todo) {
      this.editing = todo
      this.oldTodo = todo.name
    },
    doneEdit () {
      this.editing = null
    },
    cancelEdit () {
      this.editing.name = this.oldTodo
      this.doneEdit()
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'todos',
      'remainingTodosCount',
      'completedTodosCount',
      'remainingTodos',
      'completedTodos'
    ]),
    allDone: {
      get () {
        return this.remainingTodosCount === 0
      },
      set (value) {
        this.todos.forEach((todo) => {
          todo.completed = value
        })
      }
    },
    hasTodos () {
      return this.todos.length > 0
    },
    filteredTodos () {
      if (this.filter === 'todo') {
        return this.remainingTodos
      } else if (this.filter === 'done') {
        return this.completedTodos
      } else {
        return this.todos
      }
    }
  },
  directives: {
    focus (el, value) {
      if (value) {
        Vue.nextTick(_ => {
          el.focus()
        })
      }
    }
  }
}
</script>

<style src="./todos.css"></style>
