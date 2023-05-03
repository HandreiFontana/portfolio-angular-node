import { inject, injectable } from 'tsyringe'
import { Customer } from '@modules/operation/infra/typeorm/entities/customer'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  customerName: string
  email: string
  phone: string
  countryId: string
  stateId: string
  cityId: string
  address: string
}

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({
    customerName,
    email,
    phone,
    countryId,
    stateId,
    cityId,
    address
  }: IRequest): Promise<Customer> {
    const result = await this.customerRepository.create({
        customerName,
        email,
        phone,
        countryId,
        stateId,
        cityId,
        address
      })
      .then(customerResult => {
        return customerResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCustomerUseCase }
