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
    let charSheet = document.getElementById('charSheet')
    charSheet.style.display = 'none'

    let createForm = document.getElementById('createForm')
    createForm.style.display = 'flex'

    let name = document.getElementById('name-field')

    
    let descripDiv = document.getElementById('descrip-div')
    let charDescrip = document.createElement('input')
    charDescrip.setAttribute('placeholder', 'A brave (or stupid) adventurer!')
    charDescrip.setAttribute('type', 'textarea')
    charDescrip.setAttribute('id', 'new-char-descrip')
    charDescrip.classList.add('form-control')
    charDescrip.defaultValue = 'A brave (or stupid) adventurer!'
    let descripLabel = document.createElement('label')
    descripLabel.setAttribute('for', 'charDescrip')
    descripLabel.textContent = 'Description:'
    descripDiv.appendChild(descripLabel)
    descripDiv.appendChild(charDescrip)


    let raceMenu = document.getElementById('selectRace')
    // raceMenu.onchange = event => {
    //     showInfo(raceMenu, classMenu)
    // }

    //display race attributes
    raceMenu.addEventListener('change',event => {displayRaceAbilities(event.target)})
    
    
    let classMenu = document.getElementById('selectClass')

    //display class attributes
    classMenu.addEventListener('change',event => {displayClassAbilities(event.target)})
    

    // let weaponMenu = document.createElement('select')
    // weaponMenu.setAttribute('id', 'selectWeapon')
    // weaponMenu.classList.add('form-control')
    // let weaponMenuDiv = document.createElement('div')
    // weaponMenuDiv.classList.add('form-group')
    // let weaponLabel = document.createElement('label')
    // weaponLabel.setAttribute('for', 'selectWeapon')
    // weaponLabel.textContent = 'Select a Weapon:'
    // weaponMenuDiv.appendChild(weaponLabel)
    // weaponMenuDiv.appendChild(weaponMenu)
    
    // let finesse = document.createElement('option')
    // finesse.setAttribute('value', 'finesse')
    // finesse.setAttribute('id', 'finesse')
    // finesse.textContent = 'Finesse Weapon - d4, attack twice'
    // weaponMenu.appendChild(finesse)
    
    // let martial = document.createElement('option')
    // martial.setAttribute('value', 'martial')
    // martial.setAttribute('id', 'martial')
    // martial.textContent = 'Martial Weapon - d8, paired with shield'
    // weaponMenu.appendChild(martial)
    
    // let large = document.createElement('option')
    // large.setAttribute('value', 'large')
    // large.setAttribute('id', 'large')
    // large.textContent = 'Large Weapon - d12, two handed'
    // weaponMenu.appendChild(large)
    
    // let ranged = document.createElement('option')
    // ranged.setAttribute('value', 'ranged')
    // ranged.setAttribute('id', 'ranged')
    // ranged.textContent = 'Ranged Weapon - d6'
    // weaponMenu.appendChild(ranged)
    
    // let armorMenu = document.createElement('select')
    // armorMenu.setAttribute('id', 'selectArmor')
    // armorMenu.classList.add('form-control')
    // let armorMenuDiv = document.createElement('div')
    // armorMenuDiv.classList.add('form-group')
    // let armorLabel = document.createElement('label')
    // armorLabel.setAttribute('for', 'selectArmor')
    // armorLabel.textContent = 'Select Armor:'
    // armorMenuDiv.appendChild(armorLabel)
    // armorMenuDiv.appendChild(armorMenu)
    
    // let light = document.createElement('option')
    // light.setAttribute('value', 'light')
    // light.setAttribute('id', 'light')
    // light.textContent = 'Leather - AC 12 - MV 8'
    // armorMenu.appendChild(light)
    
    // let medium = document.createElement('option')
    // medium.setAttribute('value', 'medium')
    // medium.setAttribute('id', 'medium')
    // medium.textContent = 'Chain - AC 14 - MV 6'
    // armorMenu.appendChild(medium)
    
    // let heavy = document.createElement('option')
    // heavy.setAttribute('value', 'heavy')
    // heavy.setAttribute('id', 'heavy')
    // heavy.textContent = 'Plate - AC 16 - MV 4'
    // armorMenu.appendChild(heavy)

    let pic = document.getElementById('pic-field')
    pic.classList.add('form-control')

    let randBtn = document.getElementById('rand-char-btn')
    randBtn.onclick = randomCharacter
    
    let submitBtn = document.getElementById('submitNewCharacter')
    submitBtn.onclick = event => submitNewCharacter(event)

    loadRaces()
    loadClasses()
}

