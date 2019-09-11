class CharactersController < ApplicationController

    # index, show, new, create, edit, update, delete
    def show

        characterStats = Character.find(params[:id])
        render :json => characterStats
        # @race = characterStats.race
        # @class_type = characterStats.class_type
        # @abilityList = []
        # @race.race_abilities.each do |ability|
        #     @abilityList.push(ability)
        # end
        # @class_type.class_type_abilities.each do |ability|
        #     @abilityList.push(ability)
        # end

        # char = {
        #         stats: characterStats, 
        #         race: @race, 
        #         class_type: @class_type,
        #         abilities: @abilityList
        #         }
        # render json: {hasCharacter: 'true', character: char}
    end

    
    def new
        
    end

    def create
        # byebug
        @char = Character.new(char_params)
        @char.level = 1
        @char.xp = 0
        assignStats(@char)
        @char.save
        render :json => @char
    end
    
    def edit
    end

    def update
        @char = Character.find(params[:id])
        @char.update(char_params)
        @char.armor_class = @char.armorClass
        @char.save
        render :json => @char
        
    end


    private

    def char_params
        params.require(:character).permit(:id, :name, :user_id, :class_type_id, :race_id, :weapon, :armor, :xp, :level, :initiative, :description)
    end
    
    def assignStats(char)
        char.calculateStats
        char.maxHP
    end

end    






