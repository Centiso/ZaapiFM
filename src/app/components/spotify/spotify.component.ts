import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
  isConnected: boolean | undefined;
  token: string | undefined;
  sParam: string | undefined
  constructor() { }

  ngOnInit(): void {
  }

  loginSpotify (): void{
    // Fonction qui permet d' extraite le token client de l 'URL du Site 
    const getUrlParameter = (sParam: string) => {
      let sPageURL = window.location.search.substring (1), sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#'):[], sParameterName, i;
      let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];

      sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : []; 
      for ( i = 0; i < sURLVariables.length ; i++) {
          sParameterName = sURLVariables[i].split('=');
          if ( sParameterName [ 0 ] === sParam ) {
            return sParameterName[1] === undefined ? true : decodeURIComponent ( sParameterName [ 1 ] ) ;
          }
        }
        return;
    };

    // Le token d'acces est stocke dans cette variable 

    const accessToken = getUrlParameter('access_token'); 

    /* BLOC CONNEXION */
    let client_id = '773daa976a4242229535987d2ab5483a'; 

    /* URL du site pour la redirection apres connexion ( lien encoder via le site ci−dessous) : https://www.url−encode−decode.com/ */

    var redirect_uri = 'http://localhost:4200/callback/';
    const redirect = 'https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}';
    if(accessToken == null || accessToken == "" || accessToken == undefined){
       window.location.replace(redirect);
    }else{
    /* On stock dans la variable d' instance du composant accueil le Token de connexion */
    this.token = accessToken.toString();
    }
    /* On est maintenant connecte a Spotify (on peut donc afficher la page Spotify au lieu de Youtube */
    this.isConnected = true ;
    console.log("Le token d'acces est : " + this.token);
}
}
