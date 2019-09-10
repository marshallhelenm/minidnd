function clearPage() {
    let page = document.getElementById('page')
    while (page.firstChild){
        page.removeChild(page.firstChild)
    } 
    return page
}

function loadLogIn(){
    let page = document.getElementById('page')

    let div = document.createElement('div')
    div.setAttribute('id', 'login')
    page.appendChild(div)

    let field = document.createElement('input')
    field.setAttribute('id', 'loginName')
    div.appendChild(field)

    let btn = document.createElement('button')
    btn.setAttribute('id', 'submitLogin')
    btn.innerText = 'Submit'
    div.appendChild(btn)
}

function loadCharCreator() {    
    let page = document.getElementById('page')
    let div = document.createElement('div')
    div.setAttribute('id', 'createCharacter')
    page.appendChild(div)

    div.appendChild(
        document.createElement('h2').innerText = 'Create Character'
    )

    div.appendChild(
        
    )
    
}