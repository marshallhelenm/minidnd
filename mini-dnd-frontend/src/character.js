function editChar(e) {
    console.log("Changin' things up.")
    fetch(BASE_URL+`characters/${event.target.value}`)
        .then(response => response.json())
        .then(char => loadEditChar(char))
}

function confirmDelete(e){
    let alert = document.createElement('div')
    alert.classList.add('alert')
    alert.classList.add('alert-danger')
    alert.setAttribute('role', 'alert')
    alert.textContent = 'Warning, you are about to delete this adventurer! This action cannot be undone!'

    let confirm = document.createElement('button')
    confirm.setAttribute('value', event.target.value)
    confirm.onclick = event => deleteChar(event)
    
    let dismiss = document.createElement('button')
    

    // <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    // <span aria-hidden="true">&times;</span>


    let page = document.getElementById('page')
    page.appendChild(alert)
}

function deleteChar(e) {
    
    console.log("That's so sad!")
    console.log(event.target.value)
    // fetch(BASE_URL+`/characters/${event.target.value}`, {method: 'DELETE'})
    // loggedIn()
}


function loadEditChar(char) {   
    //creates edit form, with default values being the existing characters info
    //submit changes button onclick = submitCharChanges(char)
}

function submitCharChanges(char){
    displayStats(char) //optimistically render charactersheet with new info
    //fetch to update char on backend
}
