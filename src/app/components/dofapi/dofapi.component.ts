import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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

  /* Variables à créer :
        - []Ensemble des Items (+stockage)
        - Nom de l'item
        - []Caractéristiques de l'item (?)
        - Exo
        - PrixTotal
  */

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
      this.lancerPagePlease();
      console.log("TEST", this.item);
    });
       
  }

  lancerPagePlease(): void{
    this.getStatsItem(); 
    console.log("Stats de l'objet : ", this.statsItem);
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
    console.log(this.tCaracs.length);
    console.log(this.tCaracs);
    console.log("item : ", this.item[0].statistics[0]);
    console.log("stat", this.item[0].statistics.length, this.item[0].statistics[4]);
    console.log("testKeys :", Object.keys(this.item[0].statistics[7])[0]);
    
    for( i = 0 ; i < this.tCaracs.length ; i++ ){
      for( j = 0 ; j < this.item[0].statistics.length ; j++ ){
        if(Object.keys(this.item[0].statistics[j])[0] == this.tCaracs[i].nom){
          console.log(Object.keys(this.item[0].statistics[j])[0]);
          this.statsItem.push(this.tCaracs[i]);
        }
      }
    }
    
  }

/*  Initialisation du menu de prix des runes :
 *    TRIGGER : recherche correcte
 *    - Prend le tableau de stats en paramètre
 *    - Initialise le menu déroulant avec les dépendances aux champs de texte
 *    - Respecte un "template" Dofus-Responsive (ordre prédéfini quelque soit l'item)
 */
  initialiserMenuPrix(): void {

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
  calculerPrixTotal(): void {

  }

}

/* Plan de jeu :
      - Définir précisément le schéma front (les *ngFor)
      - Définir les collections à utiliser
      - Récupérer le contenu des collections :
        - Requête REST à l'APi
        - Récupération & stockage en BDD
          - MongoDB & Atlas ? (tuto Umtice)
          - Utilisation de la BDD
          || Requête API + précise
      - Variables à créer :
        - Enum caractéristiques ?
        - []Ensemble des Items (+stockage)
        - Nom de l'item
        - []Caractéristiques de l'item (?)
        - [nomrune][caractéristique][nombredebut][nombrefin][prixrune]
        - Exo
        - PrixTotal
      - Récupérer le nom de l'item depuis l'input texte
      - Filtre dans la BDD de l'ensemble des items
        || Requete API précise et *ngIf(==1 resultat): affichage
      - Récupération du contenu des zones de textes générées pour le FM
        - Stockage dans le mégatableau de runes
      - Récupération du contenu des zones de textes générées pour le prix
        - Stockage dans le mégatableau de runes
      - Gestion du bouton d'ajout d'exo (+1 ligne tableau carac item)
      - Calcul du prix de l'item
      - Création d'un bouton pour passer au prochain item
      - FIN?
*/