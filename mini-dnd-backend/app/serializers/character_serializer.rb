class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :description, 
  :max_hp, :hp, :armor_class,
  :armor, :weapon, 
  :athletics, :subterfuge, :lore, 
  :physical_save, :magic_save, 
  :class_type, :race, :race_abilities, :class_type_abilities,
  :spell_slots, :spells, :img_url
end
