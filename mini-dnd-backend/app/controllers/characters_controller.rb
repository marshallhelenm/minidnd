class CharactersController < ApplicationController

    # index, show, new, create, edit, update, delete
    def show

        characterStats = Character.find(params[:id])
        @race = characterStats.race
        @class_type = characterStats.class_type
        @abilityList = []
        @race.race_abilities.each do |ability|
            @abilityList.push(ability)
        end
        @class_type.class_type_abilities.each do |ability|
            @abilityList.push(ability)
        end

        char = {hasCharacter: 'true',
                stats: characterStats, 
                race: @race, 
                class_type: @class_type,
                abilities: @abilityList
                }
        render json: {character: char}
    end

    
    
    def new
        
    end

    def create
        # byebug
        @char = Character.new(char_params)
        assignStats(@char)
        @char.save
        redirect_to @char
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






