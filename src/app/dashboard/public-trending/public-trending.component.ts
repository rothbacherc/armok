import { Component, OnInit, DoCheck } from '@angular/core';
import { TrendSavesService } from 'src/app/services/trend-saves.service';
import { Save } from 'src/app/models/save.model';

@Component({
  selector: 'app-public-trending',
  templateUrl: './public-trending.component.html',
  styleUrls: ['./public-trending.component.css']
})
export class PublicTrendingComponent implements OnInit, DoCheck {
  trendSaves: Save[][]
  typeNames: string[] = ['Seeds', 'Worlds', 'Forts', 'Characters']
  mapCollapse: boolean[] = [true, true, true, true]
  mapbgStyles: string[] = ['','','','']
  mapcStyles: string[] = ['','','','']
  mapcsStyles: string[] = ['','','','']
  mapStates: Map<string, string> = new Map([
    ['Seeds', 'closed'], ['Worlds', 'closed'], ['Forts', 'closed'], ['Characters', 'closed']
  ])
  static ebgS = '#2c2d2e' //empty background style
  static ecS = '#4f5052' //empty color style
  static cS = 'auto' //cursor style

  constructor(private mySaveService: TrendSavesService) { }

  ngOnInit() {
    this.trendSaves = this.mySaveService.getTrendSaves()
  }

  ngDoCheck() {
    this.hideIfEmpty(0);this.hideIfEmpty(1);this.hideIfEmpty(2);this.hideIfEmpty(3)
  }

  hideIfEmpty(key: number) {
        this.mapbgStyles[key] = this.trendSaves[key].length === 0 ? PublicTrendingComponent.ebgS : ''
        this.mapcStyles[key] = this.trendSaves[key].length === 0 ? PublicTrendingComponent.ecS : ''
        this.mapcsStyles[key] = this.trendSaves[key].length === 0 ? PublicTrendingComponent.cS : ''
  }

  toggleCollapse(elem: number) {
    this.mapCollapse[elem] = this.trendSaves[elem].length > 0 ? !this.mapCollapse[elem] : this.mapCollapse[elem]
  }
}
