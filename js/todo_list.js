initTodo();
function enter() {
  if(event.keyCode === 13) {
    appendTodo(input.value);
  }
}