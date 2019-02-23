import { Utils } from './utils';

export class User {
  email: string;
  username: string;
  password: string;
  creationDate: string;
  id_user: number;

  constructor(email: string,
    username: string,
    password: string,
    creationDate?: string,
    id_user?: number) {
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