import { Brackets, getRepository, Repository } from 'typeorm'
import { IPlaceDTO } from '@modules/operation/dtos/i-place-dto'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'
import { Place } from '@modules/operation/infra/typeorm/entities/place'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PlaceRepository implements IPlaceRepository {
  private repository: Repository<Place>

  constructor() {
    this.repository = getRepository(Place)
  }


  // create
  async create ({
    placeName,
    customerId,
    stateId,
    cityId,
    size,
    address
  }: IPlaceDTO): Promise<HttpResponse> {
    const place = this.repository.create({
      placeName,
      customerId,
      stateId,
      cityId,
      size,
      address
    })

    const result = await this.repository.save(place)
      .then(placeResult => {
        return ok(placeResult)
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
      "placeName",
      "customerCustomerName",
      "stateFederativeUnit",
      "cityCityName",
      "size",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('pla')
        .select([
          'pla.id as "id"',
          'pla.placeName as "placeName"',
          'a.id as "customerId"',
          'a.customerName as "customerCustomerName"',
          'b.id as "stateId"',
          'b.federativeUnit as "stateFederativeUnit"',
          'c.id as "cityId"',
          'c.cityName as "cityCityName"',
          'pla.size as "size"',
        ])
        .leftJoin('pla.customerId', 'a')
        .leftJoin('pla.stateId', 'b')
        .leftJoin('pla.cityId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const places = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pla.placeName AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pla.size AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('pla.placeName', columnOrder[0])
        .addOrderBy('a.customerName', columnOrder[1])
        .addOrderBy('b.federativeUnit', columnOrder[2])
        .addOrderBy('c.cityName', columnOrder[3])
        .addOrderBy('pla.size', columnOrder[4])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(places)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const places = await this.repository.createQueryBuilder('pla')
        .select([
          'pla. as "value"',
          'pla. as "label"',
        ])
        .where('pla. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pla.')
        .getRawMany()

      return ok(places)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const place = await this.repository.createQueryBuilder('pla')
        .select([
          'pla. as "value"',
          'pla. as "label"',
        ])
        .where('pla. = :id', { id: `${id}` })
        .getRawOne()

      return ok(place)
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
      let query = this.repository.createQueryBuilder('pla')
        .select([
          'pla.id as "id"',
        ])
        .leftJoin('pla.customerId', 'a')
        .leftJoin('pla.stateId', 'b')
        .leftJoin('pla.cityId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const places = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pla.placeName AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pla.size AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: places.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const place = await this.repository.createQueryBuilder('pla')
        .select([
          'pla.id as "id"',
          'pla.placeName as "placeName"',
          'pla.customerId as "customerId"',
          'a.customerName as "customerCustomerName"',
          'pla.stateId as "stateId"',
          'b.federativeUnit as "stateFederativeUnit"',
          'pla.cityId as "cityId"',
          'c.cityName as "cityCityName"',
          'pla.size as "size"',
          'pla.address as "address"',
        ])
        .leftJoin('pla.customerId', 'a')
        .leftJoin('pla.stateId', 'b')
        .leftJoin('pla.cityId', 'c')
        .where('pla.id = :id', { id })
        .getRawOne()

      if (typeof place === 'undefined') {
        return noContent()
      }

      return ok(place)
    } catch (err) {
      return serverError(err)
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
    const place = await this.repository.findOne(id)

    if (!place) {
      return notFound()
    }

    const newplace = this.repository.create({
      id,
      placeName,
      customerId,
      stateId,
      cityId,
      size,
      address
    })

    try {
      await this.repository.save(newplace)

      return ok(newplace)
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

export { PlaceRepository }
