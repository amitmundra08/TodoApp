import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import AddTodo from './containers/AddTodo';
import VisibleTodos from './containers/VisibleTodos';
import Footer from './containers/Footer';
import {ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {setTodo, setLoadingStatus} from '../src/actions';
import {connect} from 'react-redux';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTodo: false,
    };
  }
  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    const getTodos = await AsyncStorage.getItem('todos');
    const parsedTodos = JSON.parse(getTodos);
    const finalTodos = parsedTodos ? parsedTodos : [];
    this.props.setTodo(finalTodos);
    this.props.setLoadingStatus(false);
  };

  hideTodo = () => {
    this.setState({showAddTodo: false});
  };
  render() {
    const {showAddTodo} = this.state;
    const {loadingStatus} = this.props;
    if (loadingStatus) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <Text>Loading Data</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            {showAddTodo ? (
              <AddTodo hideTodo={() => this.hideTodo()} />
            ) : (
              <View />
            )}
            {!showAddTodo ? (
              <Animatable.View animation={'slideInLeft'}>
                <TouchableOpacity
                  style={[styles.roundButton]}
                  onPress={() => this.setState({showAddTodo: true})}>
                  <Text>Add Todo</Text>
                </TouchableOpacity>
              </Animatable.View>
            ) : (
              <View />
            )}
          </View>
          <View>
            <VisibleTodos />
          </View>
        </ScrollView>

        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loadingStatus: state.loadingStatus.loadingStatus,
});

const mapDispatchToProps = dispatch => ({
  setTodo: todo => dispatch(setTodo(todo)),
  setLoadingStatus: status => dispatch(setLoadingStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  roundButton: {
    height: 40,
    width: 100,
    borderRadius: 25,
    backgroundColor: '#BBDEFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
});
