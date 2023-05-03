import { ICustomerDTO } from '@modules/operation/dtos/i-customer-dto'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'
import { Customer } from '@modules/operation/infra/typeorm/entities/customer'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class CustomerRepositoryInMemory implements ICustomerRepository {
  customers: Customer[] = []

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
    const customer = new Customer()

    Object.assign(customer, {
      customerName,
      email,
      phone,
      countryId,
      stateId,
      cityId,
      address
    })

    this.customers.push(customer)

    return ok(customer)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredCustomers = this.customers

    filteredCustomers = filteredCustomers.filter((customer) => {
      if (customer.customerName.includes(search)) return true
      if (customer.email.includes(search)) return true

      return false
    })

    return ok(filteredCustomers.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredCustomers = this.customers

    filteredCustomers = filteredCustomers.filter((customer) => {
      if (customer.customerName.includes(filter)) return true
      if (customer.email.includes(filter)) return true

      return false
    })

    return ok(filteredCustomers)
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
    let filteredCustomers = this.customers

    filteredCustomers = filteredCustomers.filter((customer) => {
      if (customer.customerName.includes(search)) return true
      if (customer.email.includes(search)) return true

      return false
    })

    return ok(filteredCustomers.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const customer = this.customers.find((customer) => customer.id === id)

    if (typeof customer === 'undefined') {
      return notFound()
    } else {
      return ok(customer)
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
    const index = this.customers.findIndex((customer) => customer.id === id)

    this.customers[index].customerName = customerName
    this.customers[index].email = email
    this.customers[index].phone = phone
    this.customers[index].countryId = countryId
    this.customers[index].stateId = stateId
    this.customers[index].cityId = cityId
    this.customers[index].address = address

    return ok(this.customers[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.customers.findIndex((customer) => customer.id === id)

    this.customers.splice(index, 1)

    return ok(this.customers)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { CustomerRepositoryInMemory }
