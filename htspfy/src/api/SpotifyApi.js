import axios from "axios"

const clientId = "YOUR_CLIENT_ID_DASHBOARD_SPOTIFYDEV";
const clientSecret = "YOUR_CLIENT_SECRET_DASHBOARD_SPOTIFYDEV";

let accessToken;

let refreshToken;
let expiresIn;
let tokenExpirado = false;

export default class SpotifyApi{

    static async getToken(code){


        const body = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:3000/playlists"
        }

        //req post
        const resposta = await axios({ // return promise
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            // data: {
            //     grant_type: "authorization_code",
            //     code, // ou só code ele vai entender por ter mesmo nome! code : code
            //     redirect_uri: "http://localhost:3000/playlists"
            // },
            data : new URLSearchParams(Object.entries(body)).toString(), 
            headers:{
                Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        
        accessToken = resposta.data.access_token;
        refreshToken = resposta.data.refresh_token;
        expiresIn = resposta.data.expires_in;
        tokenExpirado= false;

        setTimeout(() => {
            tokenExpirado = true;
        }, expiresIn);
    }

    static async refreshToken(){

        const body = {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        }

        const resposta = await axios({ // return promise
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            data : new URLSearchParams(Object.entries(body)).toString(), 
            headers:{
                Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        
        accessToken = resposta.data.access_token;
        expiresIn = resposta.data.expires_in;
        tokenExpirado= false;

        setTimeout(() => {
            tokenExpirado = true;
        }, expiresIn);
    }

    static async getUsuario(){

        if(tokenExpirado) await SpotifyApi.refreshToken();

        const respostaUsuario = await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}` 
            }
        })
        const usuarioLogado = {
            nome: respostaUsuario.data.display_name,
            id: respostaUsuario.data.id
        }

        return usuarioLogado
    }

    static async getPlaylists(){
        if(tokenExpirado) await SpotifyApi.refreshToken();
        const resposta = await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me/playlists",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return resposta.data.items;
    }
}
