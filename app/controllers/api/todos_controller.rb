class Api::TodosController < ApplicationController
  respond_to :json

  before_action :find_todo, only: [:destroy, :update]

  def index
    todos = Todo.all
    respond_with :api, todos, each_serializer: TodoSerializer
  end

  def create
    todo = Todo.create(todo_params)
    respond_with :api, todo
  end

  def update
    if @todo.update(todo_params)
      render json: @todo, serializer: TodoSerializer
    end
  end

  def destroy
    @todo.destroy
    render json: @todo, serializer: TodoSerializer
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :completed_at)
  end

  def find_todo
    @todo = Todo.find(params[:id])
  end
end