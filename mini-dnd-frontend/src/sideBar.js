function loadSideBar() {
    //load sideBar content
    let btn = document.getElementById('log-out-btn')
    btn.addEventListener('click', event => {
        logOut
        btn.style.display = 'none'
    })
}


//Log Out
function logOut(event) {
    fetch(BASE_URL+'/logout') //fetch to clear cookie
    // clear all info off screen and bring us back to log in page
    let page = clearPage 
    //render log in page method (needs to make logOut button invisible)
}
