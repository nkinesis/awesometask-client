import { Component, OnInit, Renderer2, RendererFactory2  } from '@angular/core';
import { Database } from '../model/database';
import { Task } from '../model/task';
import { Select } from '../model/select';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  name: string = "Task";
  db: Database;
  entity: Task;
  entityList: Task[];
  renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.db = new Database();
    this.entity = new Task("", 1, 1);
    this.entityList = [];
    this.getTasks();
    this.renderer.selectRootElement("#taskDate").focus();
  }

  //DB Operations
  getTasks() {
    var context = this;
    var limit = 100;
    var cond = "id > 0 ";
    if (context.entity.date) {
      cond += "and dueDate = '" + context.entity.date + "'";
    }
    if (context.entity.description) {
      cond += "and description like '%" + context.entity.description + "%'";
    }
    var orderBy = "priority asc, dueDate desc, id desc";
    var params = new Select(cond, limit, orderBy);

    context.db.select(context, params)
      .then(function (response) {
        context.entityList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  enterAction(e, field){
    if (e.key == "Enter"){
      if (field == "date") {
        this.renderer.selectRootElement("#taskDesc").focus();
      } else {
        this.renderer.selectRootElement("#taskDate").focus();
      }
    }
  }

  setOK(entity) {
    console.log(entity.status);
    if (entity.status == 0){
      var context = this;
      entity.status = 1;
      context.db.update(this, entity)
        .then(function (response) {
          context.getTasks();
        })
        .catch(function (error) {
          console.log(error);
          context.getTasks();
        });
    } else {
      alert("This task has already been finished.");
    }
  }

  delete(entity) {
    var context = this;
    var ret = context.db.delete(this, entity);
    if (ret !== null){
      ret.then(function (response) {
        context.getTasks();
      })
      .catch(function (error) {
        console.log(error);
        context.getTasks();
      });
    }
  }

  doNothing(){}

}
