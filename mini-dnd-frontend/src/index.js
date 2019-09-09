const BASE_URL = "http://localhost:3000"

document.addEventListener('DOMContentLoaded',main)
function main(){
    document.getElementById("submitLogin").addEventListener('click',makeUN)
    
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