function clearPage() {
    let page = document.getElementById('page')
    while (page.firstChild){
        page.removeChild(page.firstChild)
    } 
    return page
}

function loadLogIn(){
    clearPage()
    let page = document.getElementById('page')

    let div = document.createElement('div')
    div.setAttribute('id', 'login')
    page.appendChild(div)

    let field = document.createElement('input')
    field.setAttribute('id', 'loginName')
    field.placeholder = 'Username'
    div.appendChild(field)

    let btn = document.createElement('button')
    btn.setAttribute('id', 'submitLogin')
    btn.addEventListener('click',makeUN)
    btn.innerText = 'Submit'
    div.appendChild(btn)
}

//Character Creation
function loadCharCreator() {   
    clearPage() 
    let page = document.getElementById('page')
    let div = document.createElement('div')
    div.classList.add('vert')
    div.setAttribute('id', 'createCharacter')
    let charForm = document.createElement('div')
    charForm.setAttribute('id', 'charForm')
    charForm.classList.add('vert')
    page.appendChild(div)
    
    let title =  document.createElement('h2')
    title.innerText = 'Create Character'
    div.appendChild(title)

    
    let name = document.createElement('input')
    name.setAttribute('placeholder', 'Character Name')
    // name.defaultValue = randomName()
    name.setAttribute('type', 'text')
    name.setAttribute('id', 'name-field')
    name.classList.add('form-control')
    let nameDiv = document.createElement('div')
    nameDiv.classList.add('form-group')
    let nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'name-field')
    nameLabel.textContent = 'Name:'
    nameDiv.appendChild(nameLabel)
    nameDiv.appendChild(name)

    let charDescrip = document.createElement('textarea')
    charDescrip.setAttribute('placeholder', 'A brave (or stupid) adventurer!')
    charDescrip.defaultValue = 'A brave (or stupid) adventurer!'
    charDescrip.setAttribute('type', 'textarea')
    charDescrip.setAttribute('id', 'charDescrip')
    charDescrip.classList.add('form-control')
    let descripDiv = document.createElement('div')
    descripDiv.classList.add('form-group')
    let descripLabel = document.createElement('label')
    descripLabel.setAttribute('for', 'charDescrip')
    descripLabel.textContent = 'Description:'
    descripDiv.appendChild(descripLabel)
    descripDiv.appendChild(charDescrip)
    
    let raceMenu = document.createElement('select')
    raceMenu.setAttribute('id', 'selectRace')
    raceMenu.classList.add('form-control')
    let raceMenuDiv = document.createElement('div')
    raceMenuDiv.classList.add('form-group')
    let raceLabel = document.createElement('label')
    raceLabel.setAttribute('for', 'selectRace')
    raceLabel.textContent = 'Select a Race:'
    raceMenuDiv.appendChild(raceLabel)
    raceMenuDiv.appendChild(raceMenu)
    
    
    let classMenu = document.createElement('select')
    classMenu.setAttribute('id', 'selectClass')
    classMenu.classList.add('form-control')
    let classMenuDiv = document.createElement('div')
    classMenuDiv.classList.add('form-group')
    let classLabel = document.createElement('label')
    classLabel.setAttribute('for', 'selectClass')
    classLabel.textContent = 'Select a Class:'
    classMenuDiv.appendChild(classLabel)
    classMenuDiv.appendChild(classMenu)
    
    
    let weaponMenu = document.createElement('select')
    weaponMenu.setAttribute('id', 'selectWeapon')
    weaponMenu.classList.add('form-control')
    let weaponMenuDiv = document.createElement('div')
    weaponMenuDiv.classList.add('form-group')
    let weaponLabel = document.createElement('label')
    weaponLabel.setAttribute('for', 'selectWeapon')
    weaponLabel.textContent = 'Select a Weapon:'
    weaponMenuDiv.appendChild(weaponLabel)
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
    let armorLabel = document.createElement('label')
    armorLabel.setAttribute('for', 'selectArmor')
    armorLabel.textContent = 'Select Armor:'
    armorMenuDiv.appendChild(armorLabel)
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
    submitBtn.setAttribute('id', 'submitNewCharacter')
    submitBtn.classList.add('btn')
    submitBtn.classList.add('btn-outline-success')
    submitBtn.onclick = submitNewCharacter
    submitBtn.textContent = 'Create Character'

    
    charForm.appendChild(nameDiv)
    charForm.appendChild(descripDiv)
    charForm.appendChild(raceMenuDiv)
    charForm.appendChild(classMenuDiv)
    charForm.appendChild(armorMenuDiv)
    charForm.appendChild(weaponMenuDiv)
    charForm.appendChild(submitBtn)
    div.appendChild(charForm)
    loadRaces()
    loadClasses()
}

