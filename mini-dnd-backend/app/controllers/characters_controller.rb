class CharactersController < ApplicationController

    # index, show, new, create, edit, update, delete
    def new
    end

    def create
        # byebug
        char = Character.new(char_params)
        char.assignStats
        char.save
    end


    private

    def char_params
        params.require(:character).permit(:name, :user_id, :class_type_id, :race_id, :weapon, :armor)
    end
    
    

end    






