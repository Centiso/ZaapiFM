import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
//import * as internal from 'stream';
//import * as internal from 'stream';
import { ApiService } from './../../services/api.service';
import { Carac } from './../../services/api.service';
import { Rune } from './../../services/api.service';

@Component({
  selector: 'app-dofapi',
  templateUrl: './dofapi.component.html',
  styleUrls: ['./dofapi.component.css']
})

export class DofapiComponent implements OnInit {
//##### Variables #####
  // Collection contenant les différentes caractéristiques & types de runes
  tCaracs: Carac[]
  nomItemRecherche: string = "";
  //exo: Carac = new Carac("","",0);
  tabItemsJSON: any = [];
  item: any = [];
  statsItem: Carac[] = new Array<Carac>();

// Constructeur
  constructor( private apiService: ApiService) {
    this.tCaracs = apiService.getStatistiques();
    console.log(this.item);
  }

// Méthodes

/*  Au lancement de la page :
 *    - Récupération de l'entiereté des items & stockage en JSON
 */ 
  ngOnInit(): void {
    this.apiService.GetBottesHarry().subscribe(res => {
      console.log(res);
      this.item = JSON.parse(JSON.stringify(res));
      this.getStatsItem();
      console.log("TEST", this.item);
      console.log("TESTSTATS", this.statsItem);
    });
       
  }

  updateNombreRuneDeb(rune: Rune, val: string): void{
    if(val)
      rune.setNombreRuneDeb(parseInt(val));
    console.log(rune);
  }

  updateNombreRuneFin(rune: Rune, val: string): void{
    if(val)
      rune.setNombreRuneFin(parseInt(val));
    console.log(rune);
  }

/*  Lorsque l'utilisateur recherche un item : 
 *    TRIGGER : barre rechercher.keyup
 *    - Récupère dans la base de données JSON stockée l'item en question
 *    - (+ Prédiction de frappe dans la barre de recherche)
 *    - Lance l'initialisation des cartes de FMs selon les statistiques
 *    - Lance l'initialisation du menu des prix selon les statistiques
 */

  rechercherItem(): void {
    
  }

/*  Initialisation d'une ligne de FM :
 *    TRIGGER : recherche correcte
 *    - Prend une stat en paramètre
 *    - Initialise les dépendances aux champs de texte
 */
  getStatsItem(): void {
    let i, j;
    for( i = 0 ; i < this.tCaracs.length ; i++ ){
      for( j = 0 ; j < this.item[0].statistics.length ; j++ ){
        if(Object.keys(this.item[0].statistics[j])[0] == this.tCaracs[i].nom){
          console.log(Object.keys(this.item[0].statistics[j])[0]);
          this.statsItem.push(this.tCaracs[i]);
        }
      }
    } 
  }

/*  Ajoute une ligne de statistique en exo :
 *    TRIGGER : bouton [Ajouter un Exo]
 *    - Prend une stat en paramètre
 *    - Ajoute la ligne de stat au menu de prix des runes
 *    - Ajoute la ligne de FM correspondante supplémentaire
 *    - Crée les dépendances supplémentaires nécéssaires
 */
  ajouterLigneExo(): void {

  }

/*  Calcule le prix de revient de la FM :
 *    TRIGGER : tous les champs sont remplis
 *    - Préviens l'utilisateur que tous les champs ne sont pas remplis sinon
 *    - Calcule le prix de revient de l'item & l'affiche si toutes les dépendances
 *      sont bien conçues
 */
  calculerPrixTotal(): number {
    let prixTot = 0;
    let i, j;
    for( i = 0 ; i < this.statsItem.length ; i++ ){
      for( j = 0 ; j < this.statsItem[i].runes.length ; j++ ){
        prixTot += (this.statsItem[i].runes[j].nFin - this.statsItem[i].runes[j].nDebut) * this.statsItem[i].runes[j].prix;
      }
    }
    return prixTot;
  }

}

/* Plan de jeu :
      - Récupérer le contenu des collections :
        - Requête REST à l'APi
        - Récupération & stockage en BDD
          - MongoDB & Atlas ? (tuto Umtice)
          - Utilisation de la BDD
          || Requête API + précise
      - Récupérer le nom de l'item depuis l'input texte
      - Filtre dans la BDD de l'ensemble des items
        || Requete API précise et *ngIf(==1 resultat): affichage
      - Récupération du contenu des zones de textes générées pour le FM
        - Stockage dans le mégatableau de runes
      - Récupération du contenu des zones de textes générées pour le prix
        - Stockage dans le mégatableau de runes
      - Gestion du bouton d'ajout d'exo (+1 ligne tableau carac item)
      - Création d'un bouton pour passer au prochain item
      - FIN?
*/