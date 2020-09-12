import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {API_KEY} from '../values/values';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {
  constructor(
    private http: HttpClient
  ) {}

  get(uri: string, data: any = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}${uri}`, {params: {api_key: API_KEY, ...data}});
  }

  post(uri: string, data: any = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}${uri}`, data);
  }

  put(uri: string, data: any = {}): Observable<any> {
    return this.http.put(`${environment.apiUrl}${uri}`, data);
  }

  delete(uri: string, data: any = {}): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${uri}`, {body: data} as any);
  }
}
