import axios, { AxiosInstance } from "axios";




function getClient(): AxiosInstance {
    const token = localStorage.getItem("token");
    const hostname = localStorage.getItem("hostname");
    if (token == "" || hostname == "") {
        // ask the user to login once again
        window.location.replace("/login");
    }
    return axios.create({
        baseURL: `https://${hostname}`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}


// GET /user/telegram_id
function UserTelegramId(success: Function, error: Function) {
    getClient().get("/user/telegram_id").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song
function UserPlayerLocalCurrentSong(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song/similar
function UserPlayerLocalSimilarSongs(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song/similar").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song/love
function UserPlayerLocalLoveSongs(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song/love").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song/unlove
function UserPlayerLocalUnloveSongs(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song/unlove").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song/lyrics
function UserPlayerLocalLyrics(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song/lyrics").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}