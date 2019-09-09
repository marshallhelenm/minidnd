class Character < ApplicationRecord
  belongs_to :user
  belongs_to :class_type
  belongs_to :race

  def assignStats
        self.set_armorClass
        self.set_maxHP
        self.set_athletics
        self.set_subterfuge
        self.set_lore
        self.set_phys_save
        self.set_mag_save
    end

    def set_armorClass 
        case self.armor
            when 'light'
                ac = 12
            when 'medium'
                ac = 14
            when 'heavy'
                ac = 16
        end # what armor are they wearing?
    
        if self.weapon == 'martial'
            ac += 1
        end # do they have a shield?
    
        if (self.class_type_id == 1)
            ac += 2
        end # are they a fighter?
    
        self.armor_class = ac
    end
    
    def set_maxHP 
        maxhp = 0
        if self.race_id == 3
            maxhp += 2*character.level
        end
        self.max_hp = maxhp
    end
    
    def set_mv
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

    def set_skillBonus
        bonus = self.mv
        if self.race_id = 1 # if they are an elf
            bonus += 1
        end
        return bonus
    end

    def set_athletics
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
    end

    def set_subterfuge
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
    end

    def set_lore
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
    end

    def set_phys_save
        phys = self.skillBonus
        if self.class_type.sub_type != 'Caster'
            phys += 2
        end
        self.physical_save = phys
    end

    def set_mag_save
        mag = self.skillBonus
        if self.class_type.sub_type != 'Warrior'
            mag += 2
        end
        self.magic_save = mag
    end
end
