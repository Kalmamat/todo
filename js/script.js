// Получаем все эдементы из HTML
let todoName = document.querySelector('.task-name')
let addBtn = document.querySelector('.add-todo')
let todoBlock = document.querySelector('.todos')
let clearAll = document.querySelector('.clear-all')


// добавляем дело при клике на кнопку добавить
addBtn.addEventListener('click', () => addTodo())
// Обработка собития при клике на кнопку Очистить все
clearAll.addEventListener('click', () => clear())
// Добавляем дело при клике на Enter
todoName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        addTodo()
    }
})

// Получаем все данные их localStorage, если их там нет то даем новый массив
function getTodos() {
        return JSON.parse(localStorage.getItem('todos')) || []
    }

// Запускаем при клике на кнопку добавить
function addTodo(){
    // берем данные из инпута
    let newTodo = todoName.value
    // проверяем на пустоту
    if (newTodo.length > 0) {
        // получаем данные из localStorage и создаем массив в котором все из этого хранилища и через
        // запятую значение из input
        let todos = getTodos()
        todos = [...todos, newTodo]
        // записываем обновленный массив в localStorage
        localStorage.setItem('todos', JSON.stringify(todos))
        // Переписываем список
        view()
        todoName.value = ''
    }
}
// Отрисовка списка на страницу
function view(){
let tasks = getTodos()
    let list =''
    // перебераем массив со всеми делами и складываем <li> в переменную list в виде строки
    tasks.forEach(item=> list = list + `<li class="list-group-item d-flex justify-content-between">${item}<button class="del-btn btn btn-danger"><i class="fas fa-trash"></i></button></li>`)
    // вставляем спсиок на страницу
    todoBlock.innerHTML = '<ul class="list-group list-group-flush">' + list + '</ul>'
    // бурум все кнопки удвления и навешываем на каждую событие клика
    document.querySelectorAll('.del-btn').forEach((button, idx) => {
        button.addEventListener('click', () => {
            // вырезаем по индексу удаленный элемент
           tasks.splice(idx, 1)
            // После удаления массива без этого элемента в хранилище
            localStorage.setItem('todos', JSON.stringify(tasks))
            // перерисовка
            view()
        })
    })
}
// очистить весь список
function clear() {
    // удаляем строку из localStorage по названию ключа todos
    localStorage.removeItem('todos')
    view()
}

view()

// Облать видимлсьи переменншй фигурными
// скобками в котоаы она была объявлена
//

