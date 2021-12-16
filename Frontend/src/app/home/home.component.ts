import { Component, OnInit } from '@angular/core';
import { NgxTinySliderSettingsInterface } from 'ngx-tiny-slider';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  tinySliderConfig!: NgxTinySliderSettingsInterface;


  ngOnInit() {
    this.tinySliderConfig = {
      //autoWidth: true,
      items: 3,
      edgePadding: 20,
      arrowKeys: true,
      gutter: 30,
      controlsText: ['<', '>'],
      swipeAngle: true,
      speed: 1000,
      autoplay: true
    
    };
  }
}

