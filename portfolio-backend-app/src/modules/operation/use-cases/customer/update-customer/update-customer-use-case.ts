import { inject, injectable } from 'tsyringe'
import { Customer } from '@modules/operation/infra/typeorm/entities/customer'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  customerName: string
  email: string
  phone: string
  countryId: string
  stateId: string
  cityId: string
  address: string
}

@injectable()
class UpdateCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({
    id,
    customerName,
    email,
    phone,
    countryId,
    stateId,
    cityId,
    address
  }: IRequest): Promise<HttpResponse> {
    const customer = await this.customerRepository.update({
      id,
      customerName,
      email,
      phone,
      countryId,
      stateId,
      cityId,
      address
    })

    return customer
  }
}

export { UpdateCustomerUseCase }
