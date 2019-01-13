
initTodo();

function initTodo() {
  currentTab = 'all';
  initLocalStorage();
  updateTab(currentTab);
}

function enter() {
  const input = document.getElementById('todo');
  if (event.keyCode === 13 && input.value.length > 0) {
    appendTodoItem(input.value);
    input.value = '';
    updateTab(currentTab);
  }
}

function completeItem() {
  if (event.target.nodeName === 'LI') {
    let item = JSON.parse(localStorage.getItem(event.target.id));
    if (item.state != 'completed') {
      hasCompleted(event.target.id);
    }
    updateTab(currentTab);
  }
}

function clearCompleted() {
  removeAllCompletedItems();
  updateTab(currentTab);
}

function createItem(index, todo) {
  let li = document.createElement('li');
  li.innerText = todo.content;
  li.id = index;
  li.setAttribute('onclick', 'completeItem()');
  let btn = document.createElement('button');
  btn.innerText = 'X';
  btn.classList.add('delete_btn');
  btn.setAttribute('onclick', 'deleteBtn()');
  document.getElementById('todo_list').appendChild(li);
  li.appendChild(btn);
  return li;
}

function displayList(tab) {
  getTodosFrom(tab).forEach(item => {
    let li = createItem(item.index, item.todo);
    if (item.todo.state === 'completed') {
      li.classList.add('deleted');
    }
  });
}

function clearTodoList() {
  document.getElementById('todo_list').innerHTML = '';
}

function toggleActiveTab(tab) {
  document.getElementById(`${tab}_btn`).classList.toggle('active', tab === currentTab);
}

function updateLeftItems() {
  document.getElementById('left_item').innerText = `Left items: ${getTodoCounts()}`;
}

function toggleClearBtn() {
  document.getElementById('clear_btn').classList.toggle('hide', !needClearBtn());
}