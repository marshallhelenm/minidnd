class CreateAbilities < ActiveRecord::Migration[5.2]
  def change
    create_table :abilities do |t|
      t.integer :race_id, default: 0
      t.integer :class_type_id, default: 0
      t.integer :character_id
      t.string :description

      t.timestamps
    end
  end
end
