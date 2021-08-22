import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from 'src/app/shared/settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  operators: string[]
  settings: Settings;
  selectedOperators : string[] = ["+"]
  ngOnInit(): void {
    this.operators = ["+","-","*","/"]
    this.settings = {
    max:10,
    min:0,
    maxQuestions:5,
    operators: this.operators
  }
  }
  updateSettings(newSettings:Settings){
    this.settings = newSettings;
    this.router.navigate(['home'])
  }
}
