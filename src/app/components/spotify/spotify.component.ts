import { Component, OnInit } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import * as $ from 'jquery';
let spotify = new SpotifyWebApi ();


@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})

export class SpotifyComponent implements OnInit {
  isConnected: boolean | undefined;
  token: string | undefined;
  sParam: string | undefined;
  raw_search_query: string | undefined;
  divSpotify :boolean = true;
  
  constructor() { }


  
  ngOnInit(): void {
    
  }

  divSpotifyShow (): void{
    
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

    /* URL du site pour la redirection apres connexion ( lien encoder via le site ci-dessous) : https://www.url-encode-decode.com/ */

    var redirect_uri = 'http%3A%2F%2Flocalhost%3A4200%2Fcallback%2F';
    const redirect = 'https://accounts.spotify.com/authorize?client_id=773daa976a4242229535987d2ab5483a&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F';
   
    window.location.replace(redirect);

    /* On est maintenant connecte a Spotify (on peut donc afficher la page Spotify au lieu de Youtube */
    this.isConnected = true;
   
    this.divSpotify = true;

    console.log("Le token d'acces est : " + this.token);

  }


    divShow() : void{
      this.divSpotify = true;
    }
    // Search button has been clicked
    chercherSons (): void{

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
      //Get the value of the search box
      let raw_search_query = $('#son').val();
      let search_query = encodeURI(raw_search_query?.toString()||"Celine Dion");
      // Make Spotify API call
      // Note: We are using the track API endpoint.
      $.ajax({
        url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        },
        success: function(data) {
          // Load our songs from Spotify into our page
          let num_of_tracks = data.tracks.items.length;
          let count = 0;
          // Max number of songs is 2
          const max_songs = 2;
          while(count < max_songs && count < num_of_tracks){
            // Extract the id of the FIRST song from the data object
            let id = data.tracks.items[count].id;
             /* AJOUT */
              spotify.getTrack(id).then(function(data: any){
              console . log ( data ) ; },
              function(err: any){ console . error ( err );
              } );
            // Constructing two different iframes to embed the song
            let src_str = `https://open.spotify.com/embed/track/${id}`;
            let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
            let parent_div = $('#song_'+ count);
            parent_div.html(iframe);
            count++;
          }
        }
      }); // End of Spotify ajax call
    }; // End of search button
  }
