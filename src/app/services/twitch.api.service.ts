import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const REST_API = '';
const CLIENT_ID_APP = 'qp871hruk96hd4h5mh8yaeo5n96wby';
const CLIENT_ID_EXTENSION = '3zkcgkfkap9z6kvwtd0y3gydf1fycc';
const REDIRECT_URI = 'http://localhost:4200/';
const RESPONSE_TYPE = 'token';
const SCOPES = 'channel:read:subscriptions'
const ACCESS_TOKEN = '258t44bpotidpy28d5vtsvkm23qky0';
const TWITCH_0AUTH_URL = 'https://id.twitch.tv/oauth2/authorize?';

export class TwitchApiService {
    

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

    /**
     * Méthode qui va encoder les éléments de la table de hachage
     * passés en argument
     * @param params  
     * @returns l'url encodé
     */
    encodeQueryString(params: any) {
        let items = [];
        for(let key in params) {
            let value = encodeURIComponent(params[key]);
            items.push(`${key}=${value}`);
        }
        return items.join("&");
    }

    /**
     * Méthode à effet inverse
     * Rangement dans une table de hachage
     * @returns 
     */
    getUrlQueryStringParams() {
        const items = location.hash.slice(1).split("&");
        let params: any = {};
        for(let i in items) {
            let key = decodeURIComponent(items[i].split("=")[0]);
            let value = decodeURIComponent(items[i].split("=")[1]);
            params[key] = value;
        }
        return params;
    }

    /**
     * Méthode d'authentification à l'application Twitch
     */
    twitchAuth(): void {
        const params = {
            client_id: CLIENT_ID_APP,
            redirect_uri: REDIRECT_URI,
            response_type: RESPONSE_TYPE,
            scopes: SCOPES
        };
        location.href = `${TWITCH_0AUTH_URL}${this.encodeQueryString(params)}`; 
    }

    /**
     * Méthode renvoyant vrai si l'utilisateur est authentifié
     * @returns vrai si l'utilisateur est authentifié
     */
    twitchIsAuthenticated(): boolean {
        const params = this.getUrlQueryStringParams();
        if(params.access_token !== undefined ) {
            return true;
        } else {
            return false; 
        }
    }
}