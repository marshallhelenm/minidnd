class UsersController < ApplicationController

    def show
        user = User.find(params[:id])
        characters = {}
        user.characters.each do |character|
            characters[character.id] = character.name
        end
        render json: characters
    end

    def get_user_data
        user = User.find(params[:user_id])
        if (!!user.characters.first)
            @character = user.characters.first
            # byebug
            characterData = {stats: @character, race: @character.race, class_type: @character.class_type}
            render json: {hasCharacter: 'true', character: characterData}
        else
            render json: {hasCharacter: 'false'}
        end
    end

    def login
        found_user = User.where ("username = '#{params[:userName]}'")
        if (found_user.length > 0)
            found_user = found_user[0]
            render json: {message: "User #{found_user.id} Found", user_id: found_user.id}
        else
            new_user = User.create({username: params[:userName]})
            render json: {message: "User #{new_user.id} Created", user_id: new_user.id}
        end 
    end

    def logout
    end



end
