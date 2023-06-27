import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public title:string;
  public titleSubs:Subscription;

  constructor( private router:Router, private route:ActivatedRoute) { 

    /* With Activated route */
    // console.log(route.snapshot.children[0].data.title);

    this.titleSubs =  this.getArgumentosRuta()
      .subscribe(({title}) => {
        this.title = title;
        document.title = `AdminPro - ${title}`;
    }); 
    

  }
  ngOnDestroy(): void {
    this.titleSubs.unsubscribe();
  }

  getArgumentosRuta(){

    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null),
      map(event => event.snapshot.data)
    );
    
  }




}
