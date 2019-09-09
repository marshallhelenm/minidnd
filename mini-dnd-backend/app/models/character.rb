class Character < ApplicationRecord
  belongs_to :user
  belongs_to :class_type
  belongs_to :race


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
    return bonus
  end

  def initiative
    init = char.mv
    if char.class_type.sub_type == 'Rogue'
      init += 2
    end
    return init
  end
  def armorClass 
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

    self.armor_class = ac
  end

  def maxHP 
      maxhp = 0
      if self.race_id == 3
          maxhp += 2*character.level
      end
      self.max_hp = maxhp
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
  end

  def phys_save
      phys = self.level
      if self.class_type.sub_type != 'Caster'
          phys += 2
      end
      self.physical_save = phys
  end

  def mag_save
      mag = self.level
      if self.class_type.sub_type != 'Warrior'
          mag += 2
      end
      self.magic_save = mag
  end

  def attacks
    if self.weapon == 'finesse' && self.class_type_id == 3 # if monk
    elsif self.weapon == 'finesse'
      num = 2
    else
      num = 1
    end
    if self.class_type.sub_type == 'Warrior'
      num += (self.level - 1)/3
    end
    return num
  end

  def toHit
      bonus = self.level
      if self.race_id == 7 # if they are a half-orc
        bonus += 1
      end
      return bonus
  end

end
