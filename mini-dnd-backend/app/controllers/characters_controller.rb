class CharactersController < ApplicationController

    # index, show, new, create, edit, update, delete
    def show
        char = Character.find(params[:id])
        render json: char
    end
    
    def new
    end

    def create
        char = Character.new(char_params)
        assignStats(char)
        char.save
    end


    private

    def char_params(params)
        params.require(:character).permit(:id, :name, :user, :class_type, :race, :weapon, :armor)
    end
    
    def assignStats(char)
        char.armorClass
        char.maxHP
        char.athletics
        char.subterfuge
        char.lore
        char.phys_save
        char.mag_save
    end


end    






