import { HttpClient } from "@angular/common/http";

export class TwitchApiService {
    REST_API: string = '';
    CLIENT_ID: string = 'qp871hruk96hd4h5mh8yaeo5n96wby';
    REDIRECT_URI: string = 'http://localhost:4200/';
    RESPONSE_TYPE: string = 'token';
    SCOPES: string = 'channel:read:subscriptions'

    constructor(private httpClient: HttpClient) { }


    /*
            ---- PROCEDURE POUR DIFFUSER UN STREAM ---- 
            - Obtenir un jeton "flux de code implicite"
            - Patron :
                GET https://id.twitch.tv/oauth2/authorize
                ?client_id=<your client ID>
                &redirect_uri=<your registered redirect URI>
                &response_type=<type>
                &scope=<space-separated list of scopes>
            - 
    */

    GetStreamerOnline() {

    }
}