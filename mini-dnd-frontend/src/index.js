const BASE_URL = "http://localhost:3000"
document.addEventListener('DOMContentLoaded',main)
function main(){
    //Character Creation Stuff
    loggedIn()
    loadSideBar()
}

//Login

function loggedIn() { //checks if user is logged in or not and if they have a character and renders the appropriate page
    if (localStorage.getItem('user_id') != 'null'){ //if user is logged in, grab character info

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
            if(json.hasCharacter == 'true'){ // if they have a character, render it
                console.log(`render character ${json.character.id}`)
                // render character
                console.log(json.character)
                displayStats(json.character)
            } else { // if they don't have a character, send them to the character creator
                loadCharCreator()
            }
        })
    }
    else{ //if user is not logged in, send them to log in form
        console.log("Loading log in form")
        loadLogIn()
    }
}

function makeUN(event){ //logs you in or creates a username and logs you in
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

