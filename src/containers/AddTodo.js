import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addTodo} from '../actions';
import SharedPreferences from './../../SharedPreferences';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  addTodo = async () => {
    if (this.state.text.length !== 0) {
      const nextIndex =
        this.props.todos.length > 0
          ? this.props.todos[this.props.todos.length - 1].id + 1
          : 1;
      this.props.addTodo(nextIndex, this.state.text);
      const newTodolist = [
        ...this.props.todos,
        {id: nextIndex, text: this.state.text, completed: false},
      ];
      SharedPreferences.setItem('todos', JSON.stringify(newTodolist));
      this.setState({...this.state, text: ''});
      this.props.hideTodo();
    }
  };
  render() {
    return (
      <View style={{marginHorizontal: 20}}>
        <TextInput
          value={this.state.text}
          onChangeText={value => this.setState({text: value})}
          placeholder="Enter your todo"
          style={{
            borderWidth: 1,
            borderColor: '#f2f21e',
            padding: 5,
            fontSize: 16,
          }}
          multiline={true}
          numberOfLines={8}
          scrollEnabled={true}
        />
        <TouchableOpacity onPress={() => this.addTodo()}>
          <View
            style={{
              height: 50,
              backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              marginTop: 16,
              borderRadius: 6,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>ADD</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  addTodo: (id, text) => dispatch(addTodo(id, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo); //whenever there is no mapStateToProps then pass null in the first argument of a=connect
