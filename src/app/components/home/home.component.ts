import { Component, OnInit } from '@angular/core';
import { UachService } from '../../services/uach.service';
import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Orders
  newOrders: any[] = [];
  expOrders: any[] = [];
  // Flag spinner
  public loaded: boolean;

  lastData: any;

  constructor( private uach: UachService ) {
    this.loaded = true;

    const result = interval(30000).pipe(
      switchMap(() => this.uach.getOrders()),
      map(res => {
        return res;
      }));

      result.subscribe( (data: any) => {
        if (data.length !== this.lastData.length) {
          this.lastData = data;
          this.newOrders = data;
        } else {
          console.log('Se la PELA COMPA ALV');
        }
      });

    const subs1 = this.uach.getOrders().subscribe( (data: any) => {
      if (data) {
        this.newOrders = data;
        this.lastData = data;
        this.loaded = false;
      } else {
        this.loaded = false;
        subs1.unsubscribe();
      }
    });

    this.uach.getOrdersExp().subscribe( (data: any) => {
      if (data) {
        this.expOrders = data;
        this.loaded = false;
      } else {
        this.loaded = false;
      }
    });

  }

  ngOnInit() {
  }

}
