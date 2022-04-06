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
import { DofaprixComponent } from './components/dofaprix/dofaprix.component';
import { AuthComponent } from './components/auth/auth.component';
import { AppViewComponent } from './components/app-view/app-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


const appRoutes: Routes = [
  {path: 'dofapi', component: DofapiComponent},
  {path: 'spotify', component: SpotifyComponent},
  {path: 'twitch', component: TwitchComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: AppViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DofapiComponent,
    SpotifyComponent,
    TwitchComponent,
    PixabayComponent,
    DofaprixComponent,
    AuthComponent,
    AppViewComponent
  ],
  imports: [
    BrowserModule,
    MatButtonToggleModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ApiService,
    TwitchApiService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
