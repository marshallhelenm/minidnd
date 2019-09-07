class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :hp, :armor, :abilities, :athletics, :subterfuge, :lore, :physical_save, :magic_save
  has_one :user
  has_one :class_type
  has_one :race
end
