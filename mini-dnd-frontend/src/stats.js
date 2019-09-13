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

    let atkButton = document.createElement('button')
    atkButton.textContent = "Weapon Attack"
    atkButton.setAttribute('name','Weapon Attack')
    atkButton.setAttribute('value',char.toHit)
    atkButton.setAttribute('damageDie',char.damageDie)
    atkButton.setAttribute('damageMod',0)
    atkButton.classList.add('btn')
    atkButton.classList.add('btn-outline-secondary')
    atkButton.addEventListener('click', event => {rollForAttack(event)})

    weapon.textContent = `${capitalize(char.weapon)} Weapon - AB +${char.toHit} - DMG: 1d${char.damageDie}`
    

    switch(char.weapon){
        case 'finesse':
            break;
        case 'ranged':
            break;
        case 'martial':
            if (char.class_type.name == "Barbarian"){
                weapon.textContent += ' +2'
                atkButton.setAttribute('damageMod',2)
            }
            break;
        case 'large':
            if (char.class_type.name == "Barbarian"){
                weapon.textContent += ' +2'
                atkButton.setAttribute('damageMod',2)
            }
            break;
    }
    if (char.class_type.name == "Paladin"){
        weapon.textContent += ' (+2 against undead)'
    }
    box.appendChild(weapon)
    box.appendChild(atkButton)


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
    spellBox.classList.add('horz')
    
    let castBox = document.createElement('div')
    
    let title = document.createElement('h3')
    title.textContent = 'Spells'
    spellBox.appendChild(title)
    
    let slotBar = document.createElement('div')
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

    let spellsLeft = document.createElement('div')
    // spellsLeft.classList.add('horz')
    // spellsLeft.classList.add('vert')
    spellsLeft.classList.add('bottom-left')
    spellsLeft.appendChild(title)
    spellsLeft.appendChild(castBox)

    spellBox.appendChild(spellsLeft)
    spellBox.appendChild(preparedSpells)
}

function rollForSuccess(event){
    // <button type="button" class="btn btn-secondary" data-dismiss="modal">Done</button>
    let modalButtons = document.getElementById('dice-modal-footer')
    while (modalButtons.firstChild){ modalButtons.removeChild(modalButtons.firstChild)}
    let closeButton = document.createElement('button')
    closeButton.classList.add('btn','btn-secondary')
    closeButton.setAttribute('type','button')
    closeButton.setAttribute('data-dismiss','modal')
    closeButton.textContent = 'Done'
    modalButtons.appendChild(closeButton)

    $('#diceModal').modal('toggle')
    let dialogue = document.getElementById('diceModal-body')
    
    document.getElementById('diceModal-title').textContent = 'Rolling ' + event.target.name
    
    while (dialogue.firstChild){
        dialogue.removeChild(dialogue.firstChild)
    }

    let firstRoll = rollDie(dialogue,Number(event.target.value),20)

    let result = document.createElement('strong')
    if (firstRoll >= 20){
        result.textContent = "Success\n"
    } else {
        result.textContent = "Failure\n"
    }
    dialogue.appendChild(result)

    dialogue.appendChild(document.createElement('br'))

    let advButton = document.createElement('button')
    advButton.addEventListener('click',() => {additionalRoll(true,Number(event.target.value),firstRoll)})
    advButton.textContent = 'Advantage'
    dialogue.appendChild(advButton)

    let disadvButton = document.createElement('button')
    disadvButton.addEventListener('click',() => {additionalRoll(false,Number(event.target.value),firstRoll)})
    disadvButton.textContent = 'Disadvantage'
    dialogue.appendChild(disadvButton)
}

