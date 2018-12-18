import { Component } from '@angular/core';
import { Utils } from './model/utils';
import { MainService } from './services/mainService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MainService]
})

export class AppComponent {
  title: string = "Awesome Task Manager";
  author: string = "Gabriel C. Ullmann";
  address:string = "https://github.com/nkinesis";
  menuActive: boolean;
  userId: number = 1;
  year: number;

  constructor(private ms: MainService) {
    let u = new Utils();
    this.year = u.getYear();
    this.menuActive = false;
    this.ms.setUserID(this.userId);
  }

  showAbout() {
    alert(this.title + "\n" + this.author + ", " + this.year + "\n"
      + this.address);
  }

  toggle() {
    this.menuActive = !this.menuActive;
  }

}



