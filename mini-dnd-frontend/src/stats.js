// grab select character drop down and give it event listener to execute loadCharacter



function displayStats(char) {
    console.log(char)
    loadCharSheet() //contains clearPage
    document.getElementById('class').innerText = `Class: ${char.class_type.name}`

    document.getElementById('race').innerText = `Race: ${char.race.name}`

    document.getElementById('char_name').innerText = char.stats.name

    document.getElementById('char_description').innerText = char.stats.description

    //saves
    document.getElementById('phys_save').innerText += ' +' + char.stats.physical_save

    document.getElementById('mag_save').innerText += ' +' + char.stats.magic_save

    document.getElementById('initiative').innerText += ' +' + char.stats.initiative

    //skills
    document.getElementById('athletics').innerText += ' +' + char.stats.athletics

    document.getElementById('subterfuge').innerText += ' +' + char.stats.subterfuge

    document.getElementById('lore').innerText += ' +' + char.stats.lore

    //other

    document.getElementById('ac').innerText += ' ' + char.stats.armor_class
    document.getElementById('hp').innerText += ' ' + char.stats.hp + '/' + char.stats.max_hp
    attackBox(char)
    //abilitiesBox(char)
}

function attackBox(char) {
    let box = document.getElementById('attacks')
    let numAtk = document.createElement('h3')
    numAtk.textContent = `Number of Attacks: ${char.stats.attacks}`
    let weapon = document.createElement('h3')
    weapon.textContent = `Weapon: ${char.stats.weapon}`
    box.appendChild(weapon)
    let atk = document.createElement('button')
    atk.textContent = '+ ' + char.stats.toHit
}

function abilitiesBox(char){
    let box = document.getElementById('abilities')
    let allAbilities = Abilities.all
    let ab;
    let classDiv = document.getElementById('class_abilities')
    let raceDiv = document.getElementById('race_abilities')
    for (let i = 0; i < allAbilities.length; i++){
        if (allAbilities[i].race_id == char.race_id) {
            ab = document.createElement('p')
            ab.innerText = allAbilities[i].description
            raceDiv.appendChild(ab)
        } else if (allAbilities[i].class_type_id == char.class_type_id) {
            ab = document.createElement('p')
            ab.innerText = allAbilities[i].description
            classDiv.appendChild(ab)
        }
    }
}















