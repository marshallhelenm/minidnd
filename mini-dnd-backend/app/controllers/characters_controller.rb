class CharactersController < ApplicationController

    # index, show, new, create, edit, update, delete
    def show

        @char = Character.find(params[:id])
        @char.calculateStats()
        render :json => @char
    end
    
    def new
        
    end

    def create
        # byebug
        @char = Character.new(char_params)
        assignStats(@char)
        @char.prepareSpells        
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

    def restAtTown
        @char = Character.find(params[:id])
        loot = params[:loot]
        bonus_xp = params[:loot]
        party_size = params[:loot]
        @char.returnToSafety(loot,bonus_xp,party_size)
        @char = Character.find(params[:id])
        render :json => @char
    end

    def destroy
        @char = Character.find(params[:id])
        @char.delete
    end


    private

    def char_params
        params.require(:character).permit(:id, :name, :user_id, :class_type_id, :race_id, :weapon, :armor, :xp, :level, :spell_slots, :description)
    end
    
    def assignStats(char)
        char.calculateStats
        char.maxHP
    end

end    






