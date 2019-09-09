document.addEventListener('DOMContentLoaded', main)

function main(e) {
    let char = //current character. How to find?
    displayStats(char)
    attackBox(char)
}


function displayStats(char) {
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















