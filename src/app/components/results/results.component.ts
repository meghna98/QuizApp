import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/quiz';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor() { }
  @Input() results : Quiz[]
  ngOnInit(): void {
  }

}
