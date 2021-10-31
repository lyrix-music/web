import { GetWebsocketId } from './api'
import { WebsocketAuth, WebsocketSong } from './types'
import { detectWebsocketSchemeFromHostname } from './utils'

export function ListenSongChanges() {
    let lyrics = document.getElementById('lyrics')
    let title = document.getElementsByClassName('title').item(0)
    let artist = document.getElementsByClassName('subtitle').item(0)
    GetWebsocketId().then(function (wa: WebsocketAuth) {
        let scheme = detectWebsocketSchemeFromHostname(wa.hostname)
        let wsEndpoint = `${scheme}://${wa.hostname}/ws/${wa.id}/${wa.userId}/player/local/current_song`
        let ws = new WebSocket(wsEndpoint)
        ws.onmessage = function (event) {
            let data = JSON.parse(event.data)
            title.textContent = data.track
            artist.textContent = data.artist
            lyrics.textContent = data.lyrics
        }
        ws.onerror = function (event) {
            console.log(event)
            console.log(`Something went wrong when connecting to wsEndpoint: ${wsEndpoint}`)
        }
        
    }).catch(function (err) {
        console.log("Failed to open websocket connection")
        console.log(err)
    })
}