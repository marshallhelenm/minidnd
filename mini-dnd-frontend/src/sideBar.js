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
    }
    
}


//Log Out
function logOut(event) {
    localStorage.setItem('user_id',null)
    console.log('logging out!')
    // clear all info off screen and bring us back to log in page
    let page = clearPage()
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
        .then(json => displayStats(json.character))
    }
}

function charDropDown(charDrop) { //generate character drop down menu
    let userID = localStorage.getItem('user_id')
    fetch(BASE_URL+`/users/${userID}`)
        .then(response => response.json())
        .then(characterList => {
            let characters = characterList.characters
            let opt;
            let charDrop = document.getElementById('selectChar')
                opt = document.createElement('option')
                opt.innerText = 'New Character'
                opt.setAttribute('value', 'select-new-char')
                charDrop.appendChild(opt)
            for (let i=0; i < characters.length; i++){
                console.log('drop down: '+characters[i].name)
                opt = document.createElement('option')
                opt.innerText = characters[i].name
                opt.setAttribute('value', characters[i].id)
                charDrop.appendChild(opt)
            }
        })
}

//called when new character is made
function addOptionToCharacterDropdown(character){
    console.log('character.name')
    console.log(character)
    console.log(character.name)
    let charDrop = document.getElementById('selectChar')
    let opt = document.createElement('option')
    opt.innerText = character.name
    opt.setAttribute('value', character.id)
    opt.setAttribute('selected', 'selected')
    charDrop.appendChild(opt)
}