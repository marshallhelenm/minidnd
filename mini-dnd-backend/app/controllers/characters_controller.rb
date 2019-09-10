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
        char.armorClass
        char.maxHP
        char.athletics
        char.subterfuge
        char.lore
        char.phys_save
        char.mag_save
    end


end    






