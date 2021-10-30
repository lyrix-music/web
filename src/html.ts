
import { getToken, login, register, isLoggedIn } from './auth'
import { parseUserId } from './utils'

function registerHtmlCallback() {
    let userId = (<HTMLInputElement>document.getElementById('userId')).value
    let password = (<HTMLInputElement>document.getElementById('password')).value
    let confirmedPassword = (<HTMLInputElement>document.getElementById('confirmedPassword')).value
    if (password != confirmedPassword) {
        alert('Passwords do not match')
        return
    }
    let parsed = parseUserId(userId)

    register(parsed.username, password, parsed.hostname, function() {
        window.location.replace("/login");
    }, 
    function() {
        alert('Registration failed')
    })   
}



function loginHtmlCallback() {
    let userId = (<HTMLInputElement>document.getElementById('userId')).value
    let password = (<HTMLInputElement>document.getElementById('password')).value
    let parsed = parseUserId(userId)
    login(parsed.username, password, parsed.hostname, function() {
        window.location.replace("/");
    }, function() {

    alert('Login failed')

    })   
}

function registerRegisterButtonCallback() {
    (<HTMLButtonElement>document.getElementById('submitButton')).onclick = registerHtmlCallback
}

function registerLoginButtonCallback() {
    (<HTMLButtonElement>document.getElementById('submitButton')).onclick = loginHtmlCallback
}

function onDefaultPageLoadCallback() {
    if (!isLoggedIn()) {
        window.location.replace(`/login/?next=${window.location.pathname}`);
    }
}

function onTokenPageLoadCallback() {
    document.getElementById('authCode').textContent = getToken()
}

function navBarSetup() {
    let navBar =  <HTMLButtonElement>document.getElementsByClassName('navbar-burger').item(0)
    navBar.onclick = function() {
        navBar.classList.toggle('is-active')
        document.getElementsByClassName('navbar-menu').item(0).classList.toggle('is-active')
    }
}

export function registerAllCallbacks() {
    switch (window.location.pathname) {
        case "/register/":
            registerRegisterButtonCallback()
            break; 
        case "/login/":
            registerLoginButtonCallback()
            break;
        case "/token/":
            onTokenPageLoadCallback()

        default:
            onDefaultPageLoadCallback()
            navBarSetup()
            break;
    }
}
