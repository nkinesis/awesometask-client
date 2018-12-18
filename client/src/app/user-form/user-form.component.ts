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
    this.selectedEntity = this.entity;
    this.db = new Database();
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.getUser();
    this.renderer.selectRootElement("#userName").focus();
  }

  //DB Operations
  fetchUserID() {
    if (!this.entity.id_user || this.entity.id_user == 0) {
      this.ms.getUserID().subscribe(id => this.entity.id_user = id);
    }
  }

  getUser() {
    this.fetchUserID();
    let context = this;
    let cond = " id = " + this.entity.id_user;
    let orderby = " id ";
    let params = new Select(cond, 1, orderby);
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
    let context = this;
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
      alert("The password MUST have:\n" +
        "- At least 6 characters\n" +
        "- Upper case and lower case characters\n");
      this.renderer.selectRootElement("#userPwd").focus();
    }
    this.renderer.selectRootElement("#btnSubmit").blur();
    this.renderer.selectRootElement("#btnSubmit").innerText = "Submit";
  }

  ping() {
    this.db.testConnection();
  }

  //Other operations
  checkPassword() {
    let pwd = this.entity.password;
    let regexp = new RegExp('(?=.*[a-z])(?=.*[A-Z])');
    let conditions = regexp.test(pwd);
    return pwd.length >= 6 && conditions;
  }

  enterAction(e, field) {
    if (e.key == "Enter") {
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

  doNothing() { };
}
