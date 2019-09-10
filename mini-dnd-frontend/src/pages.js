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


    div.appendChild(submitBtn)
    div.appendChild(armorMenu)
    div.appendChild(weaponMenu)
    div.appendChild(raceMenu)
    div.appendChild(classMenu)
    div.appendChild(input)

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
function submitNewCharacter(){
    console.log('hi')
    fetch(BASE_URL+'/characters',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            "Accept":   'application/json'
        },
        body: JSON.stringify({ //:name, :user, :class_type, :race, :weapon, :armor
            'name' : document.getElementById('selectName').value,
            'race_id' : document.getElementById('selectRace').value,
            'user_id' : user_id,
            'class_type_id' : document.getElementById('selectClass').value,
            'weapon' : document.getElementById('selectWeapon').value,
            'armor' : document.getElementById('selectArmor').value
        })
    })
}

