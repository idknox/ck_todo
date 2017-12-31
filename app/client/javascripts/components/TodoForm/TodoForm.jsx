import React from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../services/ApiService';
import './TodoForm.scss';

export default class TodoForm extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };

  api = new ApiService(this.props.displayError);
  endpoint = 'todos.json';

  constructor(props) {
    super(props);
    this.setInitialState();
    this.setTodo = this.setTodo.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  setInitialState() {
    this.state = {todo: {name: ''}}
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  createTodo(e) {
    e.preventDefault();
    this.api.post(this.endpoint, this.state, this.props.addTodo)
    this.resetForm()
  }

  setTodo(e) {
    this.setState({
      todo: {
        name: e.target.value,
      }
    });
  }

  resetForm() {
    this.setState({
      todo: {name: ''}
    });
    this.nameInput.focus();
  }

  render() {
    return (
      <form className="TodoForm"
            onSubmit={this.createTodo}
      >
        <input
          type="text"
          ref={input => this.nameInput = input}
          value={this.state.todo.name}
          placeholder='Enter your Todo description here'
          onChange={this.setTodo}
          required='true'
        />
        <button
        type='submit'
        >Create</button>
      </form>
    )
  }
}