import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Port } from '../classes/port';

@Injectable({
  providedIn: 'root'
})
export class PortTableService {

  portTableUrl:string = 'http://localhost:1880/ports-table';

  constructor(
    private http: HttpClient) { }


  getPortTable(): Observable<any>{
    return this.http.get<any>(this.portTableUrl).pipe(
      map(record => {
        return this.process(record['record']);
      })
    );
  }

  process(data:any)  
    {
        let dataTransform: Port[] = [];
        
        for (let item of data) {
          let tempPort: Port = {
            name : item['name'] || '<no name>',
            numberPort : item['number'] || '<no number>',
            transportProtocol : item['protocol'] || '<no protocol>',
            description : item['description'] || '<no description>'
          };
          dataTransform.push(tempPort);
        }
        return dataTransform;
    }
}