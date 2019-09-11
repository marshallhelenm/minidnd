class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.references :user, foreign_key: true
      t.references :class_type, foreign_key: true
      t.references :race, foreign_key: true
      t.string :weapon
      t.string :armor
      t.string :description, default: 'A brave (or foolish) adventurer!'
      #calculated things:
      t.integer :armor_class
      t.integer :athletics
      t.integer :subterfuge
      t.integer :lore
      t.integer :physical_save
      t.integer :magic_save
      t.integer :initiative
      t.integer :max_hp
      t.integer :hp
      t.integer :level
      t.integer :xp

      t.integer :spell_slots

      t.timestamps
    end
  end
end
