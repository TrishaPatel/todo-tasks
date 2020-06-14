class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /todos
  def index
   @todos = Todo.all
   render json: @todos, each_serializer: TodoSerializer
  end

  # POST /todos
  def create
    @todo = Todo.create(todo_params)
    if @todo.save
      render json: @todo, status: :ok
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # GET /todos/:id
  def show
    render json: @todo
  end

  # PUT /todos/:id
  def update
    @todo.update(todo_params)
    if @todo.save
      render json: @todo, status: :ok
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/:id
  def destroy
    @todo.destroy
    head :no_content
  end

  private

  def todo_params
    # whitelist params
    params.require(:todo).permit(:description, :status)
  end

  def set_todo
    @todo = Todo.find(params[:id])
  end
end
