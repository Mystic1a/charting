export interface IChartResponse {
    message: string;
    cod: string;
    city_id: number;
    calctime: number;
    cnt: number;
    list: IList[];
}

export interface IList {
    main: Main;
    wind: Wind;
    clouds: Clouds;
    weather: IWeather[];
    rain?: Rain;
    dt: number;
}

export interface Clouds {
    all: number;
}

export interface Main {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
    humidity: number;
}

export interface Rain {
    "3h": number;
}

export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Wind {
    speed: number;
    deg: number;
}
