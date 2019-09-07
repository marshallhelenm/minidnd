class Character < ApplicationRecord
  belongs_to :user
  belongs_to :class_type
  belongs_to :race
end
