class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.references :class_type, foreign_key: true
      t.references :race, foreign_key: true
      t.integer :hp
      t.integer :armor
      t.string :abilities
      t.integer :athletics
      t.integer :subterfuge
      t.integer :lore
      t.integer :physical_save
      t.integer :magic_save

      t.timestamps
    end
  end
end
