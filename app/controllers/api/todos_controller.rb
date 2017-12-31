class Api::TodosController < ApplicationController
  respond_to :json

  def index
    todos = Todo.all
    respond_with :api, todos, each_serializer: TodoSerializer
  end

  def create
    todo = Todo.create(todo_params)
    respond_with :api, todo
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :completed_at)
  end
end