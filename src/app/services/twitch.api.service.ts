import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { XhrFactory } from '@angular/common';



export class TwitchApiService {
    
    CLIENT_ID_APP = 'qp871hruk96hd4h5mh8yaeo5n96wby';
    REDIRECT_URI = 'http://localhost:4200/';
    RESPONSE_TYPE = 'token';
    SCOPES = 'channel:read:subscriptions'
    ACCESS_TOKEN = '1nuug7ydl7iuge0ce6yqt9l7yr1595';
    TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2/authorize?';

    constructor() { }
    
    /**
     * Méthode qui va encoder les éléments de la table de hachage
     * passés en argument
     * @param params  
     * @returns l'url encodé
     */
    encodeQueryString(params: any): string {
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

    /*
        - mettre un id sur un bouton
        - récupérer l'id dans le .ts
        - faire un addEventListener
            - afficher le div s'il est caché avec div.style.display = block;
            - cacher le div s'il est visible avec div.style.display = none;
    */

    showTwitchDiv(): void {
        var e = document.getElementById('twitchIsDisplayed')
        e?.addEventListener('click', this.handClick)
    }

    handClick(this: HTMLElement, e: Event): void {
        console.log("clicked !")
        e.preventDefault()
        this.style.backgroundColor = 'black';
    }

    newHand(this: HTMLElement, e: Event): void {
        console.log("RemoveEventListener !")
        // removeEventListener('click', )
    }

}


