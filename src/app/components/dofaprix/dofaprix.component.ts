import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Carac } from './../../services/api.service';
import { Rune } from './../../services/api.service';

@Component({
  selector: 'app-dofaprix',
  templateUrl: './dofaprix.component.html',
  styleUrls: ['./dofaprix.component.css']
})
export class DofaprixComponent implements OnInit {
// Variables
  statsItem: Carac[] = new Array<Carac>();


// Constructeur
  constructor( private apiService: ApiService) {

  }

// Méthodes

/* Au lancement de la page */
  ngOnInit(): void {
  }

  sendPrixRune(rune: Rune, val: string): void{
    if(val)
      this.apiService.passePrixRune(rune, val);
  }

}
