import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of, Observable} from 'rxjs';
import {map, switchMap, debounceTime, filter} from "rxjs/operators";

@Injectable()
export class SearchService {
  private baseUrl: string = 'https://api.github.com/search/repositories?q=';

  public constructor(private http: HttpClient) {
  }

  textInput(text: string) {
    return this.http.get(this.baseUrl.concat(text))
      .pipe(
        map((el: any) => el.items)
      );
  }

  searchRepo(result$: Observable<Event>) {
    return result$.pipe(
      debounceTime(1000),
      map((ev: Event): string => (ev.target as HTMLInputElement).value),
      filter((textInput: string): boolean => textInput.length > 1),
      switchMap((textInput: string): Observable<any> => this.textInput(textInput))
    );
  }


}
