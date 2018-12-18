export class Utils {
    constructor() {

    }

    getYear(): number {
        var today = new Date();
        return today.getFullYear(); 
    }

    getDate() : string {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = 0 + dd
        }

        if (mm < 10) {
            mm = 0 + mm
        }

        return yyyy + '-' + mm + '-' + dd;
    }
}