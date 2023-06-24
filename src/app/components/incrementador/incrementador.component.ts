import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  @Input() public progreso:number = 40;
  @Input() public btnClass:string = 'btn-primary';


  @Output() valorSalida:EventEmitter<number> = new EventEmitter();
  


  changedValue(value: number){
    if(this.progreso >= 100 && value >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso <= 0 && value <= 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso += value;
    this.valorSalida.emit(this.progreso);
    
  }

  onChange(newValue:number){
    
    if(newValue >= 100){
      this.progreso = 100;
    }else if(newValue <= 0){
      this.progreso = 0;
    }else{
      this.progreso = newValue
    }
    
    this.valorSalida.emit(this.progreso);
  }

 

}
