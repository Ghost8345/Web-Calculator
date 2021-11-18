import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'calculator';

  expression: string = '';
  result: any = '';
  fOp :string = '';
  Operation :string = '';
  sOp :string = '';
  operand : string = '';

  display(element: string) : void {

    if(this.expression.includes('+') || this.expression.includes('-') || this.expression.includes('×') || this.expression.includes('÷') || this.expression.includes('%')) {
      this.parseOperands();
      if(element == '.') {
        if(this.sOp.includes('.')) {
          return
        }
        else {
          this.expression += element;
        }
      }
      else {
         this.expression += element;
      } 
    }
    else {
      if(element == '.') {
        if(this.expression.includes('.')) {
          return
        }
        else {
          this.expression += element;
        }
      }
      else {
        this.expression += element;
      }
    }
  }

  clear() : void {

    this.expression = '';
    this.result = '';
    this.fOp = '';
    this.Operation='';
    this.sOp = '';

  }

  delete() : void {

    this.expression = this.expression.substring(0, this.expression.length - 1)

  }
  

  parseOperands() : void {

    for(let i = 0; i < this.expression.length; i++) {
      if(this.expression[i] == ('+') || (this.expression[i] == ('-') && i != 0)  || this.expression[i] == ('×') || this.expression[i] == ('÷') || this.expression[i] == ('%')){
        this.fOp = this.expression.substring(0, i);
        this.Operation = this.expression[i];
        this.sOp = this.expression.substring(i+1);
      }
    }

    if(this.Operation == '÷' && this.sOp =='0') {
      this.expression='';
      this.result = 'E';
    }

  }



  negate() : void {

    if(!!this.expression) {

      if(this.expression[0] != '-') {
      this.expression = '-' + this.expression;
      }

      else{
      this.expression = this.expression.substring(1);
      }
    }

    else {
      this.expression = this.expression;
    }
      
    
  }

  oneOperand(element: string) : void {

    if(this.expression.includes('+') || this.expression.includes('-') || this.expression.includes('×') || this.expression.includes('÷') || this.expression.includes('%')) {
      this.expression = '';
      this.result = 'E';
    }

    switch(element) {

      case 'i':
        this.operand = this.expression;
        console.log(this.operand);
        this.sendBack1(this.operand, "i");
        break;
      case 'sq':
        this.operand = this.expression;
        console.log(this.operand);
        this.sendBack1(this.operand, "sq");
        break;
      case 'sqr':
        this.operand = this.expression;
        console.log(this.operand);
        this.sendBack1(this.operand, "sqr");
        break;
    }

  }

  twoOperand(element: string) : void {

    if(this.expression.slice(-1) != '+' && this.expression.slice(-1) != '-' && this.expression.slice(-1) != '×' && this.expression.slice(-1) != '÷' && this.expression.slice(-1) != '%') {
      switch(element) {

        case 'add':
          this.display('+')
          //
          break;
        case 'sub':
          this.display('-')
          //
          break;
        case 'mult':
          this.display('×')
          //
          break;

        case 'div':
          this.display('÷')
          //
          break;

        case 'mod':
          this.display('%')
          //
          break;
      }
    }

    else {
      this.expression = this.expression;
    }
  }

  constructor(private http : HttpClient){}

   sendBack1(element1: string, element2: string) : void{
    this.http.get('http://localhost:8080/calculate/1evaluate', {
      responseType :'text',

      params: {
        operand: element1,
        operator: element2
      }
      ,
      observe: 'response'

    })
    .subscribe(response => {
      this.result = response.body;
      console.log(this.result);
      this.expression = this.result;
    }) 
  }

  sendBack2(element1: string, element2: string, element3: string) : void{
    if(element2 == '+') element2 = 's';
    this.http.get('http://localhost:8080/calculate/2evaluate', {
      responseType :'text',

      params: {
        fOperand: element1,
        Operator: element2,
        sOperand: element3
      }
      ,
      observe: 'response'

    })
    .subscribe(response => {
      this.result = response.body;
      console.log(this.result);
      this.expression = this.result;
    }) 
  }

 



  eval() : void {
    
    this.parseOperands();
    console.log(this.fOp);
    console.log(this.Operation);
    console.log(this.sOp);
    this.sendBack2(this.fOp, this.Operation, this.sOp);
    
    
  }




}
