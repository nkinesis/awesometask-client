import { Utils } from './utils';

export class Task {
  constructor(description,
    priority,
    id_user,
    date,
    id_task,
    status) {
    this.id_task = id_task ? id_task : 0;
    this.id_user = id_user ? id_user : 1;
    this.status = status ? status : 0;
    this.description = description;
    this.priority = priority;

    if (date && date.trim().length > 0) {
      this.date = date;
    } else {
      let u = new Utils();
      this.date = u.getDate();
    }
  }

}