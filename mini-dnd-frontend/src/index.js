const BASE_URL = "http://localhost:3000"

document.addEventListener('DOMContentLoaded',main)
console.log('hey')
function main(){
    document.getElementById("submitUN").addEventListener('click',makeUN)
    console.log('hi')
}

function makeUN(event){
    let userName = document.getElementById("UserName").value 
    console.log(userName)
    // fetch(BASE_URL+'/users',{method:'POST'})
    fetch(BASE_URL+'/users',{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            'userName' : userName
        })
    })
    .then(response => response.json)
    .then(console.log)
}