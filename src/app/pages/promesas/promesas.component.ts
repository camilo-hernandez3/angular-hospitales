import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios =>{
      console.log(usuarios)
    })
    

  }

  getUsuarios(){

    return new Promise((resolve, reject)=>{
      
      fetch('https://reqres.in/api/users?page=2')
        .then(resp => resp.json())
        .then(body => resolve(body.data));

    });


  }
 
}
