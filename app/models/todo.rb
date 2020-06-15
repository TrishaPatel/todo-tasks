class Todo < ApplicationRecord
  # validation
  validates_presence_of :status
  validates :description, presence: true
  validates_uniqueness_of :description, case_sensitive: false
end