function rollForAttack(event, numAttack=1){
    let modalButtons = document.getElementById('dice-modal-footer')
    while (modalButtons.firstChild){ modalButtons.removeChild(modalButtons.firstChild)}

    let newAttack = document.createElement('button')
    newAttack.classList.add('btn','btn-secondary')
    newAttack.setAttribute('type','button')
    // newAttack.setAttribute('data-dismiss','modal')
    newAttack.textContent = 'Attack Again'
    newAttack.addEventListener('click', () => {rollForAttack(event, ++numAttack)})
    modalButtons.appendChild(newAttack)

    let closeButton = document.createElement('button')
    closeButton.classList.add('btn','btn-secondary')
    closeButton.setAttribute('type','button')
    closeButton.setAttribute('data-dismiss','modal')
    closeButton.textContent = 'Done'
    modalButtons.appendChild(closeButton)



    if (numAttack == 1){ $('#diceModal').modal('toggle') }
    let dialogue = document.getElementById('diceModal-body')
    
    let title = document.getElementById('diceModal-title')
    title.textContent = 'Rolling ' + event.target.name
    if (numAttack > 1){
        title.textContent += ` ${numAttack}`
    }

    while (dialogue.firstChild){
        dialogue.removeChild(dialogue.firstChild)
    }

    let firstRoll = rollDie(dialogue,Number(event.target.value),20)

    let result = document.createElement('strong')
    result.textContent = `${firstRoll} to Hit`
    dialogue.appendChild(result)

    dialogue.appendChild(document.createElement('br'))

    let advButton = document.createElement('button')
    advButton.addEventListener('click',() => {additionalRoll(true,Number(event.target.value),firstRoll,true)})
    advButton.textContent = 'Advantage'
    dialogue.appendChild(advButton)

    let disadvButton = document.createElement('button')
    disadvButton.addEventListener('click',() => {additionalRoll(false,Number(event.target.value),firstRoll,true)})
    disadvButton.textContent = 'Disadvantage'
    dialogue.appendChild(disadvButton)

    console.log(event.target)
    let damageRoll = rollDie(dialogue,Number(event.target.getAttribute('damagemod')),Number(event.target.getAttribute('damagedie')))
    let damageText = document.createElement('strong')
    damageText.textContent = `${damageRoll} Damage`
    dialogue.appendChild(damageText)
}

function additionalRoll(advantage,mod,firstRoll,isAttackRoll){
    let dialogue = document.getElementById('diceModal-body')
    console.log(dialogue.children)
    dialogue.removeChild(dialogue.children[1])//remove break
    dialogue.removeChild(dialogue.children[1])//remove disadvantage button
    dialogue.removeChild(dialogue.children[1])//remove advantage button
    dialogue.removeChild(dialogue.children[1])//remove result

    let info = document.createElement('p')
    if (advantage){
        info.textContent = 'Rolling Advantage'
    } else { info.textContent = 'Rolling Disadvantage'}
    dialogue.appendChild(info)

    let secondRoll = rollDie(dialogue,mod,20)

    if (isAttackRoll){
        let result = document.createElement('strong')
        dialogue.appendChild(result)
        if(advantage){
            if (firstRoll > secondRoll){
                result.textContent = firstRoll
            } else {
                result.textContent = secondRoll
            }
        }
        else{
            if (firstRoll > secondRoll >= 20){
                result.textContent = secondRoll
            } else {
                result.textContent = firstRoll
            }
        }
        result.textContent += ' to Hit'

        //Move Damage Roll Output to the end
        let move1 = dialogue.children[1]
        dialogue.appendChild(move1)
        let move2 = dialogue.children[1]
        dialogue.appendChild(move2)
    } else {
        let result = document.createElement('strong')
        dialogue.appendChild(result)
        if(advantage){
            if (firstRoll >= 20 || secondRoll >= 20){
                result.textContent = "Success"
            } else {
                result.textContent = "Failure"
            }
        }
        else{
            if (firstRoll >= 20 && secondRoll >= 20){
                result.textContent = "Success"
            } else {
                result.textContent = "Failure"
            }
        }
    }
}

function rollDie(dialogue,mod,size=20){

    let intro = document.createElement('p')
    intro.textContent = `Rolling d${size}: `
    dialogue.appendChild(intro)

    let isHalfling = document.getElementById('race').getAttribute('value') == 'Halfling'
    console.log('Is Halfling? ', isHalfling)

    let roll = Math.floor(Math.random() * size) + 1
    let result = roll+Number(mod)
    intro.textContent += ` ${roll}`
    if (mod > 0) { intro.textContent += ` + ${mod}`}
    intro.textContent += ` = `
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











