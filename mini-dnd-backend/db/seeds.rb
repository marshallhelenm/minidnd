# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



Race.create(name: 'Human')
Race.create(name: 'Dragonborn')
Race.create(name: 'Dwarf')
Race.create(name: 'Elf')
Race.create(name: 'Gnome')
Race.create(name: 'Halfling')
Race.create(name: 'Half-Orc')
Race.create(name: 'Tiefling')

ClassType.create(name: 'Fighter', sub_type: 'Warrior')
ClassType.create(name: 'Barbarian', sub_type: 'Warrior')
ClassType.create(name: 'Monk', sub_type: 'Warrior')
ClassType.create(name: 'Paladin', sub_type: 'Warrior')
ClassType.create(name: 'Thief', sub_type: 'Rogue')
ClassType.create(name: 'Bard', sub_type: 'Rogue')
ClassType.create(name: 'Ranger', sub_type: 'Rogue')
ClassType.create(name: 'Cleric', sub_type: 'Caster')
ClassType.create(name: 'Druid', sub_type: 'Caster')
ClassType.create(name: 'Sorcerer', sub_type: 'Caster')
ClassType.create(name: 'Warlock', sub_type: 'Caster')
ClassType.create(name: 'Wizard', sub_type: 'Caster')

# Racial Abilities:
Ability.create(race_id: 1, description: '10% bonus XP.')
Ability.create(race_id: 1, description: '+1 to all skills.')
Ability.create(race_id: 2, description: 'Dragon Breath for 1d6 damage. Choose fire, lightning, cold, or acid damage at character creation.')
Ability.create(race_id: 3, description: 'See in the dark.')
Ability.create(race_id: 3, description: '+2 HP per Level')
Ability.create(race_id: 4, description: '+2 to saves against magic.')
Ability.create(race_id: 5, description: 'Can talk to small animals or vermin')
Ability.create(race_id: 6, description: 'Reroll any 1’s, keep new result.')
Ability.create(race_id: 7, description: '+1 to hit with weapons')
Ability.create(race_id: 8, description: 'See in the dark.')
Ability.create(race_id: 8, description: 'Cast darkness 1/venture.')

# Class Abilities:

Ability.create(class_type_id: 1, description: '+2 Armor Class')
Ability.create(class_type_id: 2, description: '+2 Damage with Martial or Large weapons')
Ability.create(class_type_id: 3, description: 'Fists are light weapons. Extra unarmed attack if not using a shield.')
Ability.create(class_type_id: 4, description: '+2 Damage against undead.')
Ability.create(class_type_id: 5, description: 'x3 damage if attacking while unseen')
Ability.create(class_type_id: 6, description: 'Adds level to all skill checks (instead of half level)')
Ability.create(class_type_id: 7, description: "Has an animal companion. The animal companion shares the Ranger's initiative and takes one action.")
Ability.create(class_type_id: 8, description: 'Always have Turn Undead prepared as a spell.')
Ability.create(class_type_id: 9, description: 'Always has Wildshape prepared as a spell.')
Ability.create(class_type_id: 10, description: 'Prepares 1 fewer spell. Can cast 1 extra spell each day.')
Ability.create(class_type_id: 11, description: 'Eldritch Blast for 1d8 damage (can be done with attack)')
Ability.create(class_type_id: 12, description: 'Can choose not to reroll spells each day. (All or none)')


# Spells:

