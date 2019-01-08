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
  localStorage.setItem(index, JSON.stringify(todo));
  editCounts('active', 'minus');
  editCounts('completed', 'plus');
}

function removeCompleted() {
  getTodos('completed').forEach(item => {
    localStorage.removeItem(item.index);
  });
}

function getTodoCounts() {
  return parseInt(localStorage.getItem('active')) + parseInt(localStorage.getItem('completed'));
}

function getTodos(state) {
  let counts = getTodoCounts();
  let result = [];
  for (let i = 0; i < counts; i++) {
    let key = localStorage.key(i);
    let todo = JSON.parse(localStorage.getItem(key));
    if (state === 'all') {
      result.unshift({
        'index': key,
        'todo': todo
      });
    } else {
      if (todo.state === state) {
        result.unshift({
          'index': key,
          'todo': todo
        });
      }
    }
  }
  return result;
}