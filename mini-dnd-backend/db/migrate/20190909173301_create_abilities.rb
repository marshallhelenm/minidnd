class CreateAbilities < ActiveRecord::Migration[5.2]
  def change
    create_table :abilities do |t|
      t.integer :race_id
      t.integer :class_type_id
      t.integer :character_id
      t.string :description

      t.timestamps
    end
  end
end
