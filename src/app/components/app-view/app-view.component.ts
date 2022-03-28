import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css']
})
export class AppViewComponent implements OnInit {

  // les div sont cachés par défaut
  divTwitch :boolean = false;
  divSpotify :boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  


  divSpotifyFunction() {
    this.divSpotify = true;
  }
}

