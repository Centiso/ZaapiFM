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

  // Collection contenant les différentes caractéristiques & types de runes
  tCaracs: Carac[]
  nomItemRecherche: string = "";
  //exo: Carac = new Carac("","",0);
  tabItemsJSON: any = [];
  item: any = [];
  statsItem: Carac[] = new Array<Carac>();
  prixTotal: number = 0;

// Constructeur
  constructor( private apiService: ApiService) {
    this.tCaracs = apiService.getStatistiques();
    console.log(this.item);
  }

// Méthodes

/* Au lancement de la page */
  ngOnInit(): void {
    this.apiService.GetBottesHarry().subscribe(res => {
      console.log(res);
      this.item = JSON.parse(JSON.stringify(res));
      this.getStatsItem();
      console.log("TEST", this.item);
      console.log("TESTSTATS", this.statsItem);
    });
       
  }

/* Récupère la valeur de l'input de recherche d'item pour 
      former la requête REST */
  rechercherItem(): void {
    
  }

/* Copie les objets caractéristiques d'un tableau statique
      dans une variable dynamique représentant l'objet à
      forgemager */
  getStatsItem(): void {
    let i, j;
    for( i = 0 ; i < this.tCaracs.length ; i++ )
      for( j = 0 ; j < this.item[0].statistics.length ; j++ )
        if(Object.keys(this.item[0].statistics[j])[0] == this.tCaracs[i].nom)
          this.statsItem.push(this.tCaracs[i]);
  }

/* Récupère les valeurs des inputs dynamiques et affecte
    la valeur à la classe rune correspondante au champ */
    updateNombreRuneDeb(rune: Rune, val: string): void{
      if(val)
        rune.setNombreRuneDeb(parseInt(val));
        rune.setNombreRuneFin(parseInt(val));
    }

/* Même chose + Calcul du prix total pour update l'affichage */
  updateNombreRuneFin(rune: Rune, val: string): void{
    if(val)
      rune.setNombreRuneFin(parseInt(val));
    this.prixTotal = this.calculerPrixTotal();
  }

/* Copie la caractéristique sélectionnée dans statsItem */
  ajouterExo(stat: Carac): void {
    this.statsItem.push(stat);
  }

/*  Calcule le prix de revient de la FM */
  calculerPrixTotal(): number {
    let prixTot = 0;
    let i, j;
    for( i = 0 ; i < this.statsItem.length ; i++ ){
      for( j = 0 ; j < this.statsItem[i].runes.length ; j++ ){
        prixTot += this.statsItem[i].runes[j].calculePrixRune();
      }
    }
    return prixTot;
  }

}