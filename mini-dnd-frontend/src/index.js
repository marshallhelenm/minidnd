const BASE_URL = "http://localhost:3000"

document.addEventListener('DOMContentLoaded',main)
function main(){
    document.getElementById("submitLogin").addEventListener('click',makeUN)
    loadRaces()
    loadClasses()
}

function loadRaces(){
    let raceList = document.getElementById("selectRace")
    fetch(BASE_URL+'/races')
    .then(response => response.json())
    .then(json => json.races)
    .then(races => {
        for(let race of races){
            let option = document.createElement('option')
            option.setAttribute('value',race.name)
            option.textContent = race.name
            raceList.appendChild(option)
        }
    })
}
function loadClasses(){
    let classList = document.getElementById("selectClass")
    fetch(BASE_URL+'/class_types')
    .then(response => response.json())
    .then(json => json.races)
    .then(races => {
        for(let race of races){
            let option = document.createElement('option')
            option.setAttribute('value',race.name)
            option.textContent = race.name
            classList.appendChild(option)
        }
    })
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
    .then(json => console.log(json.message))
}