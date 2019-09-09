class CharactersController < ApplicationController

def armorClass(character) {
    case character.armor
        when 'light'
            ac = 12
        when 'medium'
            ac = 14
        when 'heavy'
            ac = 16
    end # what armor are they wearing?

    if character.weapon == 'martial'
        ac += 1
    end # do they have a shield?

    if (character.class_type_id == 1)
        ac += 2
    end # are they a fighter?

    self.ac = ac
    self.save
    
end

def hitPoints 
    hitpoints = 0
    if self.race_id == 3
        hitpoints += 2*character.level
    end
    self.max_hp = hitpoints
    self.save
end


