let currentTab = 'all';
initTodo();

function initTodo() {
  initLocalStorage();
  toggleClearBtn();
  displayList(currentTab);
  updateLeftItems();
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

function toggleActiveTab(tab) {
  document.getElementById(`${tab}_btn`).classList.toggle('active', tab === currentTab);
}

function updateLeftItems() {
  document.getElementById('left_item').innerText = `Left items: ${getTodoCounts()}`;
}

function toggleClearBtn() {
  document.getElementById('clear_btn').classList.toggle('hide', !needClearBtn());
}