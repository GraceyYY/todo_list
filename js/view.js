const input = document.getElementById('todo');
const todoList = document.getElementById('todo_list');

function displayList(arr) {
  arr.forEach(item => {
    let li = document.createElement('li');
    li.innerText = item.todo.content;
    li.id = item.index;
    todoList.appendChild(li);
  })
};