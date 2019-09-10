const BASE_URL = "http://localhost:3000"
document.addEventListener('DOMContentLoaded',main)
function main(){
    //Character Creation Stuff
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
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'user_id': localStorage.getItem('user_id')
            })
        })
        .then(response => response.json())
        .then(json =>{
            console.log('response received')
            if(json.hasCharacter == 'true'){
                console.log('get char renderer working')
                console.log(`render character ${json.character.id}`)

                console.log(json.character)
                displayStats(json.character)
            } else {
                loadCharCreator()
            }
        })
    }
    else{
        console.log("Loading log in form")
        loadLogIn()
    }
}

function makeUN(event){
    console.log('makeUN called')
    let userName = document.getElementById("loginName").value
    event.target.style.display = 'none'
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
    .then(json => {
        console.log(json.message)
        localStorage.setItem('user_id',json.user_id)
        loadSideBar()
        loggedIn()
    })
}

