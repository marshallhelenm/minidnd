function loadSideBar() {
    //load sideBar content
    if (localStorage.getItem('user_id') == 'null'){
        document.getElementById('side-menu').style.display = 'none'
    } else{
        document.getElementById('side-menu').style.display = 'flex'
    let charDrop = document.getElementById('selectChar')
    charDropDown(charDrop)
    charDrop.addEventListener('onchange', selectChar)
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
    // if (event.target.value == 'New Character'){
    //     loadCharCreator()
    // } else {

    // }
}

function charDropDown(charDrop) { //generate character drop down menu
    let userID = localStorage.getItem('user_id')
    fetch(BASE_URL+`/users/${userID}`)
        .then(response => response.json())
        .then(characters => {
            let opt;
            let charDrop = document.getElementById('selectChar')
            opt = document.createElement('option')
                opt.innerText = 'New Character'
                opt.setAttribute('id', 'newCharacterOption')
                charDrop.appendChild(opt)
            for (let i=0; i < characters.length; i++){
                opt = document.createElement('option')
                opt.innerText = character.name
                opt.setAttribute('id', character.id)
                charDrop.appendChild(opt)
            }
        })
}