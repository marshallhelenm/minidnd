class UsersController < ApplicationController

    def login
        found_user = User.where ("username = '#{params[:userName]}'")
        if (found_user.length > 0)
            found_user = found_user[0]
            render json: {message: "User #{found_user.id} Found", user_id: found_user.id}
        else
            new_user = User.create({username: params[:userName]})
            render json: {message: "User #{new_user.id} Created", user_id: new_user.id}
        end #ignore this comment 
    end
end
