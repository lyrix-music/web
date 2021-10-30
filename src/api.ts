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
export function UserTelegramId(success: Function, error: Function) {
    getClient().get("/user/telegram_id").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song
export function UserPlayerLocalCurrentSong(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song/similar
export function UserPlayerLocalSimilarSongs(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song/similar").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song/love
export function UserPlayerLocalLoveSongs(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song/love").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song/unlove
export function UserPlayerLocalUnloveSongs(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song/unlove").then(response => {
        success(response.data);
    }).catch(e => { error(e)});
}

// GET /user/player/local/current_song/lyrics
export function UserPlayerLocalLyrics(success: Function, error: Function) {
    getClient().get("/user/player/local/current_song/lyrics").then(response => {
        if (response.data == null) {
            error("No lyrics found");
        }
        success(response.data);
    }).catch(e => { error(e)});
}

export function ConnectSpotifyToken(
    token: string,
    success: Function, 
    error: Function)
{
    getClient().post("/user/player/spotify/token", {
        "token": token, 
    }).then(function() {
        success()
    }).catch((err: any) => {
        console.log(`Failed to send login request: ${err}`);
        error(err)
    })
}

export function ConnectLastFmToken(
    token: string,
    success: Function, 
    error: Function)
{
    // TODO not implemented yet
    getClient().post("/user/player/lastfm/token", {
        "token": token, 
    }).then(function() {
        success()
    }).catch((err: any) => {
        console.log(`Failed to send login request: ${err}`);
        error(err)
    })
}