import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Carac } from './../../services/api.service';
import { Rune } from './../../services/api.service';

@Component({
  selector: 'app-dofapi',
  templateUrl: './dofapi.component.html',
  styleUrls: ['./dofapi.component.css']
})

export class DofapiComponent implements OnInit {
// Variables
  statsItem: Carac[];
  prixTotal: number;
  tCaracs!: Carac[];

// Constructeur
  constructor( private apiService: ApiService){
    this.prixTotal = this.apiService.prixTotal;
    this.statsItem = this.apiService.statsItem;
    this.tCaracs = this.apiService.tCaracs;
  }

// Méthodes

/* Au lancement de la page */
  ngOnInit(): void {
    this.apiService.getItemRecherche("Bottes Harry");
  }

/* Récupère la valeur de l'input de recherche d'item pour
former la requête REST */
  rechercherItem(nom: string): void {
    this.apiService.getItemRecherche(nom);
  }

/* Récupère les valeurs des inputs dynamiques et affecte
la valeur à la classe rune correspondante au champ */
  updateNombreRuneDeb(rune: Rune, val: string): void{
    if(val){
      rune.setNombreRuneDeb(parseInt(val));
      rune.setNombreRuneFin(parseInt(val));
    }
  }

/* Même chose */
  updateNombreRuneFin(rune: Rune, val: string): void{
    if(val)
      rune.setNombreRuneFin(parseInt(val));
  }

/* Affiche & actualise du prix */
  affichagePrix(): number{
    return this.apiService.calculerPrixTotal();
  }

/* Ajoute une ligne de caractéristique sur l'item */
  ajouterExo(stat: Carac): void{
    this.apiService.ajouterExo(stat);
  }

/* Supprime une ligne de caractéristique sur l'item */
  supprimerExo(): void{
    this.apiService.supprimerExo();
  }
}
