import React from 'react';
import Immutable from 'immutable';
import ApiService from '../../services/ApiService';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoList from '../../components/TodoList/TodoList';

import './TodoApp.scss';

export default class TodoApp extends React.Component {
  api = new ApiService();

  constructor(props) {
    super(props);
    this.setInitialState();
    this.removeTodo = this.removeTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.updateList = this.updateList.bind(this);

  }

  setInitialState() {
    this.state = {
      todos: Immutable.List()
    };
  }

  componentDidMount() {
    this.fetchTodos()
  }

  fetchTodos() {
    this.api.get('todos.json', this.setTodos.bind(this));
  }

  setTodos(todos) {
    this.setState({
      todos: Immutable.List(todos)
    });
  }

  addTodo(todo) {
    this.setState({
      todos: this.state.todos.push(todo)
    })
  }

  updateTodo(endpoint, payload) {
    this.api.patch(endpoint, payload, this.updateList);
  }


  removeTodo(endpoint) {
    this.api.destroy(endpoint, this.updateList);
  }

  updateList(todo, remove = null) {
    let todos = this.state.todos;

    let i = todos.findIndex(thisTodo => {
      return thisTodo.id === todo.id;
    });


    let finalList = remove ? todos.delete(i) : todos.update(i, _ => todos[i] = todo);

    this.setState({
      todos: finalList
    });
  }

  incompleteTodos() {
    return this.state.todos
      .filterNot((todo) => {
        return todo.completed_at;
      })
      .sortBy(todo => todo.created_at);
  }

  completeTodos() {
    return this.state.todos
      .filter((todo) => {
        return todo.completed_at;
      })
      .sortBy(todo => todo.completed_at);
  }

  render() {
    return (
      <div className='TodoApp'>
        <TodoForm
          addTodo={this.addTodo.bind(this)}
        />
        <TodoList
          todos={this.incompleteTodos()}
          emptyLabel='No incomplete items exist yet.'
          updateTodo={this.updateTodo}
          removeTodo={this.removeTodo}
          active={this.state.activeView === 'To Do'}
          title='To Do'
        />
        <TodoList
          emptyLabel='No complete items exist yet.'
          todos={this.completeTodos()}
          updateTodo={this.updateTodo}
          removeTodo={this.removeTodo}
          active={this.state.activeView === 'Completed'}
          title='Complete'
        />
      </div>
    )
  }
}
