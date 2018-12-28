export class Wrapper {
    cls: string;
    mtd: string;
    datalist: Object[];
    
    constructor(cls: string,
        mtd: string,
        datalist: Object[]) {
        this.cls = cls;
        this.mtd = mtd;
        this.datalist = datalist;
    }
}