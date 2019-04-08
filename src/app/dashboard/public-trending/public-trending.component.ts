import { Component, OnInit, DoCheck } from '@angular/core';
import { TrendSavesService } from 'src/app/services/trend-saves.service';
import { Save } from 'src/app/models/save.model';

@Component({
  selector: 'app-public-trending',
  templateUrl: './public-trending.component.html',
  styleUrls: ['./public-trending.component.css']
})
export class PublicTrendingComponent implements OnInit, DoCheck {
  trendSaves: Map<string, Save[]>
  mapCollapse: Map<string, boolean> = new Map([
    ['Seeds', true], ['Worlds', true], ['Forts', true], ['Characters', true]
  ])
  mapbgStyles: Map<string, string> = new Map([
    ['Seeds', ''], ['Worlds', ''], ['Forts', ''], ['Characters', '']
  ])
  mapcStyles: Map<string, string> = new Map([
    ['Seeds', ''], ['Worlds', ''], ['Forts', ''], ['Characters', '']
  ])
  mapcsStyles: Map<string, string> = new Map([
    ['Seeds', ''], ['Worlds', ''], ['Forts', ''], ['Characters', '']
  ])
  static ebgS = '#2c2d2e' //empty background style
  static ecS = '#4f5052' //empty color style
  static cS = 'auto' //cursor style

  constructor(private mySaveService: TrendSavesService) { }

  ngOnInit() {
    this.trendSaves = this.mySaveService.getTrendSaves()
  }

  ngDoCheck() {
    this.hideIfEmpty('Seeds');this.hideIfEmpty('Worlds');this.hideIfEmpty('Forts');this.hideIfEmpty('Characters')
  }

  hideIfEmpty(elem: string) {
        this.mapbgStyles.set(elem, this.trendSaves.get(elem).length === 0 ? PublicTrendingComponent.ebgS : '')
        this.mapcStyles.set(elem, this.trendSaves.get(elem).length === 0 ? PublicTrendingComponent.ecS : '')
        this.mapcsStyles.set(elem, this.trendSaves.get(elem).length === 0 ? PublicTrendingComponent.cS : '')
  }

  toggleCollapse(elem: string) {
    this.mapCollapse.set(elem, this.trendSaves.get(elem).length > 0 ? !this.mapCollapse.get(elem) : this.mapCollapse.get(elem))
  }
}
