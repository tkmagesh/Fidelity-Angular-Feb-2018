export class CalculatorModel{
	n1 : number = 0;
	n2 : number = 0;
	result : number = 0;

	add(){
		this.result = this.n1 + this.n2;
	}
	subtract(){
		this.result = this.n1 - this.n2;
	}
	multiply(){
		this.result = this.n1 * this.n2;
	}
	divide(){
		this.result = this.n1 / this.n2;
	}
}

export function f1(){
	console.log('f1 is invoked');
}

function f2(){
	console.log('f2 is invoked');
}
