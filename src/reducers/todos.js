export default todos = function(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {id: action.id, text: action.text, completed: false}];
    case 'DELETE_TODO':
      const filteredTodos = state.filter(todo => todo.id !== action.id);
      return [...filteredTodos];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? {...todo, completed: !todo.completed} : todo,
      );
    case 'SET_TODO':
      return [...action.todo];
    case 'default':
      return state;
  }
  return state;
};
