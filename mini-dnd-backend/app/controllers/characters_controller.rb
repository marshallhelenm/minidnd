class CharactersController < ApplicationController

    # index, show, new, create, edit, update, delete
    def show
        characterStats = Character.find(params[:id])
        char = {stats: characterStats, 
                race: characterStats.race, 
                class_type: characterStats.class_type}
        render json: {character: char}
    end
    
    def new
    end

    def create
        char = Character.new(char_params)
        assignStats(char)
        char.save
    end


    private

    def char_params
        params.require(:character).permit(:id, :name, :user_id, :class_type_id, :race_id, :weapon, :armor, :xp, :level, :initiative)
    end
    
    def assignStats(char)
        char.level = 1
        char.xp = 0
        char.calculateStats
        char.maxHP
    end

end    






