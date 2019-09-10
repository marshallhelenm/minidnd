const BASE_URL = "http://localhost:3000"
let user_id = -1
document.addEventListener('DOMContentLoaded',main)
function main(){

    //Character Creation Stuff
    loadRaces()
    loadClasses()
    document.getElementById('submitNewCharacter').onclick = submitNewCharacter
    loggedIn()
    loadSideBar()
}

//Login

function loggedIn() {
    if (localStorage.getItem('user_id') != 'null'){
        console.log('logging in user '+localStorage.getItem('user_id'))
        fetch(BASE_URL+'/get_user_data',{
            method: 'POST',
            headers:{
                'Content-Type': 'applicaiton/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'user_id': localStorage.getItem('user_id')
            })
        })
        .then(
            //render character
        )
    }
    else{
        console.log("Loading log in form")
        loadLogIn()
    }

    // let logOutBtn = document.getElementById('log-out-btn')
    // fetch(BASE_URL+'/check_for_login')
    //     .then(response => response.json())
    //     .then(json => { //json returns json.status and json.char
    //     switch(json.status){
    //         case 'Found Character':
    //             logOutBtn.style.display = 'block'
    //             //logged in, render char sheet 
    //         case 'No Character':
    //                 logOutBtn.style.display = 'block'
    //             clearPage
    //             loadCharCreator
    //         case 'Unknown User': 
    //         logOutBtn.style.display = 'none'
    //             clearPage
    //             loadLogin
    //             }
    //     })
}

function makeUN(event){
    let userName = document.getElementById("loginName").value
    fetch(BASE_URL+'/login',{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            'userName' : userName
        })
    })
    .then(response => response.json())
    .then(json => {console.log(json.message)
        localStorage.setItem('user_id',json.user_id)
    })
}

//Character Creation
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



