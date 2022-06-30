import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // weather data update
  public chartData  : BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(public http: HttpClient) { }

  //weather API 
  weatherCheck(data): Observable<any> {
    return this.http.post(environment.BASE_URL + 'weatherCheck', data);
  }


}
