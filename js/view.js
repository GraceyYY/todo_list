const input = document.getElementById('todo');
const todoList = document.getElementById('todo_list');
const activeBtn = document.getElementById('active_btn');
const allBtn = document.getElementById('all_btn');
const completedBtn = document.getElementById('completed_btn');
const clearBtn = document.getElementById('clear_btn');
const btns = document.getElementsByClassName('btn');
const leftItem = document.getElementById('left_item');
let currentTab = 'all';

function displayActiveList() {
  switchToTab('active_btn');
  clearTodoList();
  getTodos('active').forEach(item => createItem(item.index, item.todo));
}

function displayCompletedList() {
  switchToTab('completed_btn');
  clearTodoList();
  getTodos('completed').forEach(item => {
    let li = createItem(item.index, item.todo);
    li.classList.add('deleted');
  });
}

function displayAll() {
  switchToTab('all_btn');
  clearTodoList();
  getTodos('all').forEach(item => {
    let li = createItem(item.index, item.todo);
    if (item.todo.state === 'completed') {
      li.classList.add('deleted');
    }
  })
}

function createItem(index, todo) {
  let li = document.createElement('li');
  li.innerText = todo.content;
  li.id = index;
  todoList.appendChild(li);
  return li;
}

function clearTodoList() {
  todoList.innerHTML = '';
}

function switchToTab(btnId) {
  for (let btn of btns) {
    if (btn.id === btnId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
  currentTab = btnId.split('_')[0];
}

function updateLeftItems(){
    leftItem.innerText = `Left items: ${localStorage.getItem('active')}`;
}