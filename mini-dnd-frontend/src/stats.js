// grab select character drop down and give it event listener to execute loadCharacter



function displayStats(char) {
    console.log(char)
    loadCharSheet() //contains clearPage
    document.getElementById('class').innerText = `Class: ${char.class_type.name}`

    document.getElementById('race').innerText = `Race: ${char.race.name}`

    document.getElementById('char_name').innerText = char.name

    document.getElementById('char_description').innerText = char.description

    //saves
    document.getElementById('phys_save').innerText += ' +' + char.physical_save

    document.getElementById('mag_save').innerText += ' +' + char.magic_save

    document.getElementById('initiative').innerText += ' +' + char.initiative

    //skills
    document.getElementById('athletics').innerText += ' +' + char.athletics

    document.getElementById('subterfuge').innerText += ' +' + char.subterfuge

    document.getElementById('lore').innerText += ' +' + char.lore

    //other

    document.getElementById('ac').innerText += ' ' + char.armor_class
    document.getElementById('hp').innerText += ' ' + char.hp + '/' + char.max_hp
    attackBox(char)
    abilitiesBox(char)

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
    let weapon = document.createElement('h3')
    weapon.textContent = `${capitalize(char.weapon)} Weapon`
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

    text = number + 'Attack'
    if (number > 1) {text += 's'}

    if (char.class_type.name == 'Warlock' && char.race.name == 'Dragon'){
      text = 'Pick 2: ' + text + ", Eldritch Blast, Breath Attack"
      return text   
    } 
    if (char.class_type.name == 'Warlock'){text += ' + Eldritch Blast'}
    if (char.race.name == 'Dragonborn'){text += ' + Breath Attack'}
    
    return text
}

function abilitiesBox(char){
    let abList = document.getElementById('abilities')

    while (abList.firstChild){
        abList.removeChild(abList.firstChild)
    }

    let allAbilities = char.abilities

    for (let i = 0; i < allAbilities.length; i++){
        let ab = document.createElement('p')
        ab.innerText = allAbilities[i].description
        abList.appendChild(ab)
    }
}















