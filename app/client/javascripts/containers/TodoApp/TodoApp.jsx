import React from 'react';
import Immutable from 'immutable';
import ApiService from '../../services/ApiService';
import Tabs from '../../components/Tabs/Tabs';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoList from '../../components/TodoList/TodoList';
import './TodoApp.scss';

export default class TodoApp extends React.Component {
  api = new ApiService(this.displayError.bind(this));

  constructor(props) {
    super(props);
    this.setInitialState();
    this.activateView = this.activateView.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  setInitialState() {
    this.state = {
      todos: Immutable.List(),
      activeView: 'To Do'
    };
  }

  componentDidMount() {
    this.fetchTodos()
  }

  displayError() {
    this.setState({hasError: true})
  }

  activateView(view) {
    this.setState({activeView: view})
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
          activateView={this.activateView}
          displayError={this.displayError.bind(this)}
        />
        {this.state.hasError &&
        <div className="error">
          We encountered an error. Please refresh the page or try again later.
        </div>
        }
        <div className='box'>
          <Tabs
            options={['To Do', 'Completed']}
            activateView={this.activateView}
            activeView={this.state.activeView}
          />
          <TodoList
            todos={this.incompleteTodos()}
            emptyLabel='No incomplete items exist yet.'
            updateTodo={this.updateTodo}
            removeTodo={this.removeTodo}
            active={this.state.activeView === 'To Do'}
          />
          <TodoList
            emptyLabel='No complete items exist yet.'
            todos={this.completeTodos()}
            updateTodo={this.updateTodo}
            removeTodo={this.removeTodo}
            active={this.state.activeView === 'Completed'}
          />
        </div>
      </div>
    )
  }
}
