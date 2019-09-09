# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_09_173844) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "abilities", force: :cascade do |t|
    t.integer "race_id"
    t.integer "class_type_id"
    t.integer "character_id"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "char_spells", force: :cascade do |t|
    t.integer "character_id"
    t.bigint "spell_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["spell_id"], name: "index_char_spells_on_spell_id"
  end

  create_table "characters", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "class_type_id"
    t.bigint "race_id"
    t.string "name"
    t.integer "max_hp"
    t.integer "hp"
    t.integer "armor"
    t.boolean "shield"
<<<<<<< HEAD
    t.integer "weapon"
=======
    t.string "weapon"
>>>>>>> 5ad0a757a60287fdb71e360c798c46e7684c10f7
    t.integer "athletics"
    t.integer "subterfuge"
    t.integer "lore"
    t.integer "physical_save"
    t.integer "magic_save"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["class_type_id"], name: "index_characters_on_class_type_id"
    t.index ["race_id"], name: "index_characters_on_race_id"
    t.index ["user_id"], name: "index_characters_on_user_id"
  end

  create_table "class_types", force: :cascade do |t|
    t.string "name"
<<<<<<< HEAD
    t.string "armor"
    t.string "abilities"
    t.integer "athletics"
    t.integer "subterfuge"
    t.integer "lore"
    t.integer "physical_save"
    t.integer "magic_save"
=======
    t.string "sub_type"
>>>>>>> 5ad0a757a60287fdb71e360c798c46e7684c10f7
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "races", force: :cascade do |t|
    t.string "name"
<<<<<<< HEAD
    t.string "armor"
    t.string "abilities"
    t.integer "athletics"
    t.integer "subterfuge"
    t.integer "lore"
    t.integer "physical_save"
    t.integer "magic_save"
=======
>>>>>>> 5ad0a757a60287fdb71e360c798c46e7684c10f7
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "spells", force: :cascade do |t|
<<<<<<< HEAD
    t.string "type"
=======
    t.string "spell_type"
    t.string "name"
>>>>>>> 5ad0a757a60287fdb71e360c798c46e7684c10f7
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
<<<<<<< HEAD
    t.string "password_digest"
=======
>>>>>>> 5ad0a757a60287fdb71e360c798c46e7684c10f7
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "char_spells", "spells"
  add_foreign_key "characters", "class_types"
  add_foreign_key "characters", "races"
  add_foreign_key "characters", "users"
end
