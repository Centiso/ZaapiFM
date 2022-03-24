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
  statsItem: Carac[];

// Constructeur
  constructor( private apiService: ApiService){
    this.statsItem = this.apiService.statsItem;
  }

// Méthodes

/* Au lancement de la page */
  ngOnInit(): void {
  }

/* Récupère les valeurs des inputs dynamiques et affecte
la valeur à la classe rune correspondante au champ */
  updatePrixRune(rune: Rune, val: string): void{
    if(val)
      rune.setPrixRune(parseInt(val));
  }

}
