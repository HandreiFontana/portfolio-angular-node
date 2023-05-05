import { Brackets, getRepository, Repository } from 'typeorm'
import { ICustomerDTO } from '@modules/operation/dtos/i-customer-dto'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'
import { Customer } from '@modules/operation/infra/typeorm/entities/customer'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class CustomerRepository implements ICustomerRepository {
  private repository: Repository<Customer>

  constructor() {
    this.repository = getRepository(Customer)
  }


  // create
  async create ({
    customerName,
    email,
    phone,
    countryId,
    stateId,
    cityId,
    address
  }: ICustomerDTO): Promise<HttpResponse> {
    const customer = this.repository.create({
      customerName,
      email,
      phone,
      countryId,
      stateId,
      cityId,
      address
    })

    const result = await this.repository.save(customer)
      .then(customerResult => {
        return ok(customerResult)
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
      "customerName",
      "email",
      "countryCountryName",
      "stateFederativeUnit",
      "cityCityName",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('cus')
        .select([
          'cus.id as "id"',
          'cus.customerName as "customerName"',
          'cus.email as "email"',
          'a.id as "countryId"',
          'a.countryName as "countryCountryName"',
          'b.id as "stateId"',
          'b.federativeUnit as "stateFederativeUnit"',
          'c.id as "cityId"',
          'c.cityName as "cityCityName"',
        ])
        .leftJoin('cus.countryId', 'a')
        .leftJoin('cus.stateId', 'b')
        .leftJoin('cus.cityId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const customers = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cus.customerName AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cus.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('cus.customerName', columnOrder[0])
        .addOrderBy('cus.email', columnOrder[1])
        .addOrderBy('a.countryName', columnOrder[2])
        .addOrderBy('b.federativeUnit', columnOrder[3])
        .addOrderBy('c.cityName', columnOrder[4])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(customers)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const customers = await this.repository.createQueryBuilder('cus')
        .select([
          'cus.id as "value"',
          'cus.customerName as "label"',
        ])
        .where('cus.customerName ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cus.customerName')
        .getRawMany()

      return ok(customers)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const customer = await this.repository.createQueryBuilder('cus')
        .select([
          'cus.id as "value"',
          'cus.customerName as "label"',
        ])
        .where('cus.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(customer)
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
      let query = this.repository.createQueryBuilder('cus')
        .select([
          'cus.id as "id"',
        ])
        .leftJoin('cus.countryId', 'a')
        .leftJoin('cus.stateId', 'b')
        .leftJoin('cus.cityId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const customers = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cus.customerName AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cus.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: customers.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const customer = await this.repository.createQueryBuilder('cus')
        .select([
          'cus.id as "id"',
          'cus.customerName as "customerName"',
          'cus.email as "email"',
          'cus.phone as "phone"',
          'cus.countryId as "countryId"',
          'a.countryName as "countryCountryName"',
          'cus.stateId as "stateId"',
          'b.federativeUnit as "stateFederativeUnit"',
          'cus.cityId as "cityId"',
          'c.cityName as "cityCityName"',
          'cus.address as "address"',
        ])
        .leftJoin('cus.countryId', 'a')
        .leftJoin('cus.stateId', 'b')
        .leftJoin('cus.cityId', 'c')
        .where('cus.id = :id', { id })
        .getRawOne()

      if (typeof customer === 'undefined') {
        return noContent()
      }

      return ok(customer)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    customerName,
    email,
    phone,
    countryId,
    stateId,
    cityId,
    address
  }: ICustomerDTO): Promise<HttpResponse> {
    const customer = await this.repository.findOne(id)

    if (!customer) {
      return notFound()
    }

    const newcustomer = this.repository.create({
      id,
      customerName,
      email,
      phone,
      countryId,
      stateId,
      cityId,
      address
    })

    try {
      await this.repository.save(newcustomer)

      return ok(newcustomer)
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

export { CustomerRepository }
