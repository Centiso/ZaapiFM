import { Component, OnInit } from '@angular/core';
import { TwitchApiService } from 'src/app/services/twitch.api.service';
import { interval } from 'rxjs';


@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})

export class TwitchComponent implements OnInit {


  StreamerList: any = [];

  constructor(private twitchApiService: TwitchApiService) { }

  
  ngOnInit(): void {
    // this.twitchApiService.getStreamerOnline().subscribe(res => {
    //   console.log(res);
    //   this.StreamerList = res;
    // });
    if(!this.twitchApiService.twitchIsAuthenticated()) {
      this.twitchApiService.twitchAuth();
    }
  }

}

