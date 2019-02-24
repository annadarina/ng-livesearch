import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {SearchService} from "./search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  repos$ = new Observable<Object[]>();

  constructor(private _searchRepo: SearchService) {
  }

  ngOnInit(): void {
    const input: HTMLInputElement = document.querySelector('.input') as HTMLInputElement;
    const textInput$ = fromEvent(input, 'input');
    this.repos$ = this._searchRepo.searchRepo(textInput$);
  }
}