function loadRaces(){
    console.log('loading classes')
    let raceList = document.getElementById("selectRace")
    fetch(BASE_URL+'/races')
    .then(response => response.json())
    .then(races => {
        for(let race of races){
            let option = document.createElement('option')
            option.setAttribute('value',race.id)
            option.textContent = race.name
            raceList.appendChild(option)
        }
    })
}

function loadClasses(){
    console.log('loading classes')
    let classList = document.getElementById("selectClass")
    fetch(BASE_URL+'/class_types')
    .then(response => response.json())
    .then(classes => {
        for(let classtype of classes){
            let option = document.createElement('option')
            option.setAttribute('value',classtype.id)
            option.textContent = classtype.name
            classList.appendChild(option)
        }
    })
}

function loadCharSheet() {
    clearPage()
    console.log('loading char sheet')
    let sheet = document.createElement('div')
    sheet.setAttribute('id', 'charSheet')
    let page = document.getElementById('page')
    page.appendChild(sheet)
    sheet.classList.add('vert')

    let charHeader = document.createElement('div')
    charHeader.setAttribute('id', 'char-header')
    charHeader.classList.add('horz')
    let charBody = document.createElement('div')
    charBody.setAttribute('id', 'char-body')
    charBody.classList.add('vert')
    sheet.appendChild(charHeader)
    sheet.appendChild(charBody)

    let top = document.createElement('div')
    top.setAttribute('id', 'top')
    top.classList.add('vert')
    let bottom = document.createElement('div')
    bottom.setAttribute('id', 'bottom')
    bottom.classList.add('vert')
    sheet.appendChild(top)
    sheet.appendChild(bottom)

    let charBodyLeft = document.createElement('div')
    charBodyLeft.setAttribute('id', 'char-body-left')
    charBodyLeft.classList.add('top-item')
    let charBodyCenter = document.createElement('div')
    charBodyCenter.setAttribute('id', 'char-body-center')
    charBodyCenter.classList.add('top-item')
    let charBodyRight = document.createElement('div')
    charBodyRight.setAttribute('id', 'char-body-right')
    charBodyRight.classList.add('top-item')
    top.appendChild(charBodyLeft)
    top.appendChild(charBodyCenter)
    top.appendChild(charBodyRight)

    // Char Header
    let nameLevelSpan = document.createElement('span')
    nameLevelSpan.setAttribute('id', 'nameLevelSpan')
    nameLevelSpan.classList.add('vert')
    nameLevelSpan.classList.add('vert-small')
    charHeader.appendChild(nameLevelSpan)

    let charName = document.createElement('h3')
    charName.setAttribute('id', 'char_name')
    nameLevelSpan.appendChild(charName)

    let charLevelSpan = document.createElement('span')
    charLevelSpan.setAttribute('id', 'level')
    charLevelSpan.textContent = `Level: `
    nameLevelSpan.appendChild(charLevelSpan)
    
    let classRaceXpSpan = document.createElement('span')
    classRaceXpSpan.classList.add('vert')
    classRaceXpSpan.classList.add('vert-small')
    charHeader.appendChild(classRaceXpSpan)

    let classSpan = document.createElement('span')
    classSpan.setAttribute('id', 'class')
    classSpan.textContent = `Class: `
    classRaceXpSpan.appendChild(classSpan)

    let raceSpan = document.createElement('span')
    raceSpan.setAttribute('id', 'race')
    raceSpan.textContent = `Race: `
    classRaceXpSpan.appendChild(raceSpan)

    let xpSpan = document.createElement('span')
    xpSpan.setAttribute('id', 'xp')
    xpSpan.textContent = `XP: `
    classRaceXpSpan.appendChild(xpSpan)

    //Char Body Left
    let saveSpan = document.createElement('span')
    saveSpan.setAttribute('id', 'saves')
    saveSpan.classList.add('vert')
    saveSpan.classList.add('vert-sidebar')
    charBodyLeft.appendChild(saveSpan)

    let h3 = document.createElement('h3')
    h3.innerText = 'Saves: '
    saveSpan.appendChild(h3)

    let phys = document.createElement('button')
    phys.classList.add('skillBox')
    phys.setAttribute('id', 'phys_save')
    phys.textContent = 'Physical:  '
    saveSpan.appendChild(phys)

    let mag = document.createElement('button')
    mag.classList.add('skillBox')
    mag.setAttribute('id', 'mag_save')
    mag.textContent = 'Magical:  '
    saveSpan.appendChild(mag)

    let init = document.createElement('button')
    init.classList.add('skillBox')
    init.setAttribute('id', 'initiative')
    init.textContent = 'Initiative:  '
    saveSpan.appendChild(init)


    // Char Body Center

    let img = document.createElement('img')
    img.setAttribute('src', '')
    img.setAttribute('id', 'char_photo')
    charBodyCenter.appendChild(img)

    let charDescrip = document.createElement('p')
    charDescrip.setAttribute('id', 'char_description')
    charBodyCenter.appendChild(charDescrip)

    let hpSpan = document.createElement('span')
    hpSpan.setAttribute('id', 'hp-span')
    charBodyCenter.appendChild(hpSpan)

    let hpTitle = document.createElement('h4')
    hpTitle.classList.add('hp-item')
    hpTitle.textContent = `HP: `
    hpSpan.appendChild(hpTitle)

    let hpCurrent = document.createElement('input')
    hpCurrent.classList.add('hp-item')
    hpCurrent.setAttribute('id', 'hp')
    hpCurrent.setAttribute('type','number')
    hpCurrent.setAttribute('value',3)
    hpSpan.appendChild(hpCurrent)

    let hpMax = document.createElement('h4')
    hpMax.classList.add('hp-item')
    hpMax.textContent = `/`
    hpSpan.appendChild(hpMax)

    let acBox = document.createElement('span')
    acBox.setAttribute('id', 'ac')
    acBox.textContent = `AC: `
    charBodyCenter.appendChild(acBox)


    // Char Body Right

    let skillSpan = document.createElement('span')
    skillSpan.setAttribute('id', 'skills')
    skillSpan.classList.add('vert')
    skillSpan.classList.add('vert-sidebar')
    charBodyRight.appendChild(skillSpan)

    let h3Skills = document.createElement('h3')
    h3Skills.innerText = 'Skills: '
    skillSpan.appendChild(h3Skills)

    let ath = document.createElement('button')
    ath.classList.add('skillBox')
    ath.setAttribute('id', 'athletics')
    ath.textContent = 'Athletics:  '
    skillSpan.appendChild(ath)

    let sub = document.createElement('button')
    sub.classList.add('skillBox')
    sub.setAttribute('id', 'subterfuge')
    sub.textContent = 'Subterfuge:  '
    skillSpan.appendChild(sub)

    let lor = document.createElement('button')
    lor.classList.add('skillBox')
    lor.setAttribute('id', 'lore')
    lor.textContent = 'Lore:  '
    skillSpan.appendChild(lor)


    // Bottom
    let weaponAbilitiesBox = document.createElement('span')
    bottom.appendChild(weaponAbilitiesBox)


    let attacks = document.createElement('div')
    attacks.setAttribute('id', 'attacks')
    bottom.appendChild(attacks)

    let inventory = document.createElement('div')
    inventory.setAttribute('id', 'inventory')
    bottom.appendChild(inventory)

    let abilities = document.createElement('div')
    inventory.setAttribute('id', 'abilities')
    bottom.appendChild(abilities)

    let spells = document.createElement('div')
    spells.setAttribute('id','spells')
    bottom.appendChild(spells)

    let btnDiv = document.createElement('div')
    bottom.appendChild(btnDiv)

    let restBtn = document.createElement('button')
    restBtn.classList.add('btn')
    restBtn.classList.add('btn-outline-secondary')
    restBtn.classList.add('btn-sm')
    restBtn.setAttribute('data-toggle','modal')
    restBtn.setAttribute('data-target','#restModal')
    restBtn.innerText = 'Return to Town'
    btnDiv.appendChild(restBtn)

    let editBtn = document.createElement('button')
    editBtn.setAttribute('id', 'edit-char')
    editBtn.classList.add('btn')
    editBtn.classList.add('btn-outline-secondary')
    editBtn.classList.add('btn-sm')
    editBtn.textContent = 'Edit Character'
    editBtn.onclick = event => editChar(event)
    btnDiv.appendChild(editBtn)

    let delBtn = document.createElement('button')
    delBtn.setAttribute('id', 'del-char')
    delBtn.classList.add('btn')
    delBtn.classList.add('btn-outline-danger')
    delBtn.classList.add('btn-sm')
    delBtn.textContent = 'Delete Character'
    delBtn.onclick = event => confirmDelete(event)
    btnDiv.appendChild(delBtn)
}
