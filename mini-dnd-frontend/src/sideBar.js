function loadSideBar() {
    //load sideBar content
    if (localStorage.getItem('user_id') == 'null'){
        document.getElementById('side-menu').style.display = 'none'
    } else{
        document.getElementById('side-menu').style.display = 'flex'

        let charDrop = document.getElementById('selectChar')
        charDropDown(charDrop)
        charDrop.onchange = selectChar

        let btn = document.getElementById('log-out-btn')
        btn.addEventListener('click', event => {
        logOut()
        })

        let rulesBtn = document.getElementById('rules-btn')
        rulesBtn.onclick = loadRulesPage
    }
    
}

function loadRulesPage(event) {
    // clearPage('rules', 'flex')
    let charSheet = document.getElementById('charSheet')
    charSheet.style.display = 'none'
    let createForm = document.getElementById('createForm')
    createForm.style.display = 'none'
    let editForm = document.getElementById('editForm')
    editForm.style.display = 'none'
    let loginPage = document.getElementById('login')
    loginPage.style.display = 'none'
    let rulesPage = document.getElementById('rules')
    rulesPage.style.display = 'flex'
}

function logOut(event) {
    localStorage.setItem('user_id',null)
    let charSheet = document.getElementById('charSheet')
    charSheet.style.display = 'none'
    let createForm = document.getElementById('createForm')
    createForm.style.display = 'none'
    let editForm = document.getElementById('editForm')
    editForm.style.display = 'none'
    let loginPage = document.getElementById('login')
    loginPage.style.display = 'block'
    let rulesPage = document.getElementById('rules')
    rulesPage.style.display = 'none'

    loadSideBar()
    loadLogIn()
}

function selectChar(e) {
    console.log('switchin')
    console.log(event.target.value)
    if (event.target.value == 'select-new-char'){
        loadCharCreator()
    } else {
        loadCharSheet()
        fetch(BASE_URL+`/characters/${event.target.value}`)
        .then(response => response.json())
        .then(json => displayStats(json))
    }
}

function charDropDown(charDrop) { //generate character drop down menu
    let userID = localStorage.getItem('user_id')
    fetch(BASE_URL+`/users/${userID}`)
        .then(response => response.json())
        .then(characterList => {
            let charDrop = document.getElementById('selectChar')
            while (!!charDrop.firstChild){
                charDrop.removeChild(charDrop.firstChild)
            }
            let characters = characterList.characters
            let opt;
                opt = document.createElement('button')
                opt.textContent = 'New Character'
                opt.classList.add('dropdown-item')
                opt.setAttribute('type', 'button')
                opt.setAttribute('value', 'select-new-char')
                opt.addEventListener('click', event => selectChar())
                charDrop.appendChild(opt)

            for (let i=0; i < characters.length; i++){
                addOptionToCharacterDropdown(characters[i])
            }
        })
}

//called when new character is made
function addOptionToCharacterDropdown(character){
    let charDrop = document.getElementById('selectChar')
    let opt = document.createElement('button')
    opt.addEventListener('click', event => selectChar(event))
    opt.innerText = character.name
    opt.setAttribute('value', character.id)
    opt.setAttribute('id', `char-${character.id}`)
    opt.setAttribute('selected', 'selected')
    opt.setAttribute('type', 'button')
    opt.classList.add('dropdown-item')
    charDrop.appendChild(opt)
}

//called when character is updated
function editCharacterInDropdown(character){
    let opt = document.getElementById(`char-${character.id}`)
    opt.innerText = character.name
}

function removeCharFromDropdown(id) {
    let btn = document.getElementById(id)
    btn.parentElement.removeChild(btn)
}