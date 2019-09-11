class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :hp, :armor, :athletics, :subterfuge, :lore, :physical_save, :magic_save, :class_type, :race, :race_abilities, :class_type_abilities
end
