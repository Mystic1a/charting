import { IChartResponse } from './+model/chart-response';
import { IChartRequest } from './+model/chart-request';
import { ChartService } from './+service/chart.service';
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})

export class AppComponent {

  private apiId = 'Warren,OH'
  private apiKey = 'b6907d289e10d714a6e88b30761fae22'
  private subscription = new Subscription()
  private weatherDates = []
  chart = []

  constructor(private apiService: ChartService) { }

  ngOnInit() {
    this.callData()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private callData() {

    const params: IChartRequest = {
      q: this.apiId,
      appid: this.apiKey
    }

    this.subscription.add(
      this.apiService.getData(params).pipe().subscribe(
        (res) => {
          console.log('apiResponse', res)

          const temp_max = res.list.map((res) => res.main.temp_max)
          const temp_min = res.list.map((res) => res.main.temp_min)
          const allDates = res.list.map((res) => res.dt)
          const sea = res.list.map((res) => res.main.sea_level)
          const pressure = res.list.map((res) => res.main.pressure)

          allDates.forEach((res) => {
            let tsDate = new Date(res * 1090)
            this.weatherDates.push(tsDate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
          })

          this.chart = new Chart('canvas', {
            type: 'radar',
            data: {
              labels: this.weatherDates,
              datasets: [
                {
                  data: temp_max,
                  borderColor: '#3cba9f',
                  fill: true,
                  label: 'TEMPERATURE MAX '
                },
                {
                  data: temp_min,
                  borderColor: '#ffcc00',
                  fill: false,
                  label: 'TEMPERATURE MIN'
                },
                {
                  data: sea,
                  borderColor: '#14fd',
                  fill: true,
                  label: 'MIST',
                },
                {
                  data: pressure,
                  borderColor: '#1a2',
                  fill: false,
                  label: 'FOG'
                }
              ]
            },
            options: {
              legend: {
                display: true,
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }]
              }
            }
          })
        })
    )
  }

}
