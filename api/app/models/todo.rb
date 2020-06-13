class Todo < ApplicationRecord
  # validation
  validates_presence_of :description, :status
end
