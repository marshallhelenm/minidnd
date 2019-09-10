function clearPage() {
    let page = document.getElementById('page')
    while (page.firstChild){
        page.removeChild(page.firstChild)
    } 
    return page
}

function loadLogIn(){
    let page = document.getElementById('page')

    let div = document.createElement('div')
    div.setAttribute('id', 'login')
    page.appendChild(div)

    let field = document.createElement('input')
    field.setAttribute('id', 'loginName')
    div.appendChild(field)

    let btn = document.createElement('button')
    btn.setAttribute('id', 'submitLogin')
    btn.innerText = 'Submit'
    div.appendChild(btn)
}

function loadCharCreator() {    
    let page = document.getElementById('page')
    let div = document.createElement('div')
    div.setAttribute('id', 'createCharacter')
    page.appendChild(div)

    div.appendChild(
        document.createElement('h2').innerText = 'Create Character'
    )
    let input = document.createElement('input')
    input.setAttribute('placeholder', 'Character Name')
    input.setAttribute('type', 'text')
    input.setAttribute('id', 'selectName')
    
    let raceMenu = document.createElement('select')
    raceMenu.setAttribute('id', 'selectRace')

    let classMenu = document.createElement('select')
    classMenu.setAttribute('id', 'selectClass')

    let weaponMenu = document.createElement('select')
    weaponMenu.setAttribute('id', 'selectWeapon')

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
    submitBtn.setAttribute('id', 'submitNewCharacter')
    submitBtn.textContent = 'Create Character'

    div.appendChild(submitBtn)
    div.appendChild(armorMenu)
    div.appendChild(weaponMenu)
    div.appendChild(raceMenu)
    div.appendChild(classMenu)
    div.appendChild(input)
}