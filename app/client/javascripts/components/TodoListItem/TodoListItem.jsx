import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../Button/Button';
import FontAwesomeIcon from '../FontAwesomeIcon/FontAwesomeIcon';
import './TodoListItem.scss';

export default class TodoListItem extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    removeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
  };

  endpoint = `todos/${this.props.todo.id}.json`;
  formattedCreation = moment(this.props.todo.completed_at).format('MMM Do YYYY, h:mmA');

  constructor(props) {
    super(props);
    this.updateTodo = this.updateTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  updateTodo(e) {
    e.preventDefault();
    e.stopPropagation();

    let timestamp = this.props.todo.completed_at ? null : moment();
    let payload = {todo: {completed_at: timestamp}};

    this.props.updateTodo(this.endpoint, payload)
  }

  removeTodo(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.removeTodo(this.endpoint)
  }

  render() {
    return (
      <li
        className={`TodoListItem`}
      >
        <span className='name'>
          {this.props.todo.name}
        </span>

        {this.props.todo.completed_at ? (
          <div className='completed'>
            {`Completed ${this.formattedCreation}`}
          </div>
        ) : (
          <Button
            type="button"
            onClick={this.updateTodo}
            className='complete grey'

            label={
              <FontAwesomeIcon
                name='check'
              />
            }
          />
        )}

        {this.props.todo.completed_at &&
        <Button
          type="button"
          onClick={this.updateTodo}
          className='reopen green'
          label={
            <FontAwesomeIcon
              name='check'
            />
          }
        />
        }

        <Button
          type="button"
          onClick={this.removeTodo}
          className='destroy'
          label={
            <FontAwesomeIcon
              name='trash'
              className='grey-dark'
            />
          }
        />
      </li>
    )
  }
}