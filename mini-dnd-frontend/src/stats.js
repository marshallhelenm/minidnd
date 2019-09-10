// grab select character drop down and give it event listener to execute loadCharacter

function loadCharacter(e) {
    let char = //current character. How to find?
    displayStats(char)
    attackBox(char)
    abilitiesBox(char)
}


function displayStats(char) {
    loadCharSheet()
    document.getElementById('class').innerText = `Class: ${char.class_type.name}`

    document.getElementById('race').innerText = `Race: ${char.race.name}`

    document.getElementById('initiative').innerText = '+ ' + char.initiative

    document.getElementById('phys_save').innerText = '+ ' + char.physical_save

    document.getElementById('mag_save').innerText = '+ ' + char.magic_save

    document.getElementById('char_name').innerText = char.name

    document.getElementById('char_description').innerText = char.description

    document.getElementById('athletics').innerText = '+ ' + char.athletics

    document.getElementById('subterfuge').innerText = '+ ' + char.subterfuge

    document.getElementById('lore').innerText = '+ ' + '+ ' + char.lore
}

function attackBox(char) {
    let box = document.getElementById('attacks')
    let numAtk = document.createElement('h3')
    numAtk.textContent = `Number of Attacks: ${char.attacks}`
    let weapon = document.createElement('h3')
    weapon.textContent = `Weapon: ${char.weapon}`
    box.appendChild(weapon)
    let atk = document.createElement('button')
    atk.textContent = '+ ' + char.toHit
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















