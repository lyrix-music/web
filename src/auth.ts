const axios = require('axios').default;


export function isLoggedIn(): boolean {
    for (const key in ["token", "username", "hostname"]) {
        if (!localStorage.getItem(key)) {
            return false;
        }
        if (localStorage.getItem(key) === "null") {
            return false;
        }
    }
    return true;
}

export function login(
    username: string, 
    password: string,
    hostname: string, 
    success: Function, 
    error: Function)
{
    console.log(`Sending login request to ${hostname}`)
    axios.post(`https://${hostname}/login`, 
    {
        "username": username, 
        "password": password
    }).then((res: { data: { token: string; }; }) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('hostname', hostname);
        success()
    }).catch((err: any) => {
        console.log(`Failed to send login request: ${err}`);
        error(err)
    })
}

export function register(
    username: string, 
    password: string, 
    hostname: string, 
    success: Function, 
    error: Function)
{
    axios.post(`https://${hostname}/register`, 
    {
        "username": username, 
        "password": password,
    }).then((res: { data: { token: string; }; }) => {
        success()
    }).catch((err: any) => {
        console.log(`Failed to send register request: ${err}`);
        error(err)
    })
}