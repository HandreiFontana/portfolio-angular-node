import { Component, Input, OnInit } from '@angular/core'
import * as L from 'leaflet'
import { Map, TileLayer } from 'leaflet'

const defaultLayer: TileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
})

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: Map
  private tileLayer: TileLayer 

  @Input() label?: string
  @Input() dataType?: 'marker' | 'polygon'

  constructor() { }

  ngOnInit(): void {
    this.mapInit()
  }

  // Map Init Functions

  private mapInit() {
    this.map = L.map('map', {
      scrollWheelZoom: true
    }).locate({ setView: true, maxZoom: 13 })

    this.addTileLayer()

    this.map.on('click', this.onMapClick.bind(this, this.dataType))
  }

  private addTileLayer(layer?: TileLayer) {
    this.tileLayer?.remove()

    this.tileLayer = (layer ?? defaultLayer).addTo(this.map)
  }

  // Map Click Functions

  private onMapClick(type?: string): void {
    switch (type) {
      case 'marker':
        this.markerAdd()
      case 'polygon':
        this.polygonAdd()
    }
  }

  private markerAdd(): void {
    
  }

  private polygonAdd(): void {

  }

}
