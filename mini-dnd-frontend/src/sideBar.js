function loadSideBar() {
    //load sideBar content
    if (localStorage.getItem('user_id') == 'null'){
        document.getElementById('side-menu').style.display = 'none'
    } else{
        document.getElementById('side-menu').style.display = 'flex'
    }
    let charDrop = document.getElementById('selectChar')
    charDrop.addEventListener('onchange', charDropDown)
    let btn = document.getElementById('log-out-btn')
    btn.addEventListener('click', event => {
        logOut()
    })
}


//Log Out
function logOut(event) {
    localStorage.setItem('user_id',null)
    console.log('logging out!')
    // clear all info off screen and bring us back to log in page
    let page = clearPage()
    loadSideBar()
    loadLogIn()
    //render log in page method (needs to make logOut button invisible)
}


function charDropDown(e) {
    console.log('switchin')
    // if (event.target.value == 'New Character'){
    //     loadCharCreator()
    // } else {

    // }
}