function loadRaces(){
    let raceList = document.getElementById("selectRace")
    fetch(BASE_URL+'/races')
    .then(response => response.json())
    .then(races => {
        for(let race of races){
            let option = document.createElement('option')
            option.setAttribute('value',race.id)
            option.setAttribute('id',race.name)

            option.setAttribute('numabilities',race.race_abilities.length)

            for(let i = 0; i < race.race_abilities.length; i++){
                let attribute = 'ability' + i
                option.setAttribute(attribute,race.race_abilities[i].description)
            }

            option.textContent = race.name
            raceList.appendChild(option)
        }

        displayRaceAbilities(raceList) //display abilities of default race
    })
}

function loadClasses(){
    let classList = document.getElementById("selectClass")
    fetch(BASE_URL+'/class_types')
    .then(response => response.json())
    .then(classes => {
        for(let class_type of classes){
            let option = document.createElement('option')
            option.setAttribute('value',class_type.id)
            option.setAttribute('id',class_type.name)


            option.setAttribute('numabilities',class_type.class_type_abilities.length)

            for(let i = 0; i < class_type.class_type_abilities.length; i++){
                let attribute = 'ability' + i
                option.setAttribute(attribute,class_type.class_type_abilities[i].description)
            }

            option.textContent = class_type.name
            classList.appendChild(option)
        }

        displayClassAbilities(classList) //display abilities of default class
    })
}

function loadCharSheet() {
    let charSheet = document.getElementById('charSheet')
    charSheet.style.display = 'flex'

    let createForm = document.getElementById('createForm')
    createForm.style.display = 'none'

    let editForm = document.getElementById('editForm')
    editForm.style.display = 'none'

    let hpCurrent = document.getElementById('hp')
    console.log('hpCurrent: ', hpCurrent)
    hpCurrent.addEventListener('change', updateHP)

    let restBtn = document.getElementById('rest-btn')
    restBtn.onclick = event => showModal(event)
 
    let editBtn = document.getElementById('edit-char')
    editBtn.onclick = event => editChar(event)

    let delBtn = document.getElementById('del-char')
    delBtn.onclick = event => confirmDelete(event)
}

function showModal(event) {
    let restBtn = document.getElementById('rest-btn')
    restBtn.setAttribute('data-toggle','modal')

    let isWiz = document.getElementById('class').getAttribute('value')

    if (isWiz != 'Wizard'){
        let wizConfirm = document.getElementById('wiz')
        wizConfirm.style.display = 'none'
    } else {
        let wizConfirm = document.getElementById('wiz')
        wizConfirm.style.display = 'flex'
        wizConfirm.defaultValue = 'yes'
    }

    let confirmRestBtn = document.getElementById('confirm-rest-button')
    confirmRestBtn.addEventListener('click', returnToTown)

}

function displayRaceAbilities(menu){
    let index = menu.selectedIndex
    let selected = menu.children[index]
    let num = selected.getAttribute('numAbilities')
    let display = document.getElementById('race-descriptor')
    while (display.firstChild){ display.removeChild(display.firstChild)}
    for(let i = 0; i < num; i++){
        let attribute = 'ability' + i
        let li = document.createElement('li')
        li.textContent = selected.getAttribute(attribute)
        display.appendChild(li)
    }
}

function displayClassAbilities(menu){
    let index = menu.selectedIndex
    let selected = menu.children[index]
    let num = selected.getAttribute('numAbilities')
    let display = document.getElementById('class-descriptor')
    while (display.firstChild){ display.removeChild(display.firstChild)}
    for(let i = 0; i < num; i++){
        let attribute = 'ability' + i
        let li = document.createElement('li')
        li.textContent = selected.getAttribute(attribute)
        display.appendChild(li)
    }
}


