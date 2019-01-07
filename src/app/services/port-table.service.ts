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
        // console.log("map time: " + JSON.stringify(record['record'][0]));
        // let myPort: Port = {
        //   name : record['record'][0]['name'] || '<no name>',
        //   numberPort : record['record'][0]['number'] || '<no number>',
        //   transportProtocol : record['record'][0]['protocol'] || '<no protocol>',
        //   description : record['record'][0]['description'] || '<no description>'
        // };
        
        // return record['record'][0]
        return this.process(record['record']);
      })
    );
    // portsTable.subscribe(ports => {
    //   ports['record'].forEach(function(port){
    //     let p: Port = {
    //       name: port['name'] || '<no name>',
    //       numberPort: port['number'] || '<no number>',
    //       transportProtocol: port['protocol'] || '<no protocol>',
    //       description: port['description'] || '<no description>'
    //     };
    //     portsToSend.push(p);
    //   });
    // });
    // return of (portsToSend);
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