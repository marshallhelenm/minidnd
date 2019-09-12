class Character < ApplicationRecord
  belongs_to :user
  belongs_to :class_type
  belongs_to :race
  has_many :race_abilities, through: :race
  has_many :class_type_abilities, through: :class_type
  has_many :prepared_spells
  has_many :spells, through: :prepared_spells
  attr_accessor :initiative

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
        dwarf_bonus = 2*self.level
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

    self.hp = self.max_hp
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

  def getInitiative
      bonus = self.mv
      if self.class_type.sub_type == 'Rogue'
        bonus += 2
      end
      return bonus
  end

  def calculateStats
    self.armor_class = self.armorClass
    self.athletics = self.athletics_bonus
    self.subterfuge = self.subterfuge_bonus
    self.lore = self.lore_bonus
    self.physical_save = self.phys_save
    self.magic_save = self.mag_save
    self.initiative = self.getInitiative
  end

  def prepareSpells
  
    #Number of Spell slots
    if (self.class_type.caster_type == 'none')
      self.spell_slots = 0
      return
    end

    self.spell_slots = 1 + self.level
    if (self.spell_slots > 10)
      self.spell_slots = 10
    end
    if (self.class_type.caster_type == 'half')
      self.spell_slots = self.spell_slots/2
    end



    #Number of Prepared Spells
    num_prepared_spells = 0

    if (self.class_type.caster_type == 'full')
      num_prepared_spells = 2 + self.level/2
      if (num_prepared_spells > 7)
        num_prepared_spells = 7
      end
    end
    if (self.class_type.caster_type == 'half')
      if (self.level == 1)
        num_prepared_spells = 1
      elsif (self.level >= 5)
        num_prepared_spells = 3
      else
        num_prepared_spells = 2
      end
    end

    #Prepare Spells
    self.spells = []
    self.save

    if(self.class_type.name == 'Cleric')
      spell = Spell.find_by(name: 'Turn Undead')
      PreparedSpell.new(character_id: self.id, spell_id: spell.id)
    end

    if(self.class_type.name == 'Druid')
          spell = Spell.find_by(name: 'Wildshape')
      PreparedSpell.new(character_id: self.id, spell_id: spell.id)
    end


    classSpellList = Spell.where("spell_type = '#{self.class_type.magic_type}'")
    spells_to_prepare = []

    while (spells_to_prepare.uniq.length < num_prepared_spells)
      spells_to_prepare = spells_to_prepare.uniq
      spells_to_prepare.push(classSpellList.sample)
    end

    spells_to_prepare.each do |spell|
      #PreparedSpell.new(character_id: self.id, spell_id: spell.id)
      self.spells << Spell.find(spell.id)
    end

    self.save
  end


  def levelUp
    self.level = level + 1
    self.calculateStats
    self.maxHP
  end

  def returnToSafety(loot=0,bonus_xp=0,party_size=6)
    if loot == ''
      loot = 0
    end
    if bonus_xp == ''
      bonus_xp = 0
    end
    if party_size == ''
      party_size = 6
    end
    loot = loot.to_i
    bonus_xp = bonus_xp.to_i
    party_size = party_size.to_i
        # byebug
    total_revenue = loot 
    share = total_revenue/party_size
    profit = share - (self.level*10)
    if (profit < 0)
      profit = 0
    end

    self.xp += profit + bonus_xp
    
    if (self.xp >= xpToLevel(self.level))
      self.levelUp
    end

    self.hp = self.max_hp
    self.prepareSpells
    self.save
        # byebug
  end

  def xpToLevel(level)
      if (level == 1)
        return 100
      end
      return (level*100) + xpToLevel(level-1)
  end
end
