import {connect} from 'react-redux';
import {toggleTodo, deleteTodo} from '../actions';
import {VisibilityFilters} from '../actions';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SharedPreferences from '../../SharedPreferences';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

class VisibleTodos extends React.Component {
  constructor(props) {
    super(props);
  }
  toggleTodo = id => {
    const newtodoList = this.props.allTodos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    ); //store this to async storage
    SharedPreferences.setItem('todos', JSON.stringify(newtodoList));

    this.props.toggleTodo(id);
  };

  deleteTodo = id => {
    const newtodoList = this.props.allTodos.filter(todo => todo.id !== id); //store this to async storage
    SharedPreferences.setItem('todos', JSON.stringify(newtodoList));

    this.props.deleteTodo(id);
  };

  render() {
    const {todos} = this.props;

    return (
      <View style={{padding: 10}}>
        {todos.map(todo => (
          <View
            style={{
              backgroundColor: 'rgba(235,232,104,0.5)',
              marginHorizontal: 10,
              marginBottom: 2,
              padding: 16,
              elevation: 1,
              borderRadius: 8,
              flex: 1,
              marginTop: 8,
            }}
            key={todo.id}>
            <View>
              <Text
                style={{
                  fontSize: 22,
                  textDecorationLine: todo.completed ? 'line-through' : null,
                }}>
                {todo.text}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                marginTop: 16,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#2196F3',
                  padding: 8,
                  borderRadius: 8,
                }}
                onPress={() => this.toggleTodo(todo.id)}>
                <Text>
                  {todo.completed ? 'Make As Undone' : 'Make As Done'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#2196F3',
                  padding: 8,
                  borderRadius: 8,
                  marginLeft: 8,
                }}
                onPress={() => this.deleteTodo(todo.id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
  allTodos: state.todos,
  loadingStatus: state.loadingStatus,
});

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id)),
  deleteTodo: id => dispatch(deleteTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisibleTodos);
