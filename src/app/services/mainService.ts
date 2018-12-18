import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class MainService {

    id_user:number = 0;

    constructor() {

    }

    setUserID(id) {
        this.id_user = id;
    }

    getUserID(): Observable<number> {
        return of(this.id_user);
    }
}