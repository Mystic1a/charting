import { BaseApi } from './../+base/base_api';
import { IResponseAPI } from './../+base/base_response';
import { IChartResponse } from './../+model/chart-response';
import { IChartRequest } from './../+model/chart-request';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient, private baseApi: BaseApi) { }

  getData(params: IChartRequest): Observable<IChartResponse> {

    const httpParams = new HttpParams()
      .set('q', params.q)
      .set('appid', params.appid)

    return this.http.get<IChartResponse>(this.baseApi.genUrl('data/2.5/history/city'), { params: httpParams })

  }

}
