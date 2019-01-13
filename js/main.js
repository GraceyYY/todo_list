initTodo();

function initTodo() {
  currentTab = 'all';
  initLocalStorage();
  updateTab(currentTab);
}

function initLocalStorage() {
  if (localStorage.getItem('active') === null && localStorage.getItem('completed') === null) {
    localStorage.setItem('active', 0);
    localStorage.setItem('completed', 0);
  }
}

function needClearBtn() {
  return localStorage.getItem('completed') > 0 && currentTab != 'active';
}

function switchToTab(tab) {
  let prevTab = currentTab;
  currentTab = tab;
  toggleActiveTab(prevTab);
  toggleActiveTab(currentTab);
}

function updateTab(tab) {
  clearTodoList();
  switchToTab(tab);
  displayList(tab);
  toggleClearBtn();
  updateLeftItems();
}

function enter() {
  const content = document.getElementById('todo').value;
  if (event.keyCode === 13 && content) {
    appendTodoItem(content);
    updateTab(currentTab);
    clearInputBox();
  }
}

function deleteBtn() {
  removeTodoItem(event.target.parentNode.id);
  updateTab(currentTab);
}

function clearBtn() {
  removeAllCompletedItems();
  updateTab(currentTab);
}

function completeBtn() {
  if (event.target.nodeName === 'LI') {
    let item = JSON.parse(localStorage.getItem(event.target.id));
    if (item.state != 'completed') {
      hasCompleted(event.target.id);
    }
    updateTab(currentTab);
  }
}