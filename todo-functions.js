//fetch existing todos from localstorage
const getSavedTodos = function () {
    const todosString = localStorage.getItem('todos')
    if (todosString !== null) {
        return JSON.parse(todosString)
    }else{
        return []
    }
}

//Save todos to LocalStorage
const saveTodos  = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}

//remove todo
const removeTodo = function (id) {
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
const toggleTodo = function(id){
    const todo = todos.find(function (todo){
        return todo.id === id
    })

    if (todo !== undefined){
        todo.completed = !todo.completed
    }
}

//Render application todos based on filter
const renderTodos = function (todos, filters) {
    const filterdTodos = todos.filter(function (todo) {
        if (filters.hideCompleted) {
            return (todo.text.toLowerCase().includes(filters.searchText) && !todo.completed)
        } else {
            return todo.text.toLowerCase().includes(filters.searchText)
        }
    })

    const todoLeft = filterdTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(todoLeft))

    filterdTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

//Get the DOM elements for an individual note
const generateTodoDOM = function (todo){
    const newTodo = document.createElement('div')
    const cekTodo = document.createElement('input')
    const textTodo = document.createElement('span')
    const delTodo = document.createElement('button')

    //appned checkbox in div
    cekTodo.setAttribute('type', 'checkbox')
    cekTodo.checked = todo.completed
    newTodo.appendChild(cekTodo)
    cekTodo.addEventListener('change', function () {
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
    delTodo.addEventListener('click', function(){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return newTodo
}
//Get the DOM elements for list summary
const generateSummaryDOM = function(todoLeft){
    const new1 = document.createElement('h2')
    new1.textContent = `You have ${todoLeft.length} todo(s) left`
    return new1

}    