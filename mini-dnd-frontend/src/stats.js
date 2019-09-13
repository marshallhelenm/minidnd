// grab select character drop down and give it event listener to execute loadCharacter



function displayStats(char) {
        console.log('char in displayStats:', char)
    loadCharSheet() //contains clearPage
    document.getElementById('class').innerText = `Class: ${char.class_type.name}`
    document.getElementById('class').setAttribute('value',char.class_type.name)

    document.getElementById('race').innerText = `Race: ${char.race.name}`
    document.getElementById('race').setAttribute('value',char.race.name)

    document.getElementById('char_name_h1').innerText = char.name

    document.getElementById('char_description').innerText = char.description

    document.getElementById('char_photo').setAttribute('src',char.img_url)
    //saves
    document.getElementById('phys_save').innerText += ' +' + char.physical_save
    document.getElementById('phys_save').setAttribute('value',char.physical_save)
    document.getElementById('phys_save').setAttribute('name','Save vs Physical')
    document.getElementById('phys_save').addEventListener('click',rollForSuccess)

    document.getElementById('mag_save').innerText += ' +' + char.magic_save
    document.getElementById('mag_save').setAttribute('value',char.magic_save)
    document.getElementById('mag_save').setAttribute('name','Save vs Magic')
    document.getElementById('mag_save').addEventListener('click',rollForSuccess)

    document.getElementById('initiative').innerText += ' +' + char.initiative
    document.getElementById('initiative').setAttribute('value',char.initiative)
    document.getElementById('initiative').setAttribute('name','Initiative')
    document.getElementById('initiative').addEventListener('click',rollForSuccess)

    //skills
    document.getElementById('athletics').innerText += ' +' + char.athletics
    document.getElementById('athletics').setAttribute('value',char.athletics)
    document.getElementById('athletics').setAttribute('name','Athletics')
    document.getElementById('athletics').addEventListener('click',rollForSuccess)

    document.getElementById('subterfuge').innerText += ' +' + char.subterfuge
    document.getElementById('subterfuge').setAttribute('value',char.subterfuge)
    document.getElementById('subterfuge').setAttribute('name','Subterfuge')
    document.getElementById('subterfuge').addEventListener('click',rollForSuccess)

    document.getElementById('lore').innerText += ' +' + char.lore
    document.getElementById('lore').setAttribute('value',char.lore)
    document.getElementById('lore').setAttribute('name','Lore')
    document.getElementById('lore').addEventListener('click',rollForSuccess)

    //other
    document.getElementById('level').innerText += ' ' + char.level
    document.getElementById('xp').innerText += ' ' + char.xp
    document.getElementById('ac').innerText += ' ' + char.armor_class
    document.getElementById('hp').value = char.hp
    document.getElementById('maxHp').textContent += char.max_hp
    attackBox(char)
    abilitiesBox(char)
    spellsBox(char)

    //edit and delete buttons
    let delBtn = document.getElementById('del-char')
    delBtn.setAttribute('value', char.id)

    let editBtn = document.getElementById('edit-char')
    editBtn.setAttribute('value', char.id)
}

function attackBox(char) {
    let box = document.getElementById('attacks')
    let numAtk = document.createElement('p')
    numAtk.textContent = writeNumAttacks(char)
    box.appendChild(numAtk)
    let weapon = document.createElement('p')

    console.log(char.weapon)
    weapon.textContent = `${capitalize(char.weapon)} Weapon - DMG: `
    
    switch(char.weapon){
        case 'finesse':
            weapon.textContent += '1d4'
            break;
        case 'ranged':
            weapon.textContent += '1d6'
            break;
        case 'martial':
            weapon.textContent += '1d8'
            if (char.class_type.name == "Barbarian"){
                weapon.textContent += ' +2'
            }
            break;
        case 'large':
            weapon.textContent += '1d12'
            if (char.class_type.name == "Barbarian"){
                weapon.textContent += ' +2'
            }
            break;
    }
            if (char.class_type.name == "Paladin"){
                weapon.textContent += ' (+2 against undead)'
            }


    box.appendChild(weapon)



    let atk = document.createElement('button')
    atk.textContent = '+ ' + char.toHit
}

function writeNumAttacks(char){
    let number = 1
    let text = ''
    if (char.weapon == 'finesse'){
        number++
        if (char.class_type.name == 'Monk'){
            number++
        }
    }
    if (char.class_type.sub_type == 'Warrior'){
        console.log('warrior bonus attacks')
        number += (char.level-1)/3
    }
    
    text = number + ' Attack'
    if (number > 1) {text += 's'}

    if (char.class_type.name == 'Warlock' && char.race.name == 'Dragonborn'){
      text = 'Pick 2: ' + text + ", Eldritch Blast, Breath Attack"
      return text   
    } else{
        if (char.class_type.name == 'Warlock'){text += ' + Eldritch Blast'}
        if (char.race.name == 'Dragonborn'){text += ' + Breath Attack'}
    }
    return text
}

function abilitiesBox(char){
    let abList = document.getElementById('abilities')

    while (abList.firstChild){
        abList.removeChild(abList.firstChild)
    }

    let title = document.createElement('h3')
    title.textContent = 'Abilities'
    abList.appendChild(title)

    let allAbilities = [char.class_type_abilities,char.race_abilities].flat()
    for (let i = 0; i < allAbilities.length; i++){
        let ab = document.createElement('p')
        ab.innerText = allAbilities[i].description
        abList.appendChild(ab)
    }
}

function spellsBox(char){
    if (char.class_type.caster_type == 'none'){
        return
    }   
    
    let spellBox = document.getElementById('spells')
    spellBox.classList.add('bottom-item')
    
    let castBox = document.createElement('div')
    castBox.classList.add('bottom-left')
    
    let title = document.createElement('h3')
    title.textContent = 'Spells'
    spellBox.appendChild(title)
    
    let slotBar = document.createElement('span')
    castBox.appendChild(slotBar)
    
    let slots = document.createElement('p')
    slots.setAttribute('id','slots')
    if (char.spell_slots > 0){
        slots.textContent = 'Remaining Spell Slots: ' + char.spell_slots
        
    } else{
        slots.textContent = 'No more spell slots'
    }
    castBox.appendChild(slots)
    
    let castBtn = document.createElement('button')
    castBtn.textContent = 'Cast Spell'
    castBtn.setAttribute('id','cast-button')
    castBtn.classList.add('btn-outline-dark')
    castBtn.classList.add('btn')
    castBtn.addEventListener('click',() =>{useSpellSlot(char)})
    castBox.appendChild(castBtn)
    
    if (char.spell_slots == 0){
        castBtn.style.display = 'none'
    } 
    
    let preparedSpells = document.createElement('ul')
    preparedSpells.classList.add('bottom-right')
    for(let spell of char.spells){
        let spellListing = document.createElement('li')
        spellListing.textContent = spell.name +": " + spell.description
        preparedSpells.appendChild(spellListing)
    }
    spellBox.appendChild(castBox)

    let notTitle = document.createElement('div')
    notTitle.classList.add('horz')
    notTitle.appendChild(castBox)
    notTitle.appendChild(preparedSpells)

    spellBox.appendChild(notTitle)
}

function rollForSuccess(event){
    $('#diceModal').modal('toggle')
    let dialogue = document.getElementById('diceModal-body')
    
    document.getElementById('diceModal-title').textContent = 'Rolling ' + event.target.name
    
    while (dialogue.firstChild){
        dialogue.removeChild(dialogue.firstChild)
    }


    


    let firstRoll = rollDie(dialogue,event.target.value,20)

    let firstResult = document.createElement('strong')
    if (firstRoll >= 20){
        firstResult.textContent = "Success"
    } else {
        firstResult.textContent = "Failure"
    }
    dialogue.appendChild(firstResult)


}

function rollDie(dialogue,mod,size=20){

    let intro = document.createElement('p')
    intro.textContent = `Rolling d${size}: `
    dialogue.appendChild(intro)

    let isHalfling = document.getElementById('race').getAttribute('value') == 'Halfling'
    console.log('Is Halfling? ', isHalfling)

    let roll = Math.floor(Math.random() * size) + 1
    let result = roll+Number(mod)
    intro.textContent += ` ${roll} + ${mod} = `
    intro.textContent += `${result}`
    

    if (roll == 1 && isHalfling){

        let output = document.createElement('p')
        output.textContent = `Halfling reroll: d${size}: `
        dialogue.appendChild(output)
        roll = Math.floor(Math.random() * size) + 1
        output.textContent += ` ${roll} + ${mod} = `
        result = roll+Number(mod)
        output.textContent += `${result}`
    }

    return result
}











