function confirmDelete(e){
    let alert = document.createElement('div')
    alert.classList.add('alert')
    alert.classList.add('alert-danger')
    alert.setAttribute('role', 'alert')
    alert.textContent = 'Warning, you are about to delete this adventurer! This action cannot be undone!'
    alert.appendChild(document.createElement('hr'))

    let confirm = document.createElement('button')
    confirm.setAttribute('value', event.target.value)
    confirm.onclick = event => deleteChar(event)
    confirm.classList.add('close')
    confirm.textContent = 'Delete'
    confirm.onclick = event => deleteChar(event)
    alert.appendChild(confirm)
    
    let dismiss = document.createElement('button')
    dismiss.setAttribute('type', 'button')
    dismiss.setAttribute('data-dismiss', 'alert')
    dismiss.setAttribute('aria-label', 'Close')
    dismiss.classList.add('close')
    dismiss.textContent = 'Cancel'
    alert.appendChild(dismiss)

    let bottom = document.getElementById('bottom')
    bottom.appendChild(alert)
}

function deleteChar(e) {
    
    console.log("That's so sad!")
    console.log(event.target.value)
    fetch(BASE_URL+`/characters/${event.target.value}`, {method: 'DELETE'})
        .then(loggedIn(), removeCharFromDropdown(`char-${event.target.value}`))
}


function editChar(e) {
    console.log("Changin' things up.")
    fetch(BASE_URL+`/characters/${event.target.value}`)
        .then(response => response.json())
        .then(character => loadEditSheet(character))
}

function loadEditSheet(char) {   
    clearPage() 
    let page = document.getElementById('page')
    let div = document.createElement('div')
    div.classList.add('vert')
    div.setAttribute('id', 'createCharacter')
    let charForm = document.createElement('form')
    charForm.setAttribute('id', 'charForm')
    charForm.classList.add('vert')
    page.appendChild(div)
    
    
    let title =  document.createElement('h2')
    title.innerText = 'Edit Character'
    div.appendChild(title)
    
    let name = document.createElement('input')
    name.setAttribute('placeholder', 'char.name')
    name.defaultValue = char.name
    name.setAttribute('type', 'text')
    name.setAttribute('id', 'selectName')
    name.classList.add('form-control')
    let nameDiv = document.createElement('div')
    nameDiv.classList.add('form-group')
    nameDiv.appendChild(name)

    let charDescrip = document.createElement('textarea')
    charDescrip.setAttribute('placeholder', char.description)
    charDescrip.defaultValue = char.description
    charDescrip.setAttribute('type', 'textarea')
    charDescrip.setAttribute('id', 'charDescrip')
    charDescrip.classList.add('form-control')
    let descripDiv = document.createElement('div')
    descripDiv.classList.add('form-group')
    descripDiv.appendChild(charDescrip)
    
    let weaponMenu = document.createElement('select')
    weaponMenu.setAttribute('id', 'selectWeapon')
    weaponMenu.classList.add('form-control')
    let weaponMenuDiv = document.createElement('div')
    weaponMenuDiv.classList.add('form-group')
    weaponMenuDiv.appendChild(weaponMenu)
    
    let finesse = document.createElement('option')
    finesse.setAttribute('value', 'finesse')
    finesse.textContent = 'Finesse Weapon - d4, attack twice'
    weaponMenu.appendChild(finesse)
    
    let martial = document.createElement('option')
    martial.setAttribute('value', 'martial')
    martial.textContent = 'Martial Weapon - d8, paired with shield'
    weaponMenu.appendChild(martial)
    
    let large = document.createElement('option')
    large.setAttribute('value', 'large')
    large.textContent = 'Large Weapon - d12, two handed'
    weaponMenu.appendChild(large)
    
    let ranged = document.createElement('option')
    ranged.setAttribute('value', 'ranged')
    ranged.textContent = 'Ranged Weapon - d6'
    weaponMenu.appendChild(ranged)
    
    let armorMenu = document.createElement('select')
    armorMenu.setAttribute('id', 'selectArmor')
    armorMenu.classList.add('form-control')
    let armorMenuDiv = document.createElement('div')
    armorMenuDiv.classList.add('form-group')
    armorMenuDiv.appendChild(armorMenu)
    
    let light = document.createElement('option')
    light.setAttribute('value', 'light')
    light.textContent = 'Leather - AC 12 - MV 8'
    armorMenu.appendChild(light)
    
    let medium = document.createElement('option')
    medium.setAttribute('value', 'medium')
    medium.textContent = 'Chain - AC 14 - MV 6'
    armorMenu.appendChild(medium)
    
    let heavy = document.createElement('option')
    heavy.setAttribute('value', 'heavy')
    heavy.textContent = 'Plate - AC 16 - MV 4'
    armorMenu.appendChild(heavy)
    
    let submitBtn = document.createElement('button')
    submitBtn.setAttribute('id', 'edit-character')
    submitBtn.setAttribute('value', char.id)
    submitBtn.onclick = event => {
        submitCharChanges(char)
    }
    submitBtn.textContent = 'Submit Changes'
    submitBtn.classList.add('btn')
    submitBtn.classList.add('btn-outline-success')

    
    charForm.appendChild(nameDiv)
    charForm.appendChild(descripDiv)
    charForm.appendChild(armorMenuDiv)
    charForm.appendChild(weaponMenuDiv)
    charForm.appendChild(submitBtn)
    div.appendChild(charForm)

}

