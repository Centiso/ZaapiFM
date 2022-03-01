import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';



export class TwitchApiService {
    
    REST_API = '';
    CLIENT_ID_APP = 'qp871hruk96hd4h5mh8yaeo5n96wby';
    CLIENT_ID_EXTENSION = '3zkcgkfkap9z6kvwtd0y3gydf1fycc';
    REDIRECT_URI = 'http://localhost:4200/';
    RESPONSE_TYPE = 'token';
    SCOPES = 'channel:read:subscriptions'
    ACCESS_TOKEN = '258t44bpotidpy28d5vtsvkm23qky0';
    TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2/authorize?';

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
            client_id: this.CLIENT_ID_APP,
            redirect_uri: this.REDIRECT_URI,
            response_type: this.RESPONSE_TYPE,
            scopes: this.SCOPES
        };
        location.href = `${this.TWITCH_OAUTH_URL}${this.encodeQueryString(params)}`; 
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

    /**
     * Méthode effectuant une requête GET à l'API Twitch
     * @param url 
     * @param params 
     * @param headers 
     * @returns 
     */
    makeGetJsonRequest(url: string, params: any, headers: any) {
        if (params) {
            url = `${url}?${this.encodeQueryString(params)}`;
        }

        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        const responseJson = JSON.parse(xhr.responseText);
                        resolve(responseJson);
                    } catch(error) {
                        reject(error);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.open("GET", url, true);

            if(headers) {
                for(let header in headers) {
                    xhr.setRequestHeader(header, headers[header]);
                }
            }
            xhr.send();
        });
    }
}