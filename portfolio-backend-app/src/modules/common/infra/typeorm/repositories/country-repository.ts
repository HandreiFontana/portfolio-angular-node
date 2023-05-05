import { Brackets, getRepository, Repository } from 'typeorm'
import { ICountryDTO } from '@modules/common/dtos/i-country-dto'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { Country } from '@modules/common/infra/typeorm/entities/country'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class CountryRepository implements ICountryRepository {
  private repository: Repository<Country>

  constructor() {
    this.repository = getRepository(Country)
  }


  // create
  async create ({
    countryName,
    countryCode
  }: ICountryDTO): Promise<HttpResponse> {
    const country = this.repository.create({
      countryName,
      countryCode
    })

    const result = await this.repository.save(country)
      .then(countryResult => {
        return ok(countryResult)
      })
      .catch(error => {
        return serverError(error)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "countryName",
      "countryCode",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('cou')
        .select([
          'cou.id as "id"',
          'cou.countryName as "countryName"',
          'cou.countryCode as "countryCode"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const countries = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cou.countryName AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cou.countryCode AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('cou.countryName', columnOrder[0])
        .addOrderBy('cou.countryCode', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(countries)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const countries = await this.repository.createQueryBuilder('cou')
        .select([
          'cou.id as "value"',
          'cou.countryName as "label"',
        ])
        .where('cou.countryName ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cou.countryName')
        .getRawMany()

      return ok(countries)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const country = await this.repository.createQueryBuilder('cou')
        .select([
          'cou.id as "value"',
          'cou.countryName as "label"',
        ])
        .where('cou.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(country)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
    filter: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('cou')
        .select([
          'cou.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const countries = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cou.countryName AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cou.countryCode AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: countries.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const country = await this.repository.createQueryBuilder('cou')
        .select([
          'cou.id as "id"',
          'cou.countryName as "countryName"',
          'cou.countryCode as "countryCode"',
        ])
        .where('cou.id = :id', { id })
        .getRawOne()

      if (typeof country === 'undefined') {
        return noContent()
      }

      return ok(country)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    countryName,
    countryCode
  }: ICountryDTO): Promise<HttpResponse> {
    const country = await this.repository.findOne(id)

    if (!country) {
      return notFound()
    }

    const newcountry = this.repository.create({
      id,
      countryName,
      countryCode
    })

    try {
      await this.repository.save(newcountry)

      return ok(newcountry)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }


  // multi delete
  async multiDelete (ids: string[]): Promise<HttpResponse> {
    try {
      await this.repository.delete(ids)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }
}

export { CountryRepository }