function submitCharChanges(stats){
    let char = {
        'name' : document.getElementById('name-field').value,
        'description' : document.getElementById('charDescrip').value,
        'user_id' : localStorage.getItem('user_id'),
        'weapon' : document.getElementById('selectWeapon').value,
        'armor' : document.getElementById('selectArmor').value,
        'id': event.target.value,
        'race_id': stats.race_id,
        'class_type_id' : stats.class_type_id
    }
    //optimistically render charactersheet with new info
    editCharacterInDropdown(char)

    //fetch to update char on backend
    fetch(BASE_URL+'/characters/'+event.target.value,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            "Accept":   'application/json'
        },
        body: JSON.stringify(char)
    })
        .then(response => response.json())
        .then(character => displayStats(character))
}


function submitNewCharacter(e){
    console.log('submitting new character')

    fetch(BASE_URL+'/characters',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            "Accept":   'application/json'
        },
        body: JSON.stringify({ //:name, :user, :class_type, :race, :weapon, :armor
            'name' : document.getElementById('name-field').value,
            'description' : document.getElementById('charDescrip').value,
            'race_id' : document.getElementById('selectRace').value,
            'user_id' : localStorage.getItem('user_id'),
            'class_type_id' : document.getElementById('selectClass').value,
            'weapon' : document.getElementById('selectWeapon').value,
            'armor' : document.getElementById('selectArmor').value
        })
    })
        .then(response => response.json()) 
        .then(json => {
        addOptionToCharacterDropdown(json)
        displayStats(json)
        })
        
    loadCharSheet()
}


function useSpellSlot(char){
    console.log('Using slot number ',char.spell_slots)
    char.spell_slots--
    fetch(BASE_URL+'/characters/'+char.id,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(char)
    })
    console.log('Down to slot ',char.spell_slots)

    let slots = document.getElementById('slots')
    if (char.spell_slots > 0){
        slots.innerText = 'Remaining Spell Slots: ' + char.spell_slots
    } else{
        slots.textContent = 'No more spell slots!'
        document.getElementById('cast-button').style.display = 'none'
    }
}

function returnToTown(){
    $('#restModal').modal('toggle')
    let charID = document.getElementById('edit-char').value
    let loot = document.getElementById('rest-silver-looted').value
    let partySize = document.getElementById('rest-party-size').value
    let bonusXP = document.getElementById('rest-bonus-xp').value

    fetch(BASE_URL+'/characters/'+charID+'/rest',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            "Accept":   'application/json'
        },
        body: JSON.stringify({
            'loot': loot,
            'partySize': partySize,
            'bonusXP': bonusXP
        })
    })
    .then(response => response.json())
    .then(json => displayStats(json))
}