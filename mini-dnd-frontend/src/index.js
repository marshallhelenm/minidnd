const BASE_URL = "http://localhost:3000"
let user_id = -1
document.addEventListener('DOMContentLoaded',main)
function main(){
    document.getElementById("submitLogin").addEventListener('click',makeUN)

    //Character Creation Stuff
    loadRaces()
    loadClasses()
    document.getElementById('submitNewCharacter').onclick = submitNewCharacter
}

//Login
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
        user_id = json.user_id
    })
}

//Character Creation
function loadRaces(){
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