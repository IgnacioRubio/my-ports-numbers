import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Port } from '../classes/port';

@Injectable({
  providedIn: 'root'
})
export class PortTableService {

  portTableUrl: string = 'http://localhost:1880/ports-table';

  constructor(
    private http: HttpClient) { }

  // returns a Port array with the content from the server
  getPortTable(): Observable<Port[]> {
    return this.http.get<Port[]>(this.portTableUrl).pipe(
      map(record => {
        return this.processPortTable(record['record']);
      })
    );
  }

  // process data from server
  processPortTable(data: any): Port[] {
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