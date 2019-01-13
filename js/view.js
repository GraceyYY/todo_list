let currentTab = 'all';
initTodo();

function initTodo() {
  if (localStorage.getItem('active') != null && localStorage.getItem('completed') != null) {
    toggleClearBtn();
    displayList(currentTab);
    updateLeftItems();
  } else {
    localStorage.setItem('active', 0);
    localStorage.setItem('completed', 0);
  }
}

function displayList(tab) {
  clearTodoList();
  switch (tab) {
    case 'active':
      switchToTab('active_btn');
      getTodosFrom('active').forEach(item => createItem(item.index, item.todo));
      break;
    case 'completed':
      switchToTab('completed_btn');
      getTodosFrom('completed').forEach(item => {
        let li = createItem(item.index, item.todo);
        li.classList.add('deleted');
      });
      break;
    default:
      switchToTab('all_btn');
      getTodosFrom('all').forEach(item => {
        let li = createItem(item.index, item.todo);
        if (item.todo.state === 'completed') {
          li.classList.add('deleted');
        }
      });
      break;
  }
  toggleClearBtn();
}

function enter() {
  const input = document.getElementById('todo');
  if (event.keyCode === 13 && input.value.length > 0) {
    appendTodoItem(input.value);
    input.value = '';
    displayList(currentTab);
    updateLeftItems();
  }
}

function completeItem() {
  if (event.target.nodeName === 'LI') {
    let item = JSON.parse(localStorage.getItem(event.target.id));
    if (item.state != 'completed') {
      hasCompleted(event.target.id);
    }
    displayList(currentTab);
    updateLeftItems();
    toggleClearBtn();
  }
}

function deleteItem() {
  removeTodoItem(event.target.parentNode.id);
  displayList(currentTab);
  updateLeftItems();
  toggleClearBtn();
}

function clearCompleted() {
  removeAllCompletedItems();
  displayList(currentTab);
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

function toggleClearBtn() {
  const clearBtn = document.getElementById('clear_btn');
  if (localStorage.getItem('completed') > 0 && currentTab != 'active') {
    clearBtn.classList.remove('hide');
  } else {
    clearBtn.classList.add('hide');
  }
}