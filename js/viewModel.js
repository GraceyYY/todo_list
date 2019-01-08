function getTodoCounts() {
  return parseInt(localStorage.getItem('active')) + parseInt(localStorage.getItem('completed'));
}

function getTodos(state) {
  let counts = getTodoCounts();
  let result = [];
  for (let i = 1; i <= counts; i++) {
    let key = localStorage.key(i);
    let todo = JSON.parse(localStorage.getItem(key));
    if (todo.state === state) {
      result.unshift({
        key: todo
      });
    }
  }
  return result;
}