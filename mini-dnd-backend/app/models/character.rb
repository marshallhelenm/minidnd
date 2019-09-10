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
    if self.race_id == 1 # if they are a human
        bonus += 1
    end
    return bonus
  end

  def initiative
    init = self.mv
    if self.class_type.sub_type == 'Rogue'
      init += 2
    end
    return init
  end

  def armorClass
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

    return ac
  end

  def maxHP
    hitDie = 0
    case self.class_type.sub_type
    when 'Warrior'
        hitDie = 10
    when 'Rogue'
        hitDie = 8
    when 'Caster'
        hitDie = 6
    end

    if self.level == 1
    self.max_hp = rand(hitDie)+1
    end

    dwarf_bonus = 0  #0 unless you are a dwarf
    if self.race_id == 3
        dwarf_bonus = 2*character.level
        self.max_hp = self.max_hp - dwarf_bonus + 2
    end

    newRoll = 0
    i = 0
    while(i < self.level)
    i += 1
    newRoll += rand(hitDie)+1
    end
    
    if newRoll > self.max_hp
        self.max_hp = newRoll + dwarf_bonus
    else
        self.max_hp += dwarf_bonus
    end
  end


  def athletics_bonus
    ath = self.skillBonus
    if self.race_id == 2 || self.race_id == 3 || self.race_id == 7 #if they are a dragonborn, dwarf, or half-orc
        ath += 1
    end
    if self.class_type.sub_type == 'Warrior'
        ath += self.level
    else
        ath += self.level/2
    end
    return ath
  end

  def subterfuge_bonus
    sub = self.skillBonus
    if self.race_id == 6 || self.race_id == 8 #if they are a halfling or tiefling
        sub += 1
    end

      if self.class_type.sub_type == 'Rogue'
          sub += self.level
      else
          sub += self.level/2
      end
      
      return sub
  end

  def lore_bonus
    lor = self.skillBonus
    if self.race_id == 4 || self.race_id == 5 #if they are a elf or gnome
        lor += 2
    end

    if self.class_type.sub_type == 'Caster'
        lor += self.level
    else
        lor += self.level/2
    end

    return lor
  end

  def phys_save
    phys = self.level
    if self.class_type.sub_type != 'Caster'
        phys += 2
    end
    return phys
  end

  def mag_save
      mag = self.level
      if self.class_type.sub_type != 'Warrior'
          mag += 2
      end
      if self.race_id == 4 #if Elf
          mag += 2
      end
      return mag
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
