import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  REST_API: string = 'https://fr.dofus.dofapi.fr/equipments?filter[where][level]=199';
  REQUEST_ALL_DOFAPI: string = 'https://fr.dofus.dofapi.fr/equipments';
  REQUEST_BOTTES_HARRY: string = 'https://fr.dofus.dofapi.fr/equipments?filter[where][name]=Cape au Logis'

  constructor( private httpClient: HttpClient) { }

  GetDofusteuse() {
    console.log(this.httpClient.get(`${this.REST_API}`));
    return this.httpClient.get(`${this.REST_API}`);
  }

  GetItemsDofapi() {
    console.log(this.httpClient.get(`${this.REQUEST_ALL_DOFAPI}`));
    return this.httpClient.get(`${this.REQUEST_ALL_DOFAPI}`);
  }

  GetBottesHarry(){
    console.log(this.httpClient.get(`${this.REQUEST_BOTTES_HARRY}`));
    return this.httpClient.get(`${this.REQUEST_BOTTES_HARRY}`);
  }

  getStatistiques(){
    return [
      new Carac("Vitalité", "Vi", 3),
      new Carac("Force", "Fo", 3),
      new Carac("Intelligence", "Ine", 3),
      new Carac("Chance", "Cha", 3),
      new Carac("Agilité", "Age", 3),
      new Carac("Sagesse", "Sa", 3),
      new Carac("Prospection","Prospe", 2),
      new Carac("Puissance", "Pui", 3),
      new Carac("Puissance Pièges", "Pui Pi", 3),
      new Carac("Résistance Terre", "Ré Terre", 2),
      new Carac("Résistance Feu", "Ré Feu", 2),
      new Carac("Résistance Eau", "Ré Eau", 2),
      new Carac("Résistance Air", "Ré Air", 2),
      new Carac("Résistance Neutre", "Ré Neutre", 2),
      new Carac("% Résistance Terre", "Ré per Terre", 1),
      new Carac("% Résistance Feu", "Ré per Feu", 1),
      new Carac("% Résistance Eau", "Ré per Eau", 1),
      new Carac("% Résistance Air", "Ré per Air", 1),
      new Carac("% Résistance Neutre", "Ré per Neutre", 1),
      new Carac("Résistance Poussée", "Ré Pou", 2),
      new Carac("Résistance Critique", "Ré Cri", 2),
      new Carac("Pods", "Pod", 3),
      new Carac("Tacle", "Tac", 2),
      new Carac("Fuite", "Fui", 2),
      new Carac("Dommages", "Do", 1),
      new Carac("Dommages Terre", "Do Terre", 2),
      new Carac("Dommages Feu", "Do Feu", 2),
      new Carac("Dommages Eau", "Do Eau", 2),
      new Carac("Dommages Air", "Do Air", 2),
      new Carac("Dommages Neutre", "Do Neutre", 2),
      new Carac("Dommages Critique", "Do Cri", 2),
      new Carac("Dommages Poussée", "Do Pou", 2),
      new Carac("Dommages Pièges", "Do Pi", 2),
      new Carac("Dommages Distance", "Do Per Di", 1),
      new Carac("Dommages Mélée", "Do Per Mé", 1),
      new Carac("Dommages aux Sorts", "Do Per So", 1),
      new Carac("% Critique", "Cri", 1),
      new Carac("Soins", "So", 2),
      new Carac("Esquive PA", "Re PA", 2),
      new Carac("Esquive PM", "Re PM", 2),
      new Carac("Retrait PA", "Ret PA", 2),
      new Carac("Retrait PM", "Ret PM", 2),
      new Carac("Dommages Renvoi", "Do Ren", 1),
      new Carac("Invocation", "Invo", 1),
      new Carac("Portée", "PO", 1),
      new Carac("PA", "Ga PA", 1),
      new Carac("PM", "Ga PM", 1)
    ];
  }
}

export class Carac{
  nom: string;
  runes: Array<Rune>;

  constructor(nom: string, dim: string, n: number){
    this.nom = nom;
    this.runes = new Array<Rune>();
    for (let i = 0; i < n; i++) {
      this.runes.push( new Rune(dim, i) );
    }
  }
}

export class Rune{
  nom: string;
  nDebut: number;
  nFin: number;
  prix: number;

  constructor(nom: string, n: number){
    switch(n){
      case 0:  this.nom = nom; break;
      case 1:  this.nom = "Pa " + nom; break;
      case 2:  this.nom = "Ra " + nom; break;
      default: this.nom = "missingN0"; break;
    }
    this.nDebut = 0;
    this.nFin = 0;
    this.prix = 0;
  }

  // Méthodes
  setNombreRuneDeb(n: number): void{ this.nDebut = n; }
  setNombreRuneFin(n: number): void{ this.nFin = n; }
  setPrixRune(p: number): void{ this.prix = p; }
  calculePrix(): number{
    return( (this.nFin - this.nDebut) * this.prix );
  }
}
