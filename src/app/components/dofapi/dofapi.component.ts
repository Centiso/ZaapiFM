import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-dofapi',
  templateUrl: './dofapi.component.html',
  styleUrls: ['./dofapi.component.css']
})
export class DofapiComponent implements OnInit {

  Dofusteuse:any = [];

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.GetDofusteuse().subscribe(res => {
      //console.log(res)
      this.Dofusteuse = res;
    });
  }

}
