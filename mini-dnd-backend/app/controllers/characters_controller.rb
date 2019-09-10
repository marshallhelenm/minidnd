class CharactersController < ApplicationController

    # index, show, new, create, edit, update, delete
    def show
        char = Character.find(params[:id])
        render json: char
    end
    
    def new
    end

    def create
        # byebug
        char = Character.new(char_params)
        assignStats(char)
        char.save
    end


    private

    def char_params
        params.require(:character).permit(:id, :name, :user_id, :class_type_id, :race_id, :weapon, :armor)
    end
    
    def assignStats(char)
        char.level = 1
        char.armor_class = char.armorClass
        char.athletics = char.athletics_bonus
        char.subterfuge = char.subterfuge_bonus
        char.lore = char.lore_bonus
        char.physical_save = char.phys_save
        char.magic_save = char.mag_save
        char.max_hp = char.maxHP
    end

end    






