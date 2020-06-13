class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :description
      t.string :string
      t.integer :status

      t.timestamps
    end
  end
end
