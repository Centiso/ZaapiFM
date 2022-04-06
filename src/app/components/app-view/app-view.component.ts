import { Component, OnInit } from '@angular/core';
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


  

  constructor(private apiService: ApiService) { }

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

  showTwitchDiv(e: Event): void {
    console.log("show is running :)")
    var element = document.getElementById('twitchIsDisplayed')
    element?.addEventListener('click', this.handClick);
  }

  handClick(e: Event) {
    console.log("clicked !");
    var element = document.getElementById('twitchIsDisplayed')
    // element?.removeEventListener('click', handClick);
  }

  rechercherItem(nom: string): void {
    this.apiService.getItemRecherche(nom);
  }
}

