
import { getToken, login, register, isLoggedIn } from './auth'
import { parseUserId } from './utils'
import { UserPlayerLocalLyrics, UserPlayerLocalCurrentSong, ConnectLastFmRedirectUrl } from "./api"
import { Song } from './types'
import { ListenSongChanges } from './ws'

let lastPlayedSong: Song = {
    track: "",
    artist: "",
    source: "",
}
let songChanged: boolean = true

function registerHtmlCallback() {
    let userId = (<HTMLInputElement>document.getElementById('userId')).value
    let password = (<HTMLInputElement>document.getElementById('password')).value
    let confirmedPassword = (<HTMLInputElement>document.getElementById('confirmPassword')).value
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

function lastfmRedirectButtonEnableCallback() {
    let lastFmButton = <HTMLButtonElement>document.getElementById('lastfmRedirectButton')
    lastFmButton.onclick = function() {
        lastFmButton.classList.toggle('is-loading');
        ConnectLastFmRedirectUrl(function(res: {redirect: string}) {
            window.location.replace(res.redirect)
        }, function() {
            lastFmButton.textContent = "Couldn't get Last.Fm redirect URL. Maybe your homeserver doesn't support Last.fm"
        })
    }
}

function navBarSetup() {
    let navBar =  <HTMLButtonElement>document.getElementsByClassName('navbar-burger').item(0)
    navBar.onclick = function() {
        navBar.classList.toggle('is-active')
        document.getElementsByClassName('navbar-menu').item(0).classList.toggle('is-active')
    }
    
}

function spotifyAuthorizeTokenCallback() {
    let title = document.getElementsByClassName('title').item(0)
    let subtitle = document.getElementsByClassName('subtitle').item(0)
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code")
    if (code == "") {
        title.textContent = "🎶 Looks like something went wrong 👀"
        subtitle.textContent = "Please try again."
        return
    }
    title.textContent = "🎶 Your Lyrix account is connected with Spotify! 🎶"
    subtitle.textContent = "The spotify token was received, and was successfully updated. Your songs should now be visible over Lyrix ✨"
    
}


function loadSong() {
    // fetches the current song that the user is listening
    // if the user's song has changed compared to that reflected 
    // on the UI, the UI will be updated
    // and the lyrics will be fetched
    UserPlayerLocalCurrentSong(function(res: Song) {
        if (lastPlayedSong.track == res.track && lastPlayedSong.artist == res.artist) {
            songChanged = false
        } else {
            lastPlayedSong.track = res.track
            lastPlayedSong.artist = res.artist
            songChanged = true
            let title = document.getElementsByClassName('title').item(0)
            let artist = document.getElementsByClassName('subtitle').item(0)
            if (res.track == "" || res.artist == "") {
                title.textContent = "Lyrix"
                artist.textContent = "You are currently not playing any song"
            } else {
                title.textContent = res.track 
                artist.textContent = res.artist
            }
            
        }
    

    }, function(res: string) {
        console.log("Couldn't fetch the current listening song,", res)
    })
}

function loadLyrics() {
    // do not do anything if the song hasn't changed
    // we can avoid a lot of API calls if we do that
    if (!songChanged) { return }
    if (lastPlayedSong.track == "" || lastPlayedSong.artist == "") { return }
    
    let lyrics = document.getElementById('lyrics')
    UserPlayerLocalLyrics(function(res :string) {
        console.log(res)
        lyrics.textContent = res    
        songChanged = false
        
    }, function() {
        lyrics.textContent = "Couldn't fetch the lyrics."
    })
    
}

export function registerAllCallbacks() {

    switch (window.location.pathname) {
        case "/register/":
            registerRegisterButtonCallback()
            break; 
        case "/login/":
            registerLoginButtonCallback()
            break;
        case "/":
            onDefaultPageLoadCallback()
            navBarSetup()
            ListenSongChanges()
            break
        case "/authorize/lastfm/":
            lastfmRedirectButtonEnableCallback()
        case "/token/":
            onTokenPageLoadCallback()
        case "/authorize/spotify/":
            spotifyAuthorizeTokenCallback()
        

        default:
            onDefaultPageLoadCallback()
            navBarSetup()
            break;
    }
}
