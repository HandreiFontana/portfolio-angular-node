import { ICountryDTO } from '@modules/common/dtos/i-country-dto'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { Country } from '@modules/common/infra/typeorm/entities/country'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class CountryRepositoryInMemory implements ICountryRepository {
  countries: Country[] = []

  // create
  async create ({
    countryName,
    countryCode
  }: ICountryDTO): Promise<HttpResponse> {
    const country = new Country()

    Object.assign(country, {
      countryName,
      countryCode
    })

    this.countries.push(country)

    return ok(country)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredCountries = this.countries

    filteredCountries = filteredCountries.filter((country) => {
      if (country.countryName.includes(search)) return true
      if (country.countryCode.includes(search)) return true

      return false
    })

    return ok(filteredCountries.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredCountries = this.countries

    filteredCountries = filteredCountries.filter((country) => {
      if (country.countryName.includes(filter)) return true
      if (country.countryCode.includes(filter)) return true

      return false
    })

    return ok(filteredCountries)
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
    let filteredCountries = this.countries

    filteredCountries = filteredCountries.filter((country) => {
      if (country.countryName.includes(search)) return true
      if (country.countryCode.includes(search)) return true

      return false
    })

    return ok(filteredCountries.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const country = this.countries.find((country) => country.id === id)

    if (typeof country === 'undefined') {
      return notFound()
    } else {
      return ok(country)
    }
  }


  // update
  async update ({
    id,
    countryName,
    countryCode
  }: ICountryDTO): Promise<HttpResponse> {
    const index = this.countries.findIndex((country) => country.id === id)

    this.countries[index].countryName = countryName
    this.countries[index].countryCode = countryCode

    return ok(this.countries[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.countries.findIndex((country) => country.id === id)

    this.countries.splice(index, 1)

    return ok(this.countries)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { CountryRepositoryInMemory }
