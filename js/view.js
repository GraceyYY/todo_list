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
  li.setAttribute('onclick', 'completeItem()');
  let btn = document.createElement('button');
  btn.innerText = 'X';
  btn.classList.add('delete_btn');
  btn.setAttribute('onclick', 'deleteItem()');
  todoList.appendChild(li);
  todoList.appendChild(btn);
  return li;
}

function completeItem() {
  let item = JSON.parse(localStorage.getItem(event.target.id));
  if (item.state != 'completed') {
    hasCompleted(event.target.id);
  }
  updateCurrentTab();
  updateLeftItems();
}

function deleteItem() {
  removeTodo(event.target.previousSibling.id);
  updateCurrentTab();
  updateLeftItems();
  toggleClearBtn();
}

function clearCompleted() {
  removeCompleted();
  updateCurrentTab();
  toggleClearBtn();
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

function updateLeftItems() {
  leftItem.innerText = `Left items: ${localStorage.getItem('active')}`;
}

function updateCurrentTab() {
  switch (currentTab) {
    case 'all':
      displayAll();
      break;
    case 'active':
      displayActiveList();
      break;
    case 'completed':
      displayCompletedList();
      break;
  }
}

function enter() {
  if (event.keyCode === 13) {
    appendTodo(input.value);
    updateCurrentTab();
    updateLeftItems();
    toggleClearBtn();
  }
}

function initTodo() {
  alert('d');
  console.log('sdf');
  if (localStorage.getItem('active') && localStorage.getItem('completed')) {}
  localStorage.setItem('active', 0);
  localStorage.setItem('completed', 0);
}

function toggleClearBtn() {
  if (getTodoCounts() > 1) {
    clearBtn.classList.remove('hide');
  } else {
    clearBtn.classList.add('hide');
  }
}