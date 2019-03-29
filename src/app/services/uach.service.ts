import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UachService {

  getQuery(query: string) {
    const url = `http://189.237.67.145:3977/api/${query}`;

    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Yzc1NzY1MDRiYzA2YjFlYThiZTNjY2EiLCJ1c2VybmFtZSI6IjExMTEiLCJwYXNzd29yZCI6IiQyYiQxMCRRM2VvVFViODA3SlNJZ3poT0VhNXN1SXRaeVJqNy9KeVE2ZkNjY3R2N3FUa29jb2ZDZTZ3UyIsIm5hbWUiOiJMdWlzIFJvYmVydG8iLCJzdXJuYW1lIjoiTG95YSBNYXJ0aW5leiIsImltYWdlIjpudWxsLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTU1MzgwODc1MCwiZXhwIjoxNTU0NjY5MTUwfQ.A9f6jBvfVpCxZ3JYnJ14rDvMRWEf09v6zph2ogHvuFA'
    });
    return this.http.get(url, {headers});
  }

  deleteQuery(query: string) {
    const url = `http://189.237.67.145:3977/api/${query}`;

    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Yzc1NzY1MDRiYzA2YjFlYThiZTNjY2EiLCJ1c2VybmFtZSI6IjExMTEiLCJwYXNzd29yZCI6IiQyYiQxMCRRM2VvVFViODA3SlNJZ3poT0VhNXN1SXRaeVJqNy9KeVE2ZkNjY3R2N3FUa29jb2ZDZTZ3UyIsIm5hbWUiOiJMdWlzIFJvYmVydG8iLCJzdXJuYW1lIjoiTG95YSBNYXJ0aW5leiIsImltYWdlIjpudWxsLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTU1MzgwODc1MCwiZXhwIjoxNTU0NjY5MTUwfQ.A9f6jBvfVpCxZ3JYnJ14rDvMRWEf09v6zph2ogHvuFA'
    });
    return this.http.request( 'delete', url, {headers});
  }

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.getQuery(`order`)
                .pipe( map( data => data));
  }

  getOrdersExp() {
    return this.getQuery(`order-exp`)
                .pipe( map( data => data));
  }

  getMaterials() {
    return this.getQuery('material')
                .pipe( map( data => data));
  }

  orderReady(query: string) {
    return this.getQuery(`order-ready/${query}`).pipe( map( data => data));
  }

  deleteOrder(query: string) {
    return this.deleteQuery(`order/${query}`).pipe(map( data => data));
  }
}
