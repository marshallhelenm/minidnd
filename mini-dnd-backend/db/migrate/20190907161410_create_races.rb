class CreateRaces < ActiveRecord::Migration[5.2]
  def change
    create_table :races do |t|
      t.string :name
      t.string :armor
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
