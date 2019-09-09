class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.references :user, foreign_key: true
      t.references :class_type, foreign_key: true
      t.references :race, foreign_key: true
      t.string :name
      t.integer :max_hp
      t.integer :hp
      t.integer :armor
      t.string :weapon
      t.integer :athletics
      t.integer :subterfuge
      t.integer :lore
      t.integer :physical_save
      t.integer :magic_save
      t.integer :level

      t.timestamps
    end
  end
end
