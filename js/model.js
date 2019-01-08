class Todo {
  constructor(content) {
    this.state = 'active';
    this.content = content;
  }
}

function initTodo() {
  localStorage.setItem('active', 0);
  localStorage.setItem('completed', 0);
}

function editCounts(name, operation) {
  let count = parseInt(localStorage.getItem(name));
  switch (operation) {
    case 'plus':
      count += 1;
      break;
    case 'minus':
      count -= 1;
      break;
    default:
      break;
  }
  localStorage.setItem(name, count);
}

function appendTodo(input) {
  const index = Date.now();
  let value = JSON.stringify(new Todo(input));
  localStorage.setItem(index, value);
  editCounts('active', 'plus');
}

function hasCompleted(index) {
  let todo = JSON.parse(localStorage.getItem(index));
  todo.state = 'completed';
  localStorage.setItem(index, todo);
  editCounts('active', 'minus');
  editCounts('completed', 'plus');
}
