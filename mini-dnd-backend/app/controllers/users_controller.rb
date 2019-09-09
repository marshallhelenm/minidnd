class UsersController < ApplicationController

    def login
        found_user = User.where ("username = '#{params[:userName]}'").length == 1
        if (found_user)
            render json: {message: "User Found" }
        else
            User.create({username: params[:userName]})
            render json: {message: "User Created" }
        end
    end
end
