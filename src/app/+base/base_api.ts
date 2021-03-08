import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BaseApi {

    constructor() {
    }

    public genUrl(path: string): string {
        return `${environment.base_api}/${path}`;
    }
}