import React from 'react';
import Immutable from 'immutable';
import ApiService from '../../services/ApiService';
import TodoForm from '../../components/TodoForm/TodoForm';
import './TodoApp.scss';

export default class TodoApp extends React.Component {
  api = new ApiService();

  constructor(props) {
    super(props);
    this.setInitialState();
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
        <div>
          Complete
          {this.completeTodos().map(todo =>
            <div key={todo.id}>
              {todo.name}
            </div>
          )}
        </div>

        <div>
          Incomplete
          {this.incompleteTodos().map(todo =>
            <div key={todo.id}>
              {todo.name}
            </div>
          )}
        </div>
      </div>
    )
  }
}
