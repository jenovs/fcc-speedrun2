import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  weatherData: Object;
  tempIsC: boolean = true;

  constructor(private http: Http) {}

  ngOnInit() {
    this.getLocation()
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(pos => {

      const { latitude, longitude } = pos.coords;
      this.fetchWeather(latitude, longitude)
    }, (error) => {

      this.getLocationFromIp()
      .subscribe(res => {
        const json = res.json();
        this.fetchWeather(json.lat, json.lon)
      })
    });
  }

  getLocationFromIp() {
    return this.http.get('//extreme-ip-lookup.com/json/')
  }

  fetchWeather(lat, lon) {
    const data = {
      lat,
      lon,
      lang: "EN"
    }
    this.http.post(
      'https://fcc.jenovs.com/api/weather',
      {lat, lon, lang: 'EN'}
    )
    .subscribe(
      res => {
      const weather = res.json().weather;
      this.weatherData = weather;
      if (weather.display_location.country === 'US') this.tempIsC = false;
      console.log(this.weatherData)
    },
      err => {
        console.log('Error. Will retry')
        setTimeout(this.fetchWeather, 5000);
    })
  }

  toggleTemp() {
    this.tempIsC = !this.tempIsC;
  }
}
