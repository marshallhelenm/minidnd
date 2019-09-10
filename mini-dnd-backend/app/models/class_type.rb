class ClassType < ApplicationRecord
    has_many :characters
    has_many :users, through: :characters
    has_many :abilities
end
