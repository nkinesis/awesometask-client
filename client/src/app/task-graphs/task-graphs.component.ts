import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Database } from '../model/database';
import { Utils } from '../model/utils';

@Component({
  selector: 'app-task-graphs',
  templateUrl: './task-graphs.component.html',
  styleUrls: ['./task-graphs.component.css']
})
export class TaskGraphsComponent implements OnInit {
  db: Database;
  yAxis: number[];
  xAxis: string[];
  listRs: object[];
  stDate: string;
  renderer: Renderer2;

  public lineChartData: Array<any> = [
    { data: [1], label: 'Tasks' }
  ];
  public lineChartLabels: Array<any> = ['Tasks'];
  lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend: boolean = false;
  lineChartType: string = 'line';

  public constructor(rendererFactory: RendererFactory2) {
    this.db = new Database();
    this.clear();
    let u = new Utils();
    this.stDate = u.getDate();
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.fetchGraph();
    this.renderer.selectRootElement("#graphDate").focus();
  }

  clear() {
    this.yAxis = [];
    this.xAxis = [];
    this.listRs = [];
  }

  fetchGraph() {
    this.clear();
    var context = this;
    var filter = { "startingDate": this.stDate };
    var r = this.db.sendRequest("GraphController", "getPriorityAvgGraph", filter);
    r.then(function (response) {
      for (let json of response.data) {
        context.yAxis.push(parseInt(json.avgprio));
        context.xAxis.push(json.dueDate);
      }
      setTimeout(() => {
        context.lineChartLabels = context.xAxis;
      }, 0);
      context.lineChartData[0].data = context.yAxis;
      context.fetchTable();
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetchTable() {
    var context = this;
    context.listRs = [];
    var filter = { "startingDate": this.stDate };
    var r = this.db.sendRequest("GraphController", "getPriorityIndexGraph", filter);
    r.then(function (response) {
      for (let json of response.data) {
        context.listRs.push(json);
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  randomize() {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    console.log(_lineChartData);
    this.lineChartData = _lineChartData;
  }

  enterAction(e) {
    if (e.key == "Enter") {
      this.renderer.selectRootElement("#graphDate").blur();
    }
  }

}