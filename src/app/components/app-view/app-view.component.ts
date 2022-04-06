import { Component, OnInit } from '@angular/core';
import { TwitchApiService } from './../../services/twitch.api.service';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css']
})
export class AppViewComponent implements OnInit {

  // les div sont cachés par défaut
  divTwitch :boolean = false;
  divSpotify :boolean = false;


  

  constructor(private apiService: ApiService, private twitchService: TwitchApiService) { }

  ngOnInit(): void {
  }

  toggleButtonClick(n: number){
    if(n){ // Spotify
      console.log("Spotify");
      this.divSpotify = true;
      this.divTwitch = false;
    }else{ // twitch
      console.log("Twitch");
      this.divSpotify = false;
      this.divTwitch = true;
    }
  }

  twitchAuthentification(): void {
    this.twitchService.twitchAuth();
  }

  rechercherItem(nom: string): void {
    this.apiService.getItemRecherche(nom);
  }
}

