class Api::TodosController < ApplicationController
  respond_to :json

  def index
    todos = Todo.all
    respond_with :api, todos, each_serializer: TodoSerializer
  end
end