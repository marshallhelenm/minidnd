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
    div.setAttribute('id', 'createCharacter')
    page.appendChild(div)
    
    let title =  document.createElement('h2')
    title.innerText = 'Create Character'
    div.appendChild(title)

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
    submitBtn.onclick = submitNewCharacter
    submitBtn.textContent = 'Create Character'


    div.appendChild(input)
    div.appendChild(armorMenu)
    div.appendChild(weaponMenu)
    div.appendChild(raceMenu)
    div.appendChild(classMenu)
    div.appendChild(submitBtn)
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


function submitNewCharacter(e){
    console.log('submitting new character')

    fetch(BASE_URL+'/characters',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            "Accept":   'application/json'
        },
        body: JSON.stringify({ //:name, :user, :class_type, :race, :weapon, :armor
            'name' : document.getElementById('selectName').value,
            'race_id' : document.getElementById('selectRace').value,
            'user_id' : localStorage.getItem('user_id'),
            'class_type_id' : document.getElementById('selectClass').value,
            'weapon' : document.getElementById('selectWeapon').value,
            'armor' : document.getElementById('selectArmor').value
        })
    })
        .then(response => response.json()) 
        .then(json => {console.log(json);displayStats(json.character)})
        
    loadCharSheet()
}


function loadCharSheet() {
    clearPage()
    console.log('loading char sheet')
    let sheet = document.createElement('div')
    sheet.setAttribute('id', 'charSheet')
    let page = document.getElementById('page')
    page.appendChild(sheet)

    let top = document.createElement('div')
    top.setAttribute('id', 'top')
    let bottom = document.createElement('div')
    bottom.setAttribute('id', 'bottom')
    sheet.appendChild(top)
    sheet.appendChild(bottom)

    let top1 = document.createElement('div')
    top1.setAttribute('id', 'top-1')
    let top2 = document.createElement('div')
    top2.setAttribute('id', 'top-2')
    let top3 = document.createElement('div')
    top3.setAttribute('id', 'top-3')
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
    bottom.appendChild(abilities)

    let classAb = document.createElement('span')
    classAb.setAttribute('id', 'class_abilities')
    abilities.appendChild(classAb)

    let classAbh3 = document.createElement('h3')
    classAbh3.textContent = 'Class Abilities:'
    abilities.appendChild(classAbh3)

    let raceAbh3 = document.createElement('h3')
    raceAbh3.textContent = 'Racial Abilities:'
    abilities.appendChild(raceAbh3)

    let raceAb = document.createElement('span')
    raceAb.setAttribute('id', 'race_abilities')
    abilities.appendChild(raceAb)

    

}
