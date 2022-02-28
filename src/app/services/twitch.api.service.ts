import { HttpClient } from "@angular/common/http";

export class TwitchApiService {
    
    REST_API: string = '';
    CLIENT_ID_APP: string = 'qp871hruk96hd4h5mh8yaeo5n96wby';
    CLIENT_ID_EXTENSION: string = '3zkcgkfkap9z6kvwtd0y3gydf1fycc';
    REDIRECT_URI: string = 'http://localhost:4200/';
    RESPONSE_TYPE: string = 'token';
    SCOPES: string = 'channel:read:subscriptions '
    ACCESS_TOKEN: string = '258t44bpotidpy28d5vtsvkm23qky0';
    TWITCH_AUTH_URL: string = 'https://id.twitch.tv/oauth2/authorize?';

    constructor() { }


    /*
            ---- PROCEDURE POUR OBTENIR LA LISTE DES STREAMERS EN DIRECT ---- 


            - Obtenir un jeton utilisateur OAuth

            - Patron :
                GET https://id.twitch.tv/oauth2/authorize?
                client_id=qp871hruk96hd4h5mh8yaeo5n96wby&
                redirect_uri=http://localhost:4200/&
                response_type=token&scope=user:read:email

            - Exemple de demandes
                curl -X GET 'https://api.twitch.tv/helix/search/channels?query=a_seagull' \
                -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
                -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
        
            - URL
                GET helix/search/channels
    */

    encodeQueryString(params: string[]) :string {
        let items = [];
        for(let i in params) {
            let val = encodeURIComponent(params[i]);
            items.push(val);
        }
        return items.join("&");
    }

    twitchAuth() :void {
        const params = [
            this.CLIENT_ID_APP,
            this.REDIRECT_URI,
            this.RESPONSE_TYPE,
            this.SCOPES
        ];

        const url: string = `${this.TWITCH_AUTH_URL}?${this.encodeQueryString(params)}`;
        console.log(url);
    }

    getStreamerOnline() {
        
    }
}