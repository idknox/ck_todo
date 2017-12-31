import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import TodoListItem from '../TodoListItem/TodoListItem'
import './TodoList.scss';

export default class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.instanceOf(Immutable.List).isRequired,
    emptyLabel: PropTypes.string.isRequired,
    updateTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={`TodoList`}>
        <div>{this.props.title}</div>
        {this.props.todos.size === 0 ? (
          <div className="no-results">
            {this.props.emptyLabel}
          </div>
        ) : (
          <ul>
            {this.props.todos.map(todo =>
              <TodoListItem
                key={todo.id}
                todo={todo}
                removeTodo={this.props.removeTodo}
                updateTodo={this.props.updateTodo}
              />
            )}
          </ul>
        )}
      </div>
    )
  }
}