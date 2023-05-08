import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core'
import { ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Map, Marker, Polygon, TileLayer } from 'leaflet'
import 'leaflet-draw'

declare let L: any

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

  private tileLayers: TileLayer[] = [
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    })
  ]
  private defaultTileLayer = this.tileLayers[0]

  public value: any
  private onChange: Function

  @Input() formControlName?: FormControlName
  @Input() label?: string
  @Input() isDisabled?: boolean = false
  @Input() dataType?: 'marker' | 'polygon'
  @Output() changeSize = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
    this.mapInit()
  }

  // Input Functions

  writeValue(value: any): void {
    this.value = value
    if (value) this.centerMap(this.dataType, value)
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
    
    this.tileLayer = (layer ?? this.defaultTileLayer).addTo(this.map)
  }

  private centerMap(type: string, value: any) {
    switch (type) {
      case 'marker':
        this.map.setView({ lat: value[0], lng: value[1] })
        this.markerAdd(value[0], value[1])
        break
      case 'polygon':
        this.map.fitBounds(value)
        this.polygonAddToMap(value)
        break
    }
  }

  // Map Click Functions

  private onMapClick(type: string, event: any): void {
    const { lat, lng } = event.latlng

    if (!this.isDisabled) {
      switch (type) {
        case 'marker':
          this.markerAdd(lat, lng)
          break
        case 'polygon':
          this.polygonAdd(lat, lng)
          break
      }
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
      this.polygonAddToMap(this.value)
    }
  }

  private polygonAddToMap(latlng: L.LatLngExpression[]) {
    this.onChange(latlng)
    
    this.polygon?.remove()
    
    this.polygon = L.polygon(latlng).addTo(this.map)
    this.calculateSize(this.polygon.getLatLngs()[0])
  }

  private calculateSize(value?: any) {
    const size = value ? L.GeometryUtil.geodesicArea(value) : 0
    this.changeSize.emit(size)
  }

  public polygonRemove(): void {
    this.polygon.remove()
    this.polygon = null
    this.value = null
    this.onChange(this.value)
    this.calculateSize(null)
  }

}