Spell.create(spell_type: 'Divine', name: 'Animate Dead', description: 'Creates up to (L) skeletons or zombies from nearby corpses.')
Spell.create(spell_type: 'Divine', name: 'Blindness', description: 'Remove a creature’s sight for (L) rounds, save to avoid.')
Spell.create(spell_type: 'Divine', name: 'Command', description: 'Speak a 1 word command to a creature, they must follow the command. Save to avoid.')
Spell.create(spell_type: 'Divine', name: 'Commune', description: 'Ask (L/2) yes/no questions to your deity.')
Spell.create(spell_type: 'Divine', name: 'Cure Wounds', description: '(Touch) Heals target (L/2)d8+(L/2) HP.')
Spell.create(spell_type: 'Divine', name: 'Darkness', description: 'Magical darkness fills a 15’ radius sphere.')
Spell.create(spell_type: 'Divine', name: 'Detect Evil', description: 'Sense nearby evil for 10 minutes.')
Spell.create(spell_type: 'Divine', name: 'Flame Strike', description: 'Attack one creature for (L/2)d8 fire damage.')
Spell.create(spell_type: 'Divine', name: 'Glyph of Warding', description: 'Inscribe a glyph on a surface or object. Any creature that interacts with the object takes (L/2)d8 damage.')
Spell.create(spell_type: 'Divine', name: 'Insect Plague', description: 'Fills an area with angry insects. Creatures inside take (L/2)d4 damage/round. Lasts 10 minutes.')
Spell.create(spell_type: 'Divine', name: 'Light', description: '1 object touched gives off light. Lasts (L) hours.')
Spell.create(spell_type: 'Divine', name: 'Locate Object', description: 'Describe an object (in general or particular), you know the direction to it. At 3rd level, you also know how far away it is.')
Spell.create(spell_type: 'Divine', name: 'Prayer', description: 'Allies receive +1 to rolls, enemies receive -1 to rolls for (L/2) rounds. ')
Spell.create(spell_type: 'Divine', name: 'Remove Curse', description: 'Remove a curse from a creature or object.')
Spell.create(spell_type: 'Divine', name: 'Healing Word', description: '(Range) Heals target (L/2)d4+(L/2) HP.')
Spell.create(spell_type: 'Divine', name: 'Restore', description: 'Removes disease or poison from a (L/2) targets.')
Spell.create(spell_type: 'Divine', name: 'Revivify', description: 'Brings someone who died in the last minute back to life with 1 HP.')
Spell.create(spell_type: 'Divine', name: 'Sanctuary', description: 'Creatures must make a save to attack you. If they fail, their turn is over. Lasts for (L/2) rounds.')
Spell.create(spell_type: 'Divine', name: 'Speak With Dead', description: ': Ask (L) questions to a corpse. This doesn’t work if the creature was hostile to you in life. You must share a language to communicate.')
Spell.create(spell_type: 'Divine', name: 'Tongues', description: 'Gain the ability to understand any language. Lasts for (L) minutes.')
Spell.create(spell_type: 'Cleric', name: 'Turn Undead', description: '(L) undead are frightened and must flee from you. Intelligent undead may save to resist.')


Spell.create(spell_type: 'Nature', name: 'Animal Friendship', description: 'Convince up to (L) animals that you’re friendly. Save to avoid.')
Spell.create(spell_type: 'Nature', name: 'Animal Messenger', description: 'A small animal delivers a message to a person of your choice. The message can be 5*L words long.')
Spell.create(spell_type: 'Nature', name: 'Summon Animals', description: 'Conjure (L/2) animal that act on your behalf for (L) rounds.')
Spell.create(spell_type: 'Nature', name: 'Barkskin', description: '1 creature gains (L/3) AC for (L/2) rounds.')
Spell.create(spell_type: 'Nature', name: 'Produce Flame', description: 'Gain the ability to throw flame as an attack (1d8 damage) for L rounds.')
Spell.create(spell_type: 'Nature', name: 'Create Water', description: 'Creates (2*L) gallons of water.')
Spell.create(spell_type: 'Nature', name: 'Darkvision', description: 'Grants (L/2) Creatures the ability to see in the dark. Lasts 1 hour.')
Spell.create(spell_type: 'Nature', name: 'Commune With Nature', description: 'Ask (L) questions about the environment and terrain.')
Spell.create(spell_type: 'Nature', name: 'Control Winds', description: 'Create currents of air that can push/knock over Medium or smaller creatures. Save avoids. Lasts (L) minutes.')
Spell.create(spell_type: 'Nature', name: 'Darkness', description: 'Magical darkness fills a 15’ radius sphere.')
Spell.create(spell_type: 'Nature', name: 'Entangle', description: 'Fills an area with grasping routes. Creatures inside are stuck until they make a save.')
Spell.create(spell_type: 'Nature', name: 'Fog Cloud', description: 'Create an obscuring patch of fog that you can control for (L) minutes.')
Spell.create(spell_type: 'Nature', name: 'Insect Plague', description: 'Fills an area with angry insects. Creatures inside take (L/2)d4 damage/round. Lasts 10 minutes.')
Spell.create(spell_type: 'Nature', name: 'Light', description: '1 object touched gives off light. Lasts (L) hours.')
Spell.create(spell_type: 'Nature', name: 'Pass Without Trace', description: 'Up to (L) creatures leave no trace of their presence for 1 hour. This includes footprints or scents.')
Spell.create(spell_type: 'Nature', name: 'Plant Growth', description: 'Causea a plant you can see to grow to massive size.')
Spell.create(spell_type: 'Nature', name: 'Speak With Animals', description: 'Speak with animals for (L) minutes.')
Spell.create(spell_type: 'Nature', name: 'Stone Shape', description: 'Reshape an (L)’ diameter section of stone to your will.')
Spell.create(spell_type: 'Nature', name: 'Wall of Thorns', description: 'Create a wall of thorny bushes. Creatures that move through take (L/2)d4 damage.')
Spell.create(spell_type: 'Nature', name: 'Water Breathing', description: 'Grant up to (L) creatures the ability to breath underwater for (L) hours.')
Spell.create(spell_type: 'Druid', name: 'Wildshape', description: 'Take on the form of an animal for (L) hours. You may end this spell at will.')


