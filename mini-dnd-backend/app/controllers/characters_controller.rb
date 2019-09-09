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


    def assignStats(char)
        char.armorClass
        char.maxHP
        char.athletics
        char.subterfuge
        char.lore
        char.phys_save
        char.mag_save
    end

    def char_params
        params.require(:character).permit(:name, :user_id, :class_type_id, :race_id, :weapon, :armor)
    end
    
end    






