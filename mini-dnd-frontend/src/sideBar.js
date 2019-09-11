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
        rulesBtn.addEventListener('click', event => {
            event.preventDefault()
            clearPage()
            let p = document.createElement('h2')
            p.textContent = 'Under Construction'
            let page = document.getElementById('page')
            page.appendChild(p)
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
        .then(displayStats)
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
                opt = document.createElement('button')
                let inDiv = document.createElement('div')
                inDiv.textContent = 'New Character'
                opt.appendChild(inDiv)
                
                opt.classList.add('dropdown-item')
                opt.setAttribute('type', 'button')
                opt.setAttribute('value', 'select-new-char')
                opt.addEventListener('click', event => selectChar)
                charDrop.appendChild(opt)

            for (let i=0; i < characters.length; i++){
                console.log('drop down: '+characters[i].name)
                opt = document.createElement('button')
                inDiv = document.createElement('div')
                inDiv.textContent = characters[i].name
                opt.addEventListener('click', event => selectChar)
                opt.appendChild(inDiv)

                opt.classList.add('dropdown-item')
                opt.setAttribute('type', 'button')
                opt.setAttribute('value', characters[i].id)
                charDrop.appendChild(opt)
            }
        })
}