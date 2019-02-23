import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Task } from '../model/task';
import { Database } from '../model/database';
import { Select } from '../model/select';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  name: string = "Task";
  entity: Task;
  entityList: Task[];
  selectedEntity: Task;
  db: Database;
  renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.db = new Database();
    this.entityList = [];
    this.selectedEntity = null;
    this.entity = new Task("", 1, 1);
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.clear();
    this.getTasks();
    setTimeout(() => this.renderer.selectRootElement("#taskDesc").focus(), 0);
  }

  //DB Operations
  getTasks() {
    let context = this;
    let cond = "id > 0 and status = 0";
    let orderBy = "priority asc, dueDate desc, id desc";
    let params = new Select(cond, 10, orderBy);
    context.db.select(context, params)
      .then(function (response) {
        context.entityList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  submit() {
    if (this.validate()) {
      let context = this;
      context.db.submit(context)
        .then(function (response) {
          context.clear();
          context.getTasks();
        })
        .catch(function (error) {
          console.log(error);
          context.clear();
          context.getTasks();
        });
    } else {
      alert("A task must have a description, priority and due date.");
    }
    this.renderer.selectRootElement("#taskDesc").focus();
  }

  update(task) {
    let context = this;
    let sTask = task ? task : context.entity;
    this.db.update(context, sTask)
      .then(function (response) {
        context.clear();
        context.getTasks();
      })
      .catch(function (error) {
        console.log(error);
        context.clear();
        context.getTasks();
      });
  }

  delete(task) {
    let context = this;
    let ret = context.db.delete(context, task)
    if (ret !== null) {
      ret.then(function (response) {
        context.getTasks();
      })
        .catch(function (error) {
          console.log(error);
          context.getTasks();
        });
    }
  }

  setOK(task) {
    let context = this;
    task.status = 1;
    context.db.update(this, task)
      .then(function (response) {
        context.clear();
        context.getTasks();
      })
      .catch(function (error) {
        console.log(error);
        context.clear();
        context.getTasks();
      });
  }

  //Other Operations
  validate() {
    let e = this.entity;
    return (e.description.length > 0 && e.priority > 0 && e.date);
  }

  clear() {
    this.selectedEntity = null;
    this.entity = new Task("", 1, 1);
  }

  onSelect(ntask: Task) {
    this.entity = ntask;
    this.selectedEntity = ntask;
  }

  enterAction(e, field) {
    if (e.key == "Enter") {
      if (field == "desc") {
        this.renderer.selectRootElement("#taskPrio").focus();
      } else if (field == "prio") {
        this.renderer.selectRootElement("#taskDate").focus();
      } else if (field == "date") {
        this.renderer.selectRootElement("#btnSubmit").focus();
      } else if (field == "btnSubmit") {
        this.renderer.selectRootElement("#btnSubmit").blur();
      }
      this.renderer.selectRootElement("#btnSubmit").innerText = "Submit";
    }
  }

  doNothing() { }

}
