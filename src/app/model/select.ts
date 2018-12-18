export class Select {
  condition: string;
  orderby: string;
  limit: number;

  constructor(condition:string,
    limit?: number,
    orderby?: string) {
      this.condition = condition;
      this.orderby = orderby ? orderby : "";
      this.limit = limit ? limit : 100;
  }

}