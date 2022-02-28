import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  REST_API: string = 'https://fr.dofus.dofapi.fr/equipments?filter[where][level]=199';

  constructor( private httpClient: HttpClient) { }

  GetDofusteuse() {
    console.log(this.httpClient.get(`${this.REST_API}`));
    return this.httpClient.get(`${this.REST_API}`);
  }

  
}
