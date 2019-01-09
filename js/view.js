let currentTab = 'all';
initTodo();

function initTodo() {
  if (localStorage.getItem('active') != null && localStorage.getItem('completed') != null) {
    toggleClearBtn();
    updateCurrentTab();
    updateLeftItems();
  } else {
    localStorage.setItem('active', 0);
    localStorage.setItem('completed', 0);
  }
}

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

function enter() {
  const input = document.getElementById('todo');
  if (event.keyCode === 13 && input.value.length > 0) {
    appendTodo(input.value);
    input.value = '';
    updateCurrentTab();
    updateLeftItems();
    toggleClearBtn();
  }
}

function completeItem() {
  if (event.target.nodeName === 'LI') {
    let item = JSON.parse(localStorage.getItem(event.target.id));
    if (item.state != 'completed') {
      hasCompleted(event.target.id);
    }
    updateCurrentTab();
    updateLeftItems();
  }
}

function deleteItem() {
  removeTodo(event.target.parentNode.id);
  updateCurrentTab();
  updateLeftItems();
  toggleClearBtn();
}

function clearCompleted() {
  removeCompleted();
  updateCurrentTab();
  updateLeftItems();
  toggleClearBtn();
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
  document.getElementById('todo_list').appendChild(li);
  li.appendChild(btn);
  return li;
}

function clearTodoList() {
  document.getElementById('todo_list').innerHTML = '';
}

function switchToTab(btnId) {
  const btns = document.getElementsByClassName('btn');
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
  document.getElementById('left_item').innerText = `Left items: ${getTodoCounts()}`;
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

function toggleClearBtn() {
  const clearBtn = document.getElementById('clear_btn');
  if (getTodoCounts() > 1) {
    clearBtn.classList.remove('hide');
  } else {
    clearBtn.classList.add('hide');
  }
}