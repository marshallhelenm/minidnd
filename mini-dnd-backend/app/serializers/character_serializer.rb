class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :description,
  :hp, :armor, :weapon, 
  :athletics, :subterfuge, :lore, 
  :physical_save, :magic_save, 
  :class_type, :race, :race_abilities, :class_type_abilities
end
