export class Select {
  constructor(condition,
    limit,
    orderby) {
      this.condition = condition;
      this.limit = limit ? limit : 100;
      this.orderby = orderby ? orderby : "";
  }

}