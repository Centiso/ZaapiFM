import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DofapiComponent } from './components/dofapi/dofapi.component';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { TwitchComponent } from './components/twitch/twitch.component';
import { PixabayComponent } from './components/pixabay/pixabay.component';

import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './services/api.service';
import { TwitchApiService } from './services/twitch.api.service';

@NgModule({
  declarations: [
    AppComponent,
    DofapiComponent,
    SpotifyComponent,
    TwitchComponent,
    PixabayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    TwitchApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
