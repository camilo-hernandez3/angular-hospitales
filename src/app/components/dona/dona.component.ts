import { Component, Input, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color} from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  @Input() public title:string='Sin titulo';

  @Input('labels') public doughnutChartData:Label[]=[];

  @Input('data') public doughnutChartLabels:MultiDataSet =[];

  public colors:Color[]=[
    { backgroundColor:['#9E120E', '#FF5800', '#FFB414s']}
  ]



}
