import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-pixabay',
  templateUrl: './pixabay.component.html',
  styleUrls: ['./pixabay.component.css']
})
export class PixabayComponent implements OnInit {

  Pixabay:any = [];

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    // this.apiService.GetPixabay().subscribe(res => {
    //   //console.log(res);
    //   this.Pixabay = res;
    // });
  }
}