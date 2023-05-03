import { ICityDTO } from '@modules/common/dtos/i-city-dto'
import { ICityRepository } from '@modules/common/repositories/i-city-repository'
import { City } from '@modules/common/infra/typeorm/entities/city'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class CityRepositoryInMemory implements ICityRepository {
  cities: City[] = []

  // create
  async create ({
    stateId,
    cityName,
    ibgeCode
  }: ICityDTO): Promise<HttpResponse> {
    const city = new City()

    Object.assign(city, {
      stateId,
      cityName,
      ibgeCode
    })

    this.cities.push(city)

    return ok(city)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredCities = this.cities

    filteredCities = filteredCities.filter((city) => {
      if (city.cityName.includes(search)) return true

      return false
    })

    return ok(filteredCities.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredCities = this.cities

    filteredCities = filteredCities.filter((city) => {
      if (city.cityName.includes(filter)) return true

      return false
    })

    return ok(filteredCities)
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
    let filteredCities = this.cities

    filteredCities = filteredCities.filter((city) => {
      if (city.cityName.includes(search)) return true

      return false
    })

    return ok(filteredCities.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const city = this.cities.find((city) => city.id === id)

    if (typeof city === 'undefined') {
      return notFound()
    } else {
      return ok(city)
    }
  }


  // update
  async update ({
    id,
    stateId,
    cityName,
    ibgeCode
  }: ICityDTO): Promise<HttpResponse> {
    const index = this.cities.findIndex((city) => city.id === id)

    this.cities[index].stateId = stateId
    this.cities[index].cityName = cityName
    this.cities[index].ibgeCode = ibgeCode

    return ok(this.cities[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.cities.findIndex((city) => city.id === id)

    this.cities.splice(index, 1)

    return ok(this.cities)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { CityRepositoryInMemory }
