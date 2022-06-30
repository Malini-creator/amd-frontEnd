import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ApiService } from 'src/app/service/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {

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
          display: true,
        }
      },
      y: {
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
            data: this.lineData, label: res['City'] + " Temperature", type: "line",
            borderColor: '#65A0BA',
            pointBackgroundColor: '#65A0BA',
            pointBorderColor: '#65A0BA'
          }]
        }
      }
    })
  }
}
