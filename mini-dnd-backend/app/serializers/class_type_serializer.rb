class ClassTypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :armor, :abilities, :athletics, :subterfuge, :lore, :physical_save, :magic_save
end
