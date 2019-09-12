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


    let top = document.createElement('div')
    top.setAttribute('id', 'top')
    top.classList.add('vert')
    let bottom = document.createElement('div')
    bottom.setAttribute('id', 'bottom')
    bottom.classList.add('vert')
    sheet.appendChild(top)
    sheet.appendChild(bottom)

    let top1 = document.createElement('div')
    top1.setAttribute('id', 'top-1')
    top1.classList.add('top-item')
    let top2 = document.createElement('div')
    top2.setAttribute('id', 'top-2')
    top2.classList.add('top-item')
    let top3 = document.createElement('div')
    top3.setAttribute('id', 'top-3')
    top3.classList.add('top-item')
    top.appendChild(top1)
    top.appendChild(top2)
    top.appendChild(top3)

    // top 1
    let classSpan = document.createElement('span')
    classSpan.setAttribute('id', 'class')
    classSpan.textContent = `Class: `
    top1.appendChild(classSpan)

    let raceSpan = document.createElement('span')
    raceSpan.setAttribute('id', 'race')
    raceSpan.textContent = `Race: `
    top1.appendChild(raceSpan)

    let xpSpan = document.createElement('span')
    xpSpan.setAttribute('id', 'xp')
    xpSpan.textContent = `XP: `
    top1.appendChild(xpSpan)

    let saveSpan = document.createElement('span')
    saveSpan.setAttribute('id', 'saves')
    top1.appendChild(saveSpan)

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


    // top 2

    let img = document.createElement('img')
    img.setAttribute('src', '')
    img.setAttribute('id', 'char_photo')
    top2.appendChild(img)

    let charName = document.createElement('h3')
    charName.setAttribute('id', 'char_name')
    top2.appendChild(charName)

    let charDescrip = document.createElement('p')
    charDescrip.setAttribute('id', 'char_description')
    top2.appendChild(charDescrip)

    // top 3

    let acBox = document.createElement('span')
    acBox.setAttribute('id', 'ac')
    acBox.textContent = `AC: `
    top3.appendChild(acBox)

    let hpBox = document.createElement('span')
    hpBox.setAttribute('id', 'hp')
    hpBox.textContent = `HP: `
    top3.appendChild(hpBox)

    let skillSpan = document.createElement('span')
    skillSpan.setAttribute('id', 'skills')
    top3.appendChild(skillSpan)

    let h3Skills = document.createElement('h3')
    h3.innerText = 'Skills: '
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
