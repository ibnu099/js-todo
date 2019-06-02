'use strict'

let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

//pertama kali di render
renderTodos(todos, filters)

//listener for input
document.querySelector('#search-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

//listener submit
document.querySelector('#form-addTodo').addEventListener('submit', (e) => {
    //prevent default, agar tidak refresh dan menaruh input di url.
    e.preventDefault()
    
    //add new todo
    newTodo = {
        id: uuidv4(),
        text: e.target.elements.newTodo.value,
        completed: false
    }
    todos.push(newTodo)

    //simpan ke localstorage
    saveTodos(todos)

    //render ulang
    renderTodos(todos, filters)

    //kosongin form input
    e.target.elements.newTodo.value = ''
})

//listenerr checkbox
document.querySelector('#hide-completed').addEventListener('change', (e) =>{
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})