Spell.create(spell_type: 'Arcane', name: 'Burning Hands', description: '')
Spell.create(spell_type: 'Arcane', name: 'Charm', description: 'Creatures within a 15’ cone take (L/2)d4 damage. Save for half damage.')
Spell.create(spell_type: 'Arcane', name: 'Darkness', description: '1 creature not being attacked by you or your allies becomes your friend for (L) minutes. Save to avoid.')
Spell.create(spell_type: 'Arcane', name: 'Detect Magic', description: 'Sense the presence of nearby magic.')
Spell.create(spell_type: 'Arcane', name: 'Enlarge', description: 'Cause a creature or object to double in size. Creatures deal double damage while giant. Lasts (L) rounds')
Spell.create(spell_type: 'Arcane', name: 'Feather Fall', description: 'Up to (L) falling creatures land safely on the ground.')
Spell.create(spell_type: 'Arcane', name: 'Fireball', description: 'Burn everyone in an area for (L/2)d6 damage')
Spell.create(spell_type: 'Arcane', name: 'Floating Disc', description: 'Creates a circular disc that follows you for (10*L) minutes. It can carry up to one ton.')
Spell.create(spell_type: 'Arcane', name: 'Grease', description: 'Make a surface slippery for (L) minutes. Any creature on it must save or fall.')
Spell.create(spell_type: 'Arcane', name: 'Identify', description: 'Learn the properties of a magical item or spell.')
Spell.create(spell_type: 'Arcane', name: 'Invisibility', description: 'Turn a creature invisible for (L) minutes. This ends if they make an attack or cast a spell.')
Spell.create(spell_type: 'Arcane', name: 'Light', description: '1 object touched gives off light. Lasts (L) hours.')
Spell.create(spell_type: 'Arcane', name: 'Lightning Bolt', description: 'Creates a blast of lighting in a straight line. Deals (L/2)d6 damage.')
Spell.create(spell_type: 'Arcane', name: 'Magic Missile', description: '(L/2) darts strike creature(s) of your choice. Each dart deals 1d4+1 damage. No attack roll needed.')
Spell.create(spell_type: 'Arcane', name: 'Mending', description: 'Fixes or repairs a broken object.')
Spell.create(spell_type: 'Arcane', name: 'Illusion', description: 'Creates a sound or image of your choice for up to (L) minutes.')
Spell.create(spell_type: 'Arcane', name: 'Sleep', description: 'Up to (L) creatures must make a save or fall asleep.')
Spell.create(spell_type: 'Arcane', name: 'Spider Climb', description: 'Give one creature the ability to walk on walls and ceilings. Lasts (L) rounds.')
Spell.create(spell_type: 'Arcane', name: 'Unseen Servant', description: 'Creates an invisible servant that can follow simple commands for (L) hours. Can’t fight.')
Spell.create(spell_type: 'Arcane', name: 'Wall of Force', description: 'Create (L) 5x5’ square(s) of force. They cannot be passed through. Lasts (L) rounds.')

User.create(username: 'Helen')
User.create(username: 'Nick')

Character.create(name: 'Maiele Glynydark', class_type_id: 3, race_id: 4, user_id: 1, max_hp: 8, armor: 12, weapon: 'light', athletics: 8, subterfuge: 8, lore: 8, physical_save: 8, magic_save: 10)
















