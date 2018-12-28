import { Utils } from './utils';

export class User {
  constructor(email,
    username,
    password,
    creationDate,
    id_user) {
    this.id_user = id_user ? id_user : 0;
    this.email = email;
    this.username = username;
    this.password = password;

    if (creationDate && creationDate.trim().length > 0) {
      this.creationDate = creationDate;
    } else {
      let u = new Utils();
      this.creationDate = u.getDate();
    }
  }

}