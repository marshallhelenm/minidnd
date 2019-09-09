class CharactersController < ApplicationController

    # index, show, new, create, edit, update, delete

    private
    
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
    
    def mv
        case (self.armor)
            when 'light'
                mv = 8
            when 'medium'
                mv = 6
            when 'heavy'
                mv = 4
        end
        return mv
    end

    def skillBonus
        bonus = self.mv
        if self.race_id = 1 # if they are an elf
            bonus += 1
        end
    end

    def athletics
        ath = self.skillBonus
        if self.race_id == 2 || self.race_id == 3 || self.race_id == 7 #if they are a dragonborn, dwarf, or half-orc
            ath += 1
        end
        if self.class_type.sub_type == 'Warrior'
            ath += self.level
        else
            ath += self.level/2
        end
        self.athletics = ath
        self.save
    end

    def subterfuge
        sub = self.skillBonus
        if self.race_id == 6 || self.race_id == 8 #if they are a halfling or tiefling
            sub += 1
        end

        if self.class_type.sub_type == 'Rogue'
            ath += self.level
        else
            ath += self.level/2
        end
        
        self.subterfuge = sub
        self.save
    end

    def lore
        lor = self.skillBonus
        if self.race_id == 4 || self.race_id == 5 #if they are a elf or gnome
            lor += 2
        end

        if self.class_type.sub_type == 'Caster'
            lor += self.level
        else
            lor += self.level/2
        end

        self.lore = lor
        self.save
    end

    # def phys_save
    #     phys = self.skillBonus
    #     if self.class_type.sub_type == 'Caster'

    #     end
    # end

end    






