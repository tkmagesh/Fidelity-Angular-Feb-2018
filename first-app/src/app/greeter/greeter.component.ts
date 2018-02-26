import { Component } from '@angular/core';

@Component({
	selector : 'app-greeter',
	templateUrl : 'greeter.component.html',
	styleUrls : ['greeter.component.css']
})
export class GreeterComponent{
	message : string = 'A dummy greet message';

	onGreetClick(userName : string){
		//let userName = prompt('Enter your name :');
		this.message = `Hi ${userName}!! Have a nice day!!!`;
	}
}