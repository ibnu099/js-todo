'use strict'

//fetch existing todos from localstorage
const getSavedTodos =  () => {
    const todosString = localStorage.getItem('todos')
    try {
        return todosString ? JSON.parse(todosString) : []
    } catch (error) {
        return []
    }
    
}

//Save todos to LocalStorage
const saveTodos  = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//remove todo
const removeTodo = (id) => {
    //find index
    const todoIndex = todos.findIndex(function (todo){
        return todo.id === id

    })
    
    //hapus  jika ketemu idnya
    if (todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}

//toggle todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo){
        todo.completed = !todo.completed
    }
}

//Render application todos based on filter
const renderTodos = (todos, filters) => {
    const filterdTodos = todos.filter((todo) => {
        if (filters.hideCompleted) {
            return (todo.text.toLowerCase().includes(filters.searchText) && !todo.completed)
        } else {
            return todo.text.toLowerCase().includes(filters.searchText)
        }
    })

    const todoLeft = filterdTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(todoLeft))

    filterdTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

//Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const newTodo = document.createElement('div')
    const cekTodo = document.createElement('input')
    const textTodo = document.createElement('span')
    const delTodo = document.createElement('button')

    //appned checkbox in div
    cekTodo.setAttribute('type', 'checkbox')
    cekTodo.checked = todo.completed
    newTodo.appendChild(cekTodo)
    cekTodo.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //append the todo
    textTodo.textContent = todo.text
    newTodo.appendChild(textTodo)

    //append delete button
    delTodo.textContent = 'x'
    newTodo.appendChild(delTodo)
    delTodo.addEventListener('click',() => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return newTodo
}
//Get the DOM elements for list summary
const generateSummaryDOM = (todoLeft) => {
    const new1 = document.createElement('h2')
    new1.textContent = `You have ${todoLeft.length} todo(s) left`
    return new1

}    