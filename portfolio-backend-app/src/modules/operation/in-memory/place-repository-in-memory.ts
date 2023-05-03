import { IPlaceDTO } from '@modules/operation/dtos/i-place-dto'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'
import { Place } from '@modules/operation/infra/typeorm/entities/place'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PlaceRepositoryInMemory implements IPlaceRepository {
  places: Place[] = []

  // create
  async create ({
    placeName,
    customerId,
    stateId,
    cityId,
    size,
    address
  }: IPlaceDTO): Promise<HttpResponse> {
    const place = new Place()

    Object.assign(place, {
      placeName,
      customerId,
      stateId,
      cityId,
      size,
      address
    })

    this.places.push(place)

    return ok(place)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPlaces = this.places

    filteredPlaces = filteredPlaces.filter((place) => {
      if (place.placeName.includes(search)) return true
      if (place.size.includes(search)) return true

      return false
    })

    return ok(filteredPlaces.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPlaces = this.places

    filteredPlaces = filteredPlaces.filter((place) => {
      if (place.placeName.includes(filter)) return true
      if (place.size.includes(filter)) return true

      return false
    })

    return ok(filteredPlaces)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    let filteredPlaces = this.places

    filteredPlaces = filteredPlaces.filter((place) => {
      if (place.placeName.includes(search)) return true
      if (place.size.includes(search)) return true

      return false
    })

    return ok(filteredPlaces.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const place = this.places.find((place) => place.id === id)

    if (typeof place === 'undefined') {
      return notFound()
    } else {
      return ok(place)
    }
  }


  // update
  async update ({
    id,
    placeName,
    customerId,
    stateId,
    cityId,
    size,
    address
  }: IPlaceDTO): Promise<HttpResponse> {
    const index = this.places.findIndex((place) => place.id === id)

    this.places[index].placeName = placeName
    this.places[index].customerId = customerId
    this.places[index].stateId = stateId
    this.places[index].cityId = cityId
    this.places[index].size = size
    this.places[index].address = address

    return ok(this.places[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.places.findIndex((place) => place.id === id)

    this.places.splice(index, 1)

    return ok(this.places)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PlaceRepositoryInMemory }
