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
    confirm.onclick = event => {
        alert.parentElement.removeChild(alert)
        deleteChar(event)
    }
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
    fetch(BASE_URL+`/characters/${event.target.value}`, {method: 'DELETE'})
        .then(loggedIn(), removeCharFromDropdown(`char-${event.target.value}`))
}


function editChar(e) {
    console.log('sadg')
    fetch(BASE_URL+`/characters/${event.target.value}`)
        .then(response => response.json())
        .then(character => loadEditSheet(character))
}

function loadEditSheet(char) {   
    // clearPage('editForm', 'flex')
    let charSheet = document.getElementById('charSheet')
    charSheet.style.display = 'none'
    let createForm = document.getElementById('createForm')
    createForm.style.display = 'none'
    let editForm = document.getElementById('editForm')
    editForm.style.display = 'flex'
    let loginPage = document.getElementById('login')
    loginPage.style.display = 'none'
    let rulesPage = document.getElementById('rules')
    rulesPage.style.display = 'none'
    
    
    let page = document.getElementById('page')
    let div = document.getElementById('createCharacter')
    let charForm = document.getElementById('charForm')
    
    
    let name = document.getElementById('name-field')
    name.defaultValue = char.name

    let charDescrip = document.getElementById('charDescrip')
    charDescrip.setAttribute('placeholder', 'A brave (or stupid) adventurer!')
    charDescrip.defaultValue = char.description
    
    let weaponMenu = document.getElementById('selectWeapon')
    // set it so their weapon is selected by default

    let armorMenu = document.getElementById('selectArmor')
    // set it so their armor is selected by default

    let pic = document.getElementById('pic-field')
    pic.defaultValue = char.img_url
    pic.classList.add('form-control')
    
    let submitBtn = document.getElementById('edit-character')
    submitBtn.setAttribute('value', char.id)
    submitBtn.onclick = event => {
        event.preventDefault()
        submitCharChanges(char)
    }

}

function submitCharChanges(charInfo){
    console.log('charInfo in submitCharChanges', charInfo)

    let pic_url = document.getElementById('pic-field').value
    if (pic_url == ""){
        pic_url = 'https://media.wizards.com/2015/images/dnd/ClassSymb_Fighter.png'
    }
    let char = {
        'name' : document.getElementById('name-field').value,
        'description' : document.getElementById('charDescrip').value,
        'race_id' : charInfo.race_id,
        'user_id' : localStorage.getItem('user_id'),
        'class_type_id' : charInfo.class_type_id,
        'weapon' : document.getElementById('selectWeapon').value,
        'armor' : document.getElementById('selectArmor').value,
        'img_url' : pic_url
    }
    //optimistically render charactersheet with new info
    editCharacterInDropdown(charInfo)

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

    let pic_url = document.getElementById('pic-field').value
    if (pic_url == ""){
        pic_url = 'https://media.wizards.com/2015/images/dnd/ClassSymb_Fighter.png'
    }
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
            'armor' : document.getElementById('selectArmor').value,
            'img_url' : pic_url

        })
    })
        .then(response => response.json()) 
        .then(json => {
            if (!!json.error){
                let alert = document.createElement('div')
                alert.classList.add('alert')
                alert.classList.add('alert-danger')
                alert.setAttribute('role', 'alert')
                alert.textContent = 'Every hero needs a name!' 
                let dismiss = document.createElement('button')
                dismiss.setAttribute('type', 'button')
                dismiss.setAttribute('data-dismiss', 'alert')
                dismiss.setAttribute('aria-label', 'Close')
                dismiss.classList.add('close')
                dismiss.textContent = 'X'
                alert.appendChild(dismiss)
                
                let charForm = document.getElementById('charForm')
                charForm.appendChild(alert)
            } else{
                displayStats(json)
                addOptionToCharacterDropdown(json)
            }
        })       
}


function useSpellSlot(char){
    char.spell_slots--
    fetch(BASE_URL+'/characters/'+char.id,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(char)
    })
    let slots = document.getElementById('slots')
    if (char.spell_slots > 0){
        slots.innerText = 'Remaining Spell Slots: ' + char.spell_slots
    } else{
        slots.textContent = 'No more spell slots!'
        document.getElementById('cast-button').style.display = 'none'
    }
}

function updateHP(){
    
    let id = document.getElementById('edit-char').getAttribute('value')
    let hp = document.getElementById('hp').value
    console.log(hp)
    fetch(BASE_URL+'/characters/'+id,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            'hp': hp
        })
    })
}

function returnToTown(event){
    $('#restModal').modal('toggle')
    let charID = document.getElementById('edit-char').value
    let loot = document.getElementById('rest-silver-looted').value
    let partySize = document.getElementById('rest-party-size').value
    let bonusXP = document.getElementById('rest-bonus-xp').value
    let wizConfirm = {
        'isWiz' : document.getElementById('class').getAttribute('value'),
        'keepSpells' : document.getElementById('wiz-confirm').value
    }
        fetch(BASE_URL+'/characters/'+charID+'/restAtTown',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                "Accept":   'application/json'
            },
            body: JSON.stringify({
                'loot': loot,
                'partySize': partySize,
                'bonusXP': bonusXP,
                'wizConfirm' : wizConfirm
            })
        })
        .then(response => response.json())
        .then(json => displayStats(json))

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



