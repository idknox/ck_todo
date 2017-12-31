import React from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../services/ApiService';
import Button from '../Button/Button';

import './TodoForm.scss';

export default class TodoForm extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    activateView: PropTypes.func.isRequired,
    displayError: PropTypes.func
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
    this.props.activateView('To Do')
  }

  render() {
    return (
      <form className="TodoForm box"
            onSubmit={this.createTodo}
      >
        <input
          className="form-control"
          type="text"
          ref={input => this.nameInput = input}
          value={this.state.todo.name}
          placeholder='Enter a To Do description'
          onChange={this.setTodo}
          required='true'
        />
        <Button
          type="submit"
          label="Add To Do Item"
          className="blue"
        />
      </form>
    )
  }
}