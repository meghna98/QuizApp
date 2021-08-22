import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Quiz } from 'src/app/shared/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() sectionCount: number;
  @Input() operators : string[]
  @Input() max : number;
  @Input() min : number;
  @Input() maxQuestions : number;

  answer : number;
  currentSectionCount:number;
  sectionArray : number[];
  counter : number;
  quizEndedForSection : number = -1;
  
  quizMap = new Map<number,Quiz[]>();
  ngOnInit(): void {
  }
  globalReset(){
    this.sectionArray = this.generateArray()
    this.answer=null
    this.quizEndedForSection = -1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for(const propName in changes){
      this.globalReset();
      if(propName=="sectionCount"){
      let changedValue = changes[propName]
      this.currentSectionCount = changedValue.currentValue
      this.sectionArray = this.generateArray()
      this.generateQuizMap(this.currentSectionCount);
      }
      if(propName=="max"){
        this.max = changes[propName].currentValue
      }
      if(propName=="min"){
        this.min = changes[propName].currentValue
      }
      if(propName=="operators"){
        this.operators = changes[propName].currentValue
      }
      if(propName=="maxQuestions" && changes[propName].currentValue!=changes[propName].previousValue && this.sectionArray.includes(changes[propName].previousValue))
        this.globalReset();
    }
  }
  generateArray():number[]{
    let duplicateArray :number[]= []
    for(let count=0;count<this.currentSectionCount; count++){
      duplicateArray.push(-1);
    }
    return duplicateArray
  }

  generateQuizMap(keyCount: number){
    let quiz :Quiz[];
    for (let key = 0; key < keyCount; key++) {
      this.quizMap.set(key,quiz)
    }
  }
  startQuiz(i:number){
    this.sectionArray[i] = 0;
    let quizQuestion = this.generateQuestion(0,0);
    this.quizMap.set(i,new Array(quizQuestion));
  }

  nextQuestion(i:number, answer:number){
    let currentQuizQuestions = this.quizMap.get(i);
    currentQuizQuestions[this.sectionArray[i]].answerSubmitted = answer
    if(answer==currentQuizQuestions[this.sectionArray[i]].correctAnswer){
      currentQuizQuestions[this.sectionArray[i]].currentScore++ ;
    }
    this.answer=null;
    this.sectionArray[i]++;
    if(this.sectionArray[i]==this.maxQuestions){
      this.quizEndedForSection = i
    }
    else{
      let quizQuestion = this.generateQuestion(this.sectionArray[i],currentQuizQuestions[currentQuizQuestions.length-1].currentScore);
      currentQuizQuestions.push(quizQuestion)
      this.quizMap.set(i,currentQuizQuestions);
    }
  }
  generateQuestion(id:number, previousScore:number){
    let a = Math.random()
    let b = Math.random()
    let c = this.max-this.min
    let e = a*c
    let f = b*c

    let num1 = Math.floor(e)+parseInt(""+this.min)
    let num2 = Math.floor(f)+parseInt(""+this.min)
    let operator = this.operators[Math.floor(Math.random()*(this.operators.length))]
    let answer: number;
    switch (operator) {
      case "+":
        answer = num1 + num2
        break;
      case "-":
        answer = num1 - num2
        break;
      case "*":
        answer = num1 * num2
        break;
      case "/":
        answer = num1 / num2
        answer = Math.floor(answer*10)/10;
        break;
      default:
        break;
    }
    let quiz : Quiz = {
      id : id,
      num1 : num1,
      num2 : num2,
      operator : operator,
      correctAnswer : answer,
      answerSubmitted : null,
      currentScore: previousScore 
    }
    return quiz
  }

  reset(i: number){
    this.sectionArray[i]=0;
    let newQuiz :Quiz[];
    this.quizMap.set(i,newQuiz)
    this.sectionArray[i] = -1
  }

}
