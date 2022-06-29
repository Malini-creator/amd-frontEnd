import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ApiService } from 'src/app/service/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-data-transfer',
  templateUrl: './data-transfer.component.html',
  styleUrls: ['./data-transfer.component.css']
})
export class DataTranferComponent implements OnInit {

  //local variable decalaration
  public lineChartLabels = [];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public lineData: number[] = [];
  public lineChartData = [];
  public chartResponse = [];
  public lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        min: 0,
        grid: {
          color: '#f5f5f5'
        },
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {

    /* Getting data and list the table and updating chart */
    this.apiService.chartData.subscribe({
      next: (res: any) => {
        if (res) {
          this.chartResponse.push(res)
          this.lineChartLabels = [...this.lineChartLabels, moment(res['Time']).format('hh:mm')];
          this.lineData = [...this.lineData, res['Temperature'] - 273.15];
          this.lineChartData = [{
            data: this.lineData, label: res['City'] + " Temprature", type: "line",
            borderColor: '#3443cf',
            pointBackgroundColor: '#3443cf',
            pointBorderColor: '#3443cf'
          }]
        }
      }
    })
  }
}
