function clearPage(desiredFormId, desiredStyle) {
    let charSheet = document.getElementById('charSheet')
    charSheet.style.display = 'none'
    let createForm = document.getElementById('createForm')
    createForm.style.display = 'none'
    let editForm = document.getElementById('editForm')
    editForm.style.display = 'none'
    let loginPage = document.getElementById('login')
    loginPage.style.display = 'none'
    let rulesPage = document.getElementById('rules')
    rulesPage.style.display = 'none'
    let desiredPage = document.getElementById(desiredFormId)
    desiredPage.display.style = desiredStyle
}

function loadLogIn(){
    let charSheet = document.getElementById('charSheet')
    charSheet.style.display = 'none'
    let createForm = document.getElementById('createForm')
    createForm.style.display = 'none'
    let editForm = document.getElementById('editForm')
    editForm.style.display = 'none'
    let loginPage = document.getElementById('login')
    loginPage.style.display = 'block'

    while (!!loginPage.firstChild){
        loginPage.removeChild(loginPage.firstChild)
    }

    let field = document.createElement('input')
    field.setAttribute('id', 'loginName')
    field.placeholder = 'Username'
    loginPage.appendChild(field)

    let btn = document.createElement('button')
    btn.setAttribute('id', 'submitLogin')
    btn.addEventListener('click',makeUN)
    btn.innerText = 'Submit'
    loginPage.appendChild(btn)
}

//Character Creation
function loadCharCreator() {   
    // clearPage('createForm', 'flex')
    let charSheet = document.getElementById('charSheet')
    charSheet.style.display = 'none'
    let createForm = document.getElementById('createForm')
    createForm.style.display = 'flex'
    let editForm = document.getElementById('editForm')
    editForm.style.display = 'none'
    let loginPage = document.getElementById('login')
    loginPage.style.display = 'none'
    let rulesPage = document.getElementById('rules')
    rulesPage.style.display = 'none'

    
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
    // clearPage('charSheet', 'flex')
    let charSheet = document.getElementById('charSheet')
    charSheet.style.display = 'flex'
    let createForm = document.getElementById('createForm')
    createForm.style.display = 'none'
    let editForm = document.getElementById('editForm')
    editForm.style.display = 'none'
    let loginPage = document.getElementById('login')
    loginPage.style.display = 'none'
    let rulesPage = document.getElementById('rules')
    rulesPage.style.display = 'none'

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


