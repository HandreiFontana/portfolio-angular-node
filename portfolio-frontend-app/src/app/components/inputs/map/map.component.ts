import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core'
import { ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Map, Marker, Polygon, TileLayer } from 'leaflet'
import 'leaflet-draw'

declare let L: any

interface ICustomTileLayers {
  label: string
  value: string
  tileLayer: TileLayer
}

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
export class MapComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private map: Map
  private tileLayer: TileLayer
  private marker: Marker
  private polygon: Polygon

  private fixedMarkerLatLng?: Marker

  public tileLayers: ICustomTileLayers[] = [
    { label: 'Rua', value: 'street', tileLayer: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20 }) },
    { label: 'Híbrido', value: 'hybrid', tileLayer: L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'] }) },
    { label: 'Satélite', value: 'sattelite', tileLayer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { id: 'mapbox.streets' }) },
    { label: 'Terreno', value: 'terrain', tileLayer: L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', { maxZoom: 20 }) }
  ]
  public defaultTileLayer = 'street'

  public value: any
  private onChange: Function

  @Input() label?: string
  @Input() formControlName?: FormControlName
  @Input() dataType?: 'marker' | 'polygon'
  @Input() isDisabled?: boolean = false

  @Output() changeSize = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
    this.mapInit()
  }

  ngOnDestroy(): void {
    window.location.reload()
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

  public addTileLayer(layer?: TileLayer) {
    this.tileLayer?.remove()

    const tileLayer = this.tileLayers.find(item => item.value === (layer ?? this.defaultTileLayer))
    
    this.tileLayer = (tileLayer.tileLayer).addTo(this.map)
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

  public addFixedMarker(latLng: any) {
    this.fixedMarkerLatLng?.remove()

    this.fixedMarkerLatLng = L.marker(latLng).addTo(this.map)
    this.centerMap('marker', latLng)
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
