class Todo {
  constructor(content) {
    this.state = 'active';
    this.content = content;
  }
}

let currentTab;

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

function appendTodoItem(input) {
  const index = Date.now();
  let value = JSON.stringify(new Todo(input));
  localStorage.setItem(index, value);
  editCounts('active', 'plus');
}

function removeTodoItem(index) {
  let item = JSON.parse(localStorage.getItem(index));
  editCounts(item.state, 'minus');
  localStorage.removeItem(index);
}

function hasCompleted(index) {
  let todo = JSON.parse(localStorage.getItem(index));
  todo.state = 'completed';
  localStorage.setItem(index, JSON.stringify(todo));
  editCounts('active', 'minus');
  editCounts('completed', 'plus');
}

function removeAllCompletedItems() {
  getTodosFrom('completed').forEach(item => {
    removeTodoItem(item.index);
  });
}

function getTodoCounts() {
  return parseInt(localStorage.getItem('active')) + parseInt(localStorage.getItem('completed'));
}

function getTodosFrom(state) {
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