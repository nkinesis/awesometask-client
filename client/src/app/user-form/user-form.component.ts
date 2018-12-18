import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Database } from '../model/database';
import { User } from '../model/user';
import { Select } from '../model/select';
import { MainService } from '../services/mainService';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  name: string = "User";
  entity: User;
  selectedEntity: User;
  db: Database;
  renderer: Renderer2;

  constructor(private ms: MainService, rendererFactory: RendererFactory2) {
    this.entity = new User("", "", "");
    this.selectedEntity =  this.entity;
    this.db = new Database();
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  fetchUserID(){
    if (!this.entity.id_user || this.entity.id_user == 0) {
      this.ms.getUserID().subscribe(id => this.entity.id_user = id);
    }
  }

  ping() {
    this.db.testConnection();
  }

  ngOnInit() {
    this.getUser();
    this.renderer.selectRootElement("#userName").focus();
  }

  //DB Operations
  getUser() {
    this.fetchUserID();
    var context = this;
    var cond = " id = " + this.entity.id_user;
    var orderby = " id ";
    var params = new Select(cond, 1, orderby);
    context.db.select(context, params)
      .then(function (response) {
        context.entity = response.data[0];
        context.selectedEntity = response.data[0];
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  submit() {
    var context = this;
    if (this.checkPassword()) {
      context.db.submit(context)
        .then(function (response) {
          console.log(response);
          context.getUser();
        })
        .catch(function (error) {
          console.log(error);
          context.getUser();
        });
    } else {
      alert("A senha deve possuir:\n"
        + "No mínimo 6 caracteres, maíusculas e minúsculas")
    }
    this.renderer.selectRootElement("#btnSubmit").blur();
    this.renderer.selectRootElement("#btnSubmit").innerText = "Submit";
  }

  //Other operations
  checkPassword() {
    //return this.entity.password.length > 6
    return true;
  }

  enterAction(e, field){
    if (e.key == "Enter"){
      if (field == "name") {
        this.renderer.selectRootElement("#userPwd").focus();
      } else if (field == "pwd") {
        this.renderer.selectRootElement("#btnSubmit").focus();
      } else if (field == "btnSubmit") {
        this.renderer.selectRootElement("#btnSubmit").blur();
      } 
      this.renderer.selectRootElement("#btnSubmit").innerText = "Submit";
    }
  }

  doNothing(){};
}
