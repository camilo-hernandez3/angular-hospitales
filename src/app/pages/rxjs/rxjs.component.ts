import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 

    // this.retornaObservable()
    // .pipe(
    //   retry(1)
    // )
    // .subscribe(
    //   valor => console.log('Subs:', valor),
    //   (error)=> console.warn('Error:', error),
    //   ()=> console.info('Obs terminado')
    // );
    this.intervalSubs = this.retornaIntervalo()
    .subscribe( console.log)

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{

    return  interval(100)
      .pipe(
       // take(20),
        map(value => value + 1),
        filter(value => value%2 === 0)
      );

  }

  retornaObservable(): Observable<number>{
    let i = -1;

    return new Observable<number>(observer=>{
      
      const intervalo = setInterval(()=>{

        i += 1;
        observer.next(i);

        if(i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        if(i === 2){
          i = 0;
          observer.error('I llego al valor de 2')
        }

      }, 1000)

    });
   
  }

  ngOnInit(): void {
  }

}
