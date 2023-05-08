import { Component, Input, OnInit, forwardRef } from '@angular/core'
import { ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR } from '@angular/forms'
import * as L from 'leaflet'
import { Map, Marker, Polygon, TileLayer } from 'leaflet'

const defaultLayer: TileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
})

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapComponent),
      multi: true
    }
  ]
})
export class MapComponent implements OnInit, ControlValueAccessor {
  private map: Map
  private tileLayer: TileLayer
  private marker: Marker
  private polygon: Polygon

  public value: any
  private onChange: Function

  @Input() formControlName?: FormControlName
  @Input() label?: string
  @Input() dataType?: 'marker' | 'polygon'

  constructor() { }

  ngOnInit(): void {
    this.mapInit()
  }

  // Input Functions

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
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

  private onMapClick(type: string, event: any): void {
    const { lat, lng } = event.latlng

    switch (type) {
      case 'marker':
        this.markerAdd(lat, lng)
        break
      case 'polygon':
        this.polygonAdd(lat, lng)
        break
    }
  }

  private markerAdd(lat: number, lng: number): void {
    this.marker?.remove()

    this.value = [lat, lng]
    this.onChange(this.value)
    
    this.marker = L.marker(this.value).addTo(this.map)
  }

  private polygonAdd(lat: number, lng: number): void {
    this.value = this.value ? [...this.value, [lat, lng]] : [[lat, lng]]

    if (this.value.length > 2) {
      this.onChange(this.value)

      this.polygon?.remove()

      this.polygon = L.polygon(this.value).addTo(this.map)
    }
  }

  public polygonRemove(): void {
    this.polygon.remove()
    this.polygon = null
    this.value = null
    this.onChange(this.value)
  }

}
