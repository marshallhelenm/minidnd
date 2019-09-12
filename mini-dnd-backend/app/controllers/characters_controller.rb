class CharactersController < ApplicationController

    # index, show, new, create, edit, update, delete
    def show
        characterStats = Character.find(params[:id])
        render :json => characterStats
    end
    
    def new
        
    end

    def create
        # byebug
        @char = Character.new(char_params)
        @char.level = 1
        @char.xp = 0
        assignStats(@char)
        @char.prepareSpells        
        
        if @char.valid?
            @char.save
            render :json => @char
        else
            render :json => {error: 'Every hero needs a name!'}
        end

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

    def destroy
        @char = Character.find(params[:id])
        @char.delete
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

    private

    def char_params
        params.require(:character).permit(:id, :name, :user_id, :class_type_id, :race_id, :weapon, :armor, :xp, :level, :spell_slots, :description)
    end
    
    def assignStats(char)
        char.calculateStats
        char.maxHP
    end

end    